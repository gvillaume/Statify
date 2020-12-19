import React from "react"
import { Text, Link, Divider } from "@chakra-ui/react"

const Footer: React.FC = () => (
    <>
        <Divider mt={3} mb={1} />
        <Text fontSize="xs" color="gray.400">
            Developed by{" "}
            <Link
                color="gray.500"
                href="https://github.com/gvillaume"
                isExternal
            >
                George Villaume
            </Link>
        </Text>
    </>
)

export default Footer
