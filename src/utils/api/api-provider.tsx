import React from "react"
import axios from "axios"

const APIContext = React.createContext({
    canRefresh: false,

    updateCanRefresh: () => {},

    isValidSession: false,

    checkSession: () => {},
})

interface Props {
    children: React.ReactNode
}

const APIProvider: React.FC<Props> = ({ children }) => {
    const [canRefresh, setCanRefresh] = React.useState(false)
    const [isValidSession, setIsValid] = React.useState(false)

    const updateCanRefresh = () => {
        if (window.localStorage.getItem("tokens")) {
            const tokens = JSON.parse(window.localStorage.getItem("tokens"))
            setCanRefresh(tokens.refresh_token)
        } else {
            setCanRefresh(false)
        }
    }

    const checkSession = () => {
        const expiryTime = JSON.parse(
            window.localStorage.getItem("expiry_time")
        )
        setIsValid(expiryTime && Date.now() < expiryTime)
    }

    return (
        <APIContext.Provider
            value={{
                canRefresh,
                updateCanRefresh,
                isValidSession,
                checkSession,
            }}
        >
            {children}
        </APIContext.Provider>
    )
}

export default APIContext

export { APIProvider }
