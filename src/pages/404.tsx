import React from "react"
import { Heading, Text } from "@chakra-ui/react"

import ResponsiveBlock from "../components/shared/responsive-block"

const Error: React.FC = () => (
    <ResponsiveBlock>
        <Heading>404: Page not found</Heading>
        <Text>Ruh roh, that isn't a thing fuckhead</Text>
    </ResponsiveBlock>
)

export default Error
