import LoadingPage from "@/app/loading"
import axios from "axios"
import { useEffect, useState } from "react"
import ServerUrl from "./useServerUrl"

export default function useAuthenticated () {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUserData] = useState({}) 
    
    useEffect(() => {
        axios({
            method: 'get',
            url: `${ServerUrl()}/users/loggedin-profile`,
            withCredentials: true
        })
        .then(res => {
            console.log(res.data.data)
            setUserData(res.data.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setError(err)
            setLoading(false)
        })
    }, [])

    return {loading, user, error}


}