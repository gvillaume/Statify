import React from 'react'
import { Heading, Text, Center, Divider } from '@chakra-ui/react'

import Layout from '../components/shared/layout'
import NavigationContext from '../utils/navigation-provider'
import DataContext from '../utils/api/data-provider'
import ResponsiveBlock from '../components/shared/responsive-block'

const Home: React.FC = () => {
    const data = React.useContext(DataContext)
    const navContext = React.useContext(NavigationContext)

    React.useEffect(() => {
        data.updateTracks()
        data.updateTraining()
        navContext.changePage('Home')
    }, [])

    return (
        <Layout>
            <ResponsiveBlock>
                <Center width="100%" flexDirection="column">
                    <Heading>Home</Heading>
                    <Text textAlign="center">Welcome to Statify!</Text>
                    <Divider mt={2} mb={5} />
                    <Text>
                        &emsp;&emsp;Statify is an app that analyzes your top
                        tracks from Spotify and uses the audio features of the
                        tracks to predict if you'll like a new track that you
                        search.
                    </Text>
                    <Text mt={3}>
                        &emsp;&emsp;Statify uses a neural network that takes in
                        Spotify's confidence values for each audio feature of a
                        searched track and compares them to the audio features
                        from your top tracks to understand whether or not the
                        new track aligns with your listening style.
                    </Text>
                    <Text mt={3}>
                        &emsp;&emsp;Go ahead and explore the site to see if that
                        new track you heard about is right for you! Under "Your
                        Data", you can see your top tracks and what audio
                        features you favor in yor favorites. Then in the
                        "Search" tab, you can check out any new tracks and see
                        how Statify thinks you'll like it. Enjoy!
                    </Text>
                </Center>
            </ResponsiveBlock>
        </Layout>
    )
}

export default Home
