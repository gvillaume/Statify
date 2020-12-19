import React from "react"

interface Props {
    element: React.ReactNode
}

const WrapPageElement: React.FC<Props> = ({ element }) => {
    return <>{element}</>
}

export default WrapPageElement
