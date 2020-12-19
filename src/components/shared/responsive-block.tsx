import React from "react"
import { Box } from "@chakra-ui/react"

const ResponsiveBlock: React.FC = ({ children }) => (
    <Box px={"20%"} py={5}>
        {children}
    </Box>
)

export default ResponsiveBlock
