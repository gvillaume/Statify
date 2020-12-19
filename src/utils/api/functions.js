import axios from "axios"
import qs from "qs"

export const getParamValues = url => {
    return url
        .slice(1)
        .split("&")
        .reduce((prev, curr) => {
            const [title, value] = curr.split("=")
            prev[title] = value
            return prev
        }, {})
}

export const get = async (url, params) => {
    const tokens = JSON.parse(window.localStorage.getItem("tokens"))

    const headers = {
        Authorization: `Bearer ${tokens.access_token}`,
    }

    const response = await axios.get(url, {
        params: params,
        headers: headers,
    })

    return await response.data
}

export const refreshTokens = async () => {
    const client_id = process.env.GATSBY_CLIENT_ID
    const client_secret = process.env.GATSBY_CLIENT_SECRET

    const headers = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
            username: client_id,
            password: client_secret,
        },
    }

    const refresh_token = JSON.parse(window.localStorage.getItem("tokens"))
        .refresh_token

    const data = {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
    }

    const response = await axios.post(
        `${process.env.GATSBY_TOKEN_URL}`,
        qs.stringify(data),
        headers
    )

    const { access_token, expires_in } = response.data

    console.log("Access token-> ", access_token)
    console.log("Expires In -> ", expires_in)

    const newTokens = {
        access_token: access_token,
        expires_in: expires_in,
        refresh_token: refresh_token,
    }

    const expiryTime = new Date().getTime() + expires_in * 1000
    window.localStorage.setItem("expiry_time", `${expiryTime}`)
    window.localStorage.setItem("tokens", JSON.stringify(newTokens))
}
