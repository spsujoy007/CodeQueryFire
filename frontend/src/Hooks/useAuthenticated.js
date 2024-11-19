import LoadingPage from "@/app/loading"
import axios from "axios"
import { useEffect, useState } from "react"
import ServerUrl from "./useServerUrl"

export default function useAuthenticated () {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUserData] = useState({}) 
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    try{
        useEffect(() => {
            axios({
                method: 'get',
                url: `${ServerUrl()}/users/loggedin-profile`,
                withCredentials: true
            })
            .then(res => {
                setIsLoggedIn(true)
                setUserData(res.data.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoggedIn(false)
                setError(err)
                setLoading(false)
            })
        }, [])
    }
    finally {
        return {loading, user, error, isLoggedIn}
    }
}