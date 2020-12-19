import React from "react"
import { Link } from "gatsby"
import { Heading, Flex } from "@chakra-ui/react"

import NavigationContext from "../../utils/navigation-provider"

interface Props {
    title: string
    link: string
}

const SideBarTab: React.FC<Props> = ({ title, link }) => {
    const navContext = React.useContext(NavigationContext)

    return (
        <Link to={`/${link}`}>
            <Flex
                align="center"
                height="50px"
                _hover={{ color: "brand.500" }}
                pl={5}
                borderLeftWidth={navContext.page === title ? 5 : 0}
                borderColor={navContext.page === title ? "brand.500" : "white"}
            >
                <Heading
                    size="md"
                    color={navContext.page === title ? "brand.500" : "black"}
                >
                    {title}
                </Heading>
            </Flex>
        </Link>
    )
}

export default SideBarTab
