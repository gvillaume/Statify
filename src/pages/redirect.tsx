import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { navigate } from 'gatsby'
import { window } from 'browser-monads'

import { getParamValues } from '../utils/api/functions'

const Redirect: React.FC = () => {
    React.useEffect(() => {
        async function tokenRequest(code) {
            const client_id = process.env.GATSBY_CLIENT_ID
            const client_secret = process.env.GATSBY_CLIENT_SECRET

            const headers = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: client_id,
                    password: client_secret,
                },
            }

            const data = {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.GATSBY_REDIRECT_URL,
            }

            const response = await axios.post(
                `${process.env.GATSBY_TOKEN_URL}`,
                qs.stringify(data),
                headers
            )

            const { access_token, expires_in, refresh_token } = response.data

            const newTokens = {
                access_token: access_token,
                expires_in: expires_in,
                refresh_token: refresh_token,
            }

            const expiryTime = new Date().getTime() + expires_in * 1000
            window.localStorage.setItem('expiry_time', `${expiryTime}`)

            window.localStorage.setItem('tokens', JSON.stringify(newTokens))
        }

        const returned = getParamValues(window.location.search)
        try {
            tokenRequest(returned.code).then(() => {
                navigate('/home')
            })
        } catch (error) {
            console.log(error)
            navigate('/')
        }
    }, [])

    return null
}

export default Redirect
