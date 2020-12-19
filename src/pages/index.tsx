import React from "react"
import { navigate } from "gatsby"
import { Center, Flex, Divider, Heading, Text, Button } from "@chakra-ui/react"

import Footer from "../components/shared/footer"
import APIContext from "../utils/api/api-provider"

const LandingPage: React.FC = () => {
    const NeuralNetwork = require("../images/statify_icon.svg") as string

    const scopes = "user-read-private user-read-email user-top-read"
    const handleLogin = () => {
        window.location.href = `${process.env.GATSBY_AUTHORIZE_URL}?client_id=${
            process.env.GATSBY_CLIENT_ID
        }&response_type=code&redirect_uri=${
            process.env.GATSBY_REDIRECT_URL
        }&scope=${encodeURIComponent(scopes)}`
    }

    const api = React.useContext(APIContext)
    React.useEffect(() => {
        api.checkSession()
        if (api.isValidSession) {
            navigate("/home")
        }
    }, [])

    return (
        <Center style={{ width: "100vw", height: "100vh" }}>
            <Flex
                align="center"
                justify="space-around"
                width={300}
                height={400}
                direction="column"
                borderWidth="1px"
                borderColor="gray.100"
                borderTopWidth="6px"
                borderTopColor="brand.500"
                boxShadow="sm"
                px={10}
                pb={2}
            >
                <Center flex={2} flexDirection="column">
                    <img
                        width="70"
                        src={NeuralNetwork}
                        style={{
                            marginRight: "10px",
                        }}
                    />
                    <Heading pb={3} color="brand.500">
                        Statify
                    </Heading>
                    <Divider />
                    <Text py={3} textAlign="center">
                        Find out if that new track is right for you!
                    </Text>
                </Center>
                <Flex flex={0.5}>
                    <Button colorScheme="brand" onClick={handleLogin}>
                        Connect Spotify
                    </Button>
                </Flex>
                <Footer />
            </Flex>
        </Center>
    )
}

export default LandingPage
