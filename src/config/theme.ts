import { extendTheme } from "@chakra-ui/react"

interface GlobalProps {
    colorMode: string
    theme: Record<string, unknown>
}

const config = {
    useSystemColorMode: false,
    initialColorMode: "light",
}

const colors = {
    brand: {
        50: "#ebfae4",
        100: "#ceebc3",
        200: "#b2dca0",
        300: "#93ce7c",
        400: "#75c058",
        500: "#5ca73f",
        600: "#468230",
        700: "#315d21",
        800: "#1c3911",
        900: "#031500",
    },
}

const fonts = {
    heading: `"Montserrat", sans-serif`,
    mono: `"Montserrat", sans-serif`,
}

const styles = {
    global: ({ colorMode }: GlobalProps) => ({
        // "html, body": {
        //     color: colorMode === "dark" ? "whiteAlpha.900" : "gray.800",
        //     backgroundColor: colorMode === "dark" ? "gray.900" : "white",
        //     transition: "background-color 0.2s",
        // },
        body: {
            backgroundColor: colorMode === "dark" ? "gray.900" : "white",
            overscrollBehavior: "none",
        },
        a: {
            color: colorMode === "dark" ? "brand.300" : "brand.400",
        },
    }),
}

export const theme = extendTheme({ config, colors, fonts, styles })
