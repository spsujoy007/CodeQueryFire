import LoadingPage from "@/app/loading"
import axios from "axios"
import { useEffect, useState } from "react"
import ServerUrl from "./useServerUrl"

export default function useAuthenticated (req) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUserData] = useState({}) 

    // const cookies = req.cookies;
    // console.log(cookies, "COOKIES")

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const fetchUserData = () => {
        axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_SERVER}/users/loggedin-profile`,
            withCredentials: true
        })
        .then(res => {
            // if(res.data.data)
            console.log("ID: ", res.data.data);
            setIsLoggedIn(true)
            setUserData(res.data.data)
            setLoading(false)
        })
        .catch(err => {
            // console.log(err)
            setIsLoggedIn(false)
            setError(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    const refetch = () => {
        fetchUserData()
    }
    
    
    return {loading, user, error, isLoggedIn, refetch}
}