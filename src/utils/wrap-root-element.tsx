import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../config/theme'
import { NavigationProvider } from './navigation-provider'
import { APIProvider } from './api/api-provider'
import { DataProvider } from './api/data-provider'

interface Props {
    element: React.ReactNode
}

const WrapRootElement: React.FC<Props> = ({ element }) => {
    return (
        <ChakraProvider theme={theme}>
            <APIProvider>
                <DataProvider>
                    <NavigationProvider>{element}</NavigationProvider>
                </DataProvider>
            </APIProvider>
        </ChakraProvider>
    )
}

export default WrapRootElement
