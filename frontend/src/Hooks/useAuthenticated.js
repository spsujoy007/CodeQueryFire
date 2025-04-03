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

    const [dataFetched, setDataFetched] = useState(false)
    const fetchUserData = async() => {
        if(dataFetched) return

        // setDataFetched(true)
        await axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_SERVER}/users/loggedin-profile`,
            withCredentials: true
        })
        .then(res => {
            setIsLoggedIn(true)
            setUserData(res.data.data)
            setLoading(false)
            setDataFetched(true)
        })
        .catch(err => {
            setIsLoggedIn(false)
            setError(err)
            setLoading(false)
            setDataFetched(false)
        })
    }

    useEffect(() => {
        fetchUserData()
    })

    const refetch = async() => {
       await fetchUserData()
    }
    
    
    return {loading, setLoading, user, error, isLoggedIn, refetch}
}