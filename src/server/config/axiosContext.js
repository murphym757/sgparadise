import React from 'react'
import axios from 'axios'

function axiosClientMain(route) {
    const axiosHeaders = axios.create({
        headers: {
            'Accept': 'application/json',
            "Client-ID": route.params.clientIdIGDB,
            "Authorization": `Bearer ${route.params.accessTokenIGDB}`
        }
    })
    return axiosHeaders
}


const axiosData = {
    axiosClientMain
}

export const AxiosContext = React.createContext(axiosData)