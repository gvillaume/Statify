import React from 'react'
import {
    Heading,
    Text,
    Divider,
    Center,
    Box,
    Flex,
    Spacer,
    Image,
    Button,
} from '@chakra-ui/react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    YAxis,
    XAxis,
    Tooltip,
} from 'recharts'
import { ExternalLinkIcon } from '@chakra-ui/icons'

import Layout from '../components/shared/layout'
import ScatterPlot from '../components/shared/scatter-plot'
import DataContext from '../utils/api/data-provider'
import NavigationContext from '../utils/navigation-provider'
import ResponsiveBlock from '../components/shared/responsive-block'

const YourData: React.FC = () => {
    const navContext = React.useContext(NavigationContext)
    const data = React.useContext(DataContext)

    React.useEffect(() => {
        data.updateTracks()
        data.updateTraining()
        console.log('Top => ', data.topTracks)
        console.log('Training => ', data.trainingTracks)
        navContext.changePage('Your Data')
    }, [])

    const getScatData = (tracks, feature) => {
        let data = []
        tracks.map((track, idx) => {
            data.push({
                x: idx,
                y: track[feature],
                z: track.title,
            })
        })

        return data
    }

    const names = [
        'Acousticness',
        'Danceability',
        'Energy',
        'Instrumentalness',
        'Liveness',
        'Loudness',
        'Speechiness',
        'Valence',
    ]

    const getAvgData = averages => {
        let data = []
        averages.map((avg, idx) => {
            data.push({
                name: names[idx],
                avg: avg,
            })
        })

        return data
    }

    return (
        <Layout>
            <ResponsiveBlock>
                <Heading textAlign="center">Your Data</Heading>
                <Divider my={5} />
                <Text mb={5}>
                    Here you can see the data on your top tracks! Below, your
                    averages for each audio feature is shown so you can see how
                    you listen.
                </Text>
                <Divider />
                <Box mb={10}>
                    {data.topData.map((track, idx) => (
                        <Box key={idx}>
                            <TopTrackItem
                                num={idx + 1}
                                title={track.name}
                                image={track.album.images[0].url}
                                artist={track.artists[0].name}
                                album={track.album.name}
                                external_url={track.external_urls.spotify}
                            />
                            <Divider />
                        </Box>
                    ))}
                </Box>
                <Heading align="center" size="md" mb={5}>
                    Average Audio Features for Your Top Tracks
                </Heading>
                <Center>
                    <ResponsiveContainer width={'100%'} height={500}>
                        <BarChart
                            data={getAvgData(data.topAverages.slice(0, 8))}
                        >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="avg" fill={'#5ca73f'} />
                        </BarChart>
                    </ResponsiveContainer>
                </Center>
                <Divider my={5} />
                <Heading mb={3}>Feature Values of Your Top Tracks</Heading>
                <Text mb={10}>
                    Now, we'll show you exactly what value every audio feature
                    for each of your top tracks has so you can see how its split
                    up.
                </Text>
                <ScatterPlot
                    feature="Acousticness"
                    description="This value measures the confidence from Spotify's audio analysis that this track is acoustic. A value of 1 means they are confident that this track is acoustic."
                    average={data.topAverages[0]}
                    data={getScatData(data.topTracks, 'acousticness')}
                    fill="#eb9636"
                />
                <ScatterPlot
                    feature="Danceability"
                    description="This value measures the confidence from Spotify's audio analysis about how danceable this song is. A value of 1 means that they are confident this track can be danced to, while 0 means the track is slower and less danceable."
                    average={data.topAverages[1]}
                    data={getScatData(data.topTracks, 'danceability')}
                    fill="#db8fd1"
                />
                <ScatterPlot
                    feature="Energy"
                    description="This value measures the confidence from Spotify's audio analysis of how much energy this track has. A value of 1 means the track has high energy, while 0 means the track has low energy."
                    average={data.topAverages[2]}
                    data={getScatData(data.topTracks, 'energy')}
                    fill="#9ce34f"
                />
                <ScatterPlot
                    feature="Instrumentalness"
                    description="This value measures the confidence from Spotify's audio analysis that this track is instrumental. A value of 1 means the track is only instruments, while 0 means there is singing or spoken word in the track."
                    average={data.topAverages[3]}
                    data={getScatData(data.topTracks, 'instrumentalness')}
                    fill="#ffe261"
                />
                <ScatterPlot
                    feature="Liveness"
                    description="This value measures the confidence from Spotify's audio analysis that this track was recorded live. A value of 1 means the track was likely recorded live and contains the sound of an audience."
                    average={data.topAverages[4]}
                    data={getScatData(data.topTracks, 'liveness')}
                    fill="#5ad1db"
                />
                <ScatterPlot
                    feature="Loudness"
                    description="This value measures the loudness of the track from Spotify's audio analysis. This is measured from -60db to 0db, where 0db is loud and -60db is quiet."
                    average={data.topAverages[8]}
                    data={getScatData(data.topTracks, 'loudness')}
                    fill="#d11515"
                />
                <ScatterPlot
                    feature="Speechiness"
                    description="This value measures the confidence from Spotify's audio analysis that this track is spoken word. A value of 1 means the track is spoken, where a value of 0 means it is sung or only instrumental."
                    average={data.topAverages[6]}
                    data={getScatData(data.topTracks, 'speechiness')}
                    fill="#4978c4"
                />
                <ScatterPlot
                    feature="Valence"
                    description="This value measures the confidence from Spotify's audio analysis that this track has a positive feeling. A value of 1 means the track is positive, while a value of 0 means it is negative."
                    average={data.topAverages[7]}
                    data={getScatData(data.topTracks, 'valence')}
                    fill="#8d47b5"
                />
            </ResponsiveBlock>
        </Layout>
    )
}

interface ItemProps {
    num: number
    title: string
    image: string
    artist: string
    album: string
    external_url: string
}

const TopTrackItem: React.FC<ItemProps> = ({
    num,
    title,
    image,
    artist,
    album,
    external_url,
}) => {
    return (
        <Flex width="100%" align="center" my={3} pl={5}>
            <Heading flex={0.4}>{num}</Heading>
            <Image boxSize="75px" boxShadow="lg" src={image} mr={10} />
            <Flex direction="column" flex={2}>
                <Heading size="md">{title}</Heading>
                <Text as="i">{album}</Text>
                <Text>{artist}</Text>
            </Flex>
            <Spacer />
            <Button
                colorScheme="brand"
                onClick={() => window.open(external_url)}
                flex={1}
            >
                Listen on Spotify <ExternalLinkIcon ml={1} />
            </Button>
        </Flex>
    )
}

export default YourData
