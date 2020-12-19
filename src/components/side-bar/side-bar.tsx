import React from "react"
import { Link, navigate } from "gatsby"
import {
    Skeleton,
    SkeletonCircle,
    Heading,
    Button,
    Flex,
    Spacer,
    Divider,
    List,
    ListItem,
} from "@chakra-ui/react"

import SideBarTab from "./side-bar-tab"
import ProfileInfo from "./profile-info"
import Footer from "../shared/footer"
import APIContext from "../../utils/api/api-provider"

const SideBar: React.FC = () => {
    const NeuralNetwork = require("../../images/statify_icon.svg") as string
    const [isLoading, setLoading] = React.useState(false)

    const api = React.useContext(APIContext)

    return (
        <Flex
            direction="column"
            align="center"
            px={10}
            pt={5}
            pb={5}
            height="99.8vh"
        >
            <Link to="/home">
                <Flex align="center">
                    <SkeletonCircle size="48px" mr="10px" isLoaded={!isLoading}>
                        <img
                            width="48"
                            src={NeuralNetwork}
                            style={{
                                marginRight: "10px",
                            }}
                        />
                    </SkeletonCircle>
                    <Skeleton isLoaded={!isLoading}>
                        <Heading color="brand.500" size="xl">
                            Statify
                        </Heading>
                    </Skeleton>
                </Flex>
            </Link>
            <Divider my={3} />
            <List spacing={3} width="100%">
                <ListItem>
                    <Skeleton isLoaded={!isLoading}>
                        <SideBarTab title="Search Track" link="search" />
                    </Skeleton>
                </ListItem>
                <Divider />
                <ListItem>
                    <Skeleton isLoaded={!isLoading}>
                        <SideBarTab title="Your Data" link="your-data" />
                    </Skeleton>
                </ListItem>
            </List>
            <Spacer />
            {!isLoading && <ProfileInfo />}
            <Skeleton isLoaded={!isLoading}>
                <Button
                    onClick={() => {
                        window.localStorage.clear()
                        api.checkSession()
                        navigate("/")
                    }}
                    colorScheme="brand"
                >
                    Disconnect
                </Button>
            </Skeleton>
            <Footer />
        </Flex>
    )
}

export default SideBar
