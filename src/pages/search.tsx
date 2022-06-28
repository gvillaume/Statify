import React from 'react'
import {
    Flex,
    Spinner,
    Box,
    Center,
    Heading,
    Text,
    Input,
    Button,
    Divider,
    Spacer,
    Image,
    Link,
} from '@chakra-ui/react'
import { BarChart, Bar, YAxis, XAxis, Tooltip, Legend } from 'recharts'
import {
    CheckIcon,
    CloseIcon,
    ChevronRightIcon,
    ExternalLinkIcon,
} from '@chakra-ui/icons'
import { window, exists } from 'browser-monads'
import ml5 from 'ml5'

import { get } from '../utils/api/functions'
import Layout from '../components/shared/layout'
import NavigationContext from '../utils/navigation-provider'
import DataContext from '../utils/api/data-provider'
import ResponsiveBlock from '../components/shared/responsive-block'

const Search: React.FC = () => {
    const navContext = React.useContext(NavigationContext)
    const dataContext = React.useContext(DataContext)

    const [value, setValue] = React.useState('')
    const [results, setResults] = React.useState(
        <Box pt={10}>
            <Heading size="lg">Search a track evaluate it</Heading>
        </Box>
    )

    React.useEffect(() => {
        async function updateData() {
            dataContext.updateTracks()
            dataContext.updateTraining()
            navContext.changePage('Search Track')
        }

        updateData()
    }, [])

    async function handleSearch(search) {
        if (search) {
            const response = await get('https://api.spotify.com/v1/search', {
                q: search,
                type: 'track',
                limit: 5,
            })

            setResults(
                <Flex direction="column" width={'100%'}>
                    {response.tracks.items.map((track, idx) => {
                        return (
                            <Box key={idx}>
                                <TrackCard
                                    clickHandler={handleClassify}
                                    id={track.id}
                                    title={track.name}
                                    image={track.album.images[0].url}
                                    artist={track.artists[0].name}
                                    album={track.album.name}
                                    external_url={track.external_urls.spotify}
                                />
                                <Divider my={5} />
                            </Box>
                        )
                    })}
                </Flex>
            )

            console.log('Search results: ', response)
        } else {
            console.log('query cannot be empty')
        }
    }

    async function handleClassify(
        id,
        title,
        image,
        artist,
        album,
        external_url
    ) {
        setResults(
            <Center flexDirection="column">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="brand.500"
                    size="xl"
                />
                <Text>Loading...</Text>
            </Center>
        )
        const data = [...dataContext.topTracks, ...dataContext.trainingTracks]

        const response = await get(
            `https://api.spotify.com/v1/audio-features/${id}`
        )

        const input = {
            acousticness: response.acousticness,
            danceability: response.danceability,
            energy: response.energy,
            instrumentalness: response.instrumentalness,
            liveness: response.liveness,
            loudness: response.loudness,
            speechiness: response.speechiness,
            valence: response.valence,
        }

        const options = {
            task: 'classification',
        }

        const nn = ml5.neuralNetwork(options)

        data.forEach(item => {
            const inputs = {
                acousticness: item.acousticness,
                danceability: item.danceability,
                energy: item.energy,
                instrumentalness: item.instrumentalness,
                liveness: item.liveness,
                loudness: item.loudness,
                speechiness: item.speechiness,
                valence: item.valence,
            }

            const output = {
                recommend: item.recommend,
            }

            nn.addData(inputs, output)
        })

        nn.normalizeData()

        const trainingOptions = {
            epochs: 32,
            batchSize: 12,
        }
        nn.train(trainingOptions, finishedTraining)

        function finishedTraining() {
            classify()
        }

        function classify() {
            nn.classify(input, handleResults)
        }

        function handleResults(error, result) {
            if (error) {
                console.error(error)
                return
            }
            console.log(result)
            let prediction = result[0]

            const data = [
                {
                    name: 'Acousticness',
                    in: input.acousticness,
                    avg: dataContext.topAverages[0],
                },
                {
                    name: 'Danceability',
                    in: input.danceability,
                    avg: dataContext.topAverages[1],
                },
                {
                    name: 'Energy',
                    in: input.energy,
                    avg: dataContext.topAverages[2],
                },
                {
                    name: 'Instrumentalness',
                    in: input.instrumentalness,
                    avg: dataContext.topAverages[3],
                },
                {
                    name: 'Liveness',
                    in: input.liveness,
                    avg: dataContext.topAverages[4],
                },
                {
                    name: 'Loudness',
                    in: (input.loudness + 60) / 60,
                    avg: dataContext.topAverages[5],
                },
                {
                    name: 'Speechiness',
                    in: input.speechiness,
                    avg: dataContext.topAverages[6],
                },
                {
                    name: 'Valence',
                    in: input.valence,
                    avg: dataContext.topAverages[7],
                },
            ]
            setResults(
                <Center flexDirection="column">
                    <Flex align="center">
                        {prediction.label === 'yes' ? (
                            <CheckIcon w={10} h={10} color={'brand.500'} />
                        ) : (
                            <CloseIcon w={6} h={6} color={'red.500'} />
                        )}
                        <Heading
                            ml={3}
                            size="xl"
                            color={
                                prediction.label === 'yes'
                                    ? 'brand.500'
                                    : 'red.500'
                            }
                        >
                            {prediction.label}
                        </Heading>
                    </Flex>
                    <Text size="md" color="gray.400">
                        {prediction.confidence > 0.85 && 'very '}
                        {prediction.confidence < 0.65 && 'not very '}
                        confident
                    </Text>
                    <Text size="md" color="gray.400">
                        ({prediction.confidence})
                    </Text>
                    <Flex mt={3}>
                        <Image
                            boxSize="300px"
                            boxShadow="lg"
                            my={5}
                            src={image}
                        />
                        <Flex ml={7} direction="column" justify="center">
                            <Heading>{title}</Heading>
                            <Text as="i" fontSize="2xl">
                                {album}
                            </Text>
                            <Text fontSize="2xl">{artist}</Text>
                            <Link color="brand" isExternal href={external_url}>
                                <Flex align="center">
                                    Open in Spotify <ExternalLinkIcon ml={1} />
                                </Flex>
                            </Link>
                        </Flex>
                    </Flex>
                    <Box mt={10} width="100%">
                        <Heading size="lg" textAlign="center">
                            Audio Feature Comparison
                        </Heading>
                        <BarChart height={600} width={900} data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="in" fill="#459ed1" />
                            <Bar dataKey="avg" fill="#5ca73f" />
                        </BarChart>
                    </Box>
                </Center>
            )
        }
    }

    return (
        <Layout>
            <ResponsiveBlock>
                <Heading>Search Track</Heading>
                <Text>
                    A place to search a track and see if Statify thinks you'll
                    like it. You can also see the statistics of the song
                    compared to your typical listening habits.
                </Text>
                <Divider my={5} />
                <Flex>
                    <Input
                        placeholder="Search"
                        focusBorderColor="brand.500"
                        size="lg"
                        mr={5}
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                    <Button
                        colorScheme="brand"
                        size="lg"
                        onClick={() => handleSearch(value)}
                    >
                        Search
                    </Button>
                </Flex>
                <Center mt={5}>{results}</Center>
            </ResponsiveBlock>
        </Layout>
    )
}

interface Props {
    clickHandler: (id, title, image, artist, album, external_url) => {}
    id: string
    title: string
    image: string
    artist: string
    album: string
    external_url: string
}

const TrackCard: React.FC<Props> = ({
    clickHandler,
    id,
    title,
    image,
    artist,
    album,
    external_url,
}) => {
    return (
        <Link
            onClick={() =>
                clickHandler(id, title, image, artist, album, external_url)
            }
        >
            <Flex width="100%" align="center">
                <Image boxSize="100px" boxShadow="md" src={image} mr={10} />
                <Flex direction="column">
                    <Heading size="md">{title}</Heading>
                    <Text as="i">{album}</Text>
                    <Text>{artist}</Text>
                </Flex>
                <Spacer />
                <ChevronRightIcon w={7} h={7} color="gray.300" />
            </Flex>
        </Link>
    )
}

export default Search
