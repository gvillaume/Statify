import React from 'react'

import { get } from './functions'

const options = {
    task: 'classification',
}

const DataContext = React.createContext({
    topData: [],
    topTracks: [],
    topAverages: [],
    trainingTracks: [],

    updateTracks: () => {},
    updateTraining: () => {},
})

interface Props {
    children: React.ReactNode
}

const DataProvider: React.FC<Props> = ({ children }) => {
    const [topData, setTopData] = React.useState([])
    const [topTracks, setTopTracks] = React.useState([])
    const [topAverages, setAverages] = React.useState([])
    const [trainingTracks, setTrainingTracks] = React.useState([])

    const updateTracks = async () => {
        const trackResponse = await get(
            'https://api.spotify.com/v1/me/top/tracks',
            {
                limit: 50,
                time_range: 'long_term',
            }
        )

        let IDs = ''
        setTopData(await trackResponse.items)
        await trackResponse.items.map(track => {
            IDs = IDs + ',' + track.id
        })

        IDs = IDs.slice(1)

        const featureResponse = await get(
            'https://api.spotify.com/v1/audio-features',
            {
                ids: IDs,
            }
        )

        let tracks = []
        let avgAcoustic = 0
        let avgDance = 0
        let avgEnergy = 0
        let avgInstrument = 0
        let avgLive = 0
        let avgRawLoud = 0
        let avgSpeech = 0
        let avgValence = 0
        await featureResponse.audio_features.map((track, idx) => {
            avgAcoustic = avgAcoustic + track.acousticness / 50
            avgDance = avgDance + track.danceability / 50
            avgEnergy = avgEnergy + track.energy / 50
            avgInstrument = avgInstrument + track.instrumentalness / 50
            avgLive = avgLive + track.liveness / 50
            avgRawLoud = avgRawLoud + track.loudness / 50
            avgSpeech = avgSpeech + track.speechiness / 50
            avgValence = avgValence + track.valence / 50

            tracks.push({
                title: trackResponse.items[idx].name,
                acousticness: track.acousticness,
                danceability: track.danceability,
                energy: track.energy,
                instrumentalness: track.instrumentalness,
                liveness: track.liveness,
                loudness: track.loudness,
                speechiness: track.speechiness,
                valence: track.valence,
                recommend: 'yes',
            })
        })

        let avgLoud = (avgRawLoud + 60) / 60
        setTopTracks(tracks)
        setAverages([
            avgAcoustic,
            avgDance,
            avgEnergy,
            avgInstrument,
            avgLive,
            avgLoud,
            avgSpeech,
            avgValence,
            avgRawLoud,
        ])
    }

    const updateTraining = async () => {
        const response = await get(
            'https://api.spotify.com/v1/recommendations',
            {
                limit: 50,
                seed_artists: `${process.env.GATSBY_ARIANA_GRANDE},${process.env.GATSBY_KANYE_WEST},${process.env.GATSBY_MOZART},${process.env.GATSBY_AC_DC},${process.env.GATSBY_KENNY_CHESNEY}`,
                target_acousticness: 1 - topAverages[0],
                target_danceability: 1 - topAverages[1],
                target_energy: 1 - topAverages[2],
                target_instrumentalness: 1 - topAverages[3],
                target_liveness: 1 - topAverages[4],
                target_loudness: -60 - topAverages[8],
                target_speechiness: 1 - topAverages[6],
                target_valence: 1 - topAverages[7],
            }
        )

        let IDs = ''
        await response.tracks.map(track => {
            IDs = IDs + ',' + track.id
        })

        IDs = IDs.slice(1)

        const featureResponse = await get(
            'https://api.spotify.com/v1/audio-features',
            {
                ids: IDs,
            }
        )

        let tracks = []
        await featureResponse.audio_features.map((track, idx) => {
            tracks.push({
                title: response.tracks[idx].name,
                acousticness: track.acousticness,
                danceability: track.danceability,
                energy: track.energy,
                instrumentalness: track.instrumentalness,
                liveness: track.liveness,
                loudness: track.loudness,
                speechiness: track.speechiness,
                valence: track.valence,
                recommend: 'no',
            })
        })

        setTrainingTracks(tracks)

        console.log('Recommended => ', tracks)
    }

    return (
        <DataContext.Provider
            value={{
                topData,
                topTracks,
                topAverages,
                trainingTracks,
                updateTracks,
                updateTraining,
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export { DataProvider }

export default DataContext
