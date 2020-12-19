import React from "react"

const NavigationContext = React.createContext({
    page: "Home",
    changePage: newPage => {},
})

interface Props {
    children: React.ReactNode
}

const NavigationProvider: React.FC<Props> = ({ children }) => {
    const [page, setPage] = React.useState("Home")

    const changePage = newPage => setPage(newPage)

    return (
        <NavigationContext.Provider value={{ page, changePage }}>
            {children}
        </NavigationContext.Provider>
    )
}

export default NavigationContext

export { NavigationProvider }
