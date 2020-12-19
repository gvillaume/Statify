import React from "react"
import { Flex, Divider, Heading, Text } from "@chakra-ui/react"

import { get } from "../../utils/api/functions"
import APIContext from "../../utils/api/api-provider"

const ProfileInfo: React.FC = () => {
    const api = React.useContext(APIContext)

    const [user, setUser] = React.useState({
        isAuthenticated: false,
        name: "",
        email: "",
    })

    React.useEffect(() => {
        const requestUser = async () => {
            if (!user.isAuthenticated) {
                const response = await get("https://api.spotify.com/v1/me")

                setUser({
                    isAuthenticated: true,
                    name: await response.display_name,
                    email: await response.email,
                })
            }
        }

        requestUser()
    }, [])

    return (
        <>
            <Divider my={2} />
            <Flex mb={5}>
                <Flex direction="column">
                    <Text textAlign="center" mb={2} color="gray.500">
                        Signed in as
                    </Text>
                    <Heading size="md" color="gray.700" textAlign="center">
                        {user.name}
                    </Heading>
                    <Text color="gray.500" textAlign="center">
                        {user.email}
                    </Text>
                </Flex>
            </Flex>
        </>
    )
}

export default ProfileInfo
