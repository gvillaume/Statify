import React from "react"
import { Box, Flex } from "@chakra-ui/react"

import SideBar from "../side-bar/side-bar"
import APIContext from "../../utils/api/api-provider"
import { refreshTokens } from "../../utils/api/functions"

const Layout: React.FC = ({ children }) => {
    const api = React.useContext(APIContext)

    React.useEffect(() => {
        api.checkSession()
        if (!api.isValidSession) {
            refreshTokens()
        }
    }, [])

    return (
        <>
            <Flex>
                <Box
                    width="20%"
                    borderColor="gray.100"
                    borderWidth="1px"
                    boxShadow="lg"
                >
                    <SideBar />
                </Box>
                <Box flex="1" pb={24} height="99.8vh" overflowY="scroll">
                    {children}
                </Box>
            </Flex>
        </>
    )
}

export default Layout
