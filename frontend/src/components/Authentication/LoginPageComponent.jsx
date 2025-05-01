"use client"
import LoadingPage from "@/app/loading";
import useAuthenticated from "@/Hooks/useAuthenticated";
import useSiteName from "@/Hooks/useSiteName";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
const LoginPageComponent = () => {
    const getHistoryPath = useSearchParams()
    // const navigate = useNa 
    const router = useRouter()
    const name = useSiteName()
    
    const [viewPass, setViewPass] = useState(false)
    const [registerd, setRegisterd] = useState(false)
    const [error, setError] = useState(false)
    const [serverMsg, setserverMsg] = useState("")
    const [loading, setLoading] = useState(false)
    
    
    const inputstyle = `border-b-[1px] outline-none border-b-primary placeholder:text-gray-400 placeholder:text-sm w-full px-2 py-[6px] text-md rounded-t-md`
    
    const handleLogin = (event) => {
        event.preventDefault()
        setLoading(true)
        
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        const { email, password } = formValues;
        console.log(email, password)
        axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_SERVER}/users/login`,
            data: {
                email, password
            },
            withCredentials: true
        })
        .then(res => {
            let HistoryPath = getHistoryPath.get("page")
            let PostID = getHistoryPath.get("id")
            setRegisterd(true)
            setserverMsg(res.data.message)
            setError(false)
            setLoading(false)

            if (HistoryPath && typeof PostID === "undefined") {
                router.push(`${encodeURI(HistoryPath)}`);
              } else if (PostID) {
                router.push(`${encodeURI(HistoryPath)}?id=${PostID}`);
              } else {
                router.push('/');
              }
        })
        .catch(err => {
            console.error(err)
            setError(true)
            setRegisterd(false)
            // setserverMsg(err.response.data.split('Error: ')[1].split("<br>")[0])
            setLoading(false)
        })
    }

    const { isLoggedIn, loading: isLoadUser } = useAuthenticated()
        /// validate for already logged in user
        if(isLoggedIn) return router.push('/')
        return (
            <>
                {
                    isLoadUser ?
                    <LoadingPage></LoadingPage>
                    :
                    <>
                        <div className='bg-background w-full h-full md:flex items-center justify-center'>
                            <div className='flex md:flex-row flex-col items-center justify-center  w-full'>
                                <div className='md:w-[50%] md:text-center md:my-0 mt-20 mb-5'>
                                    <h1 className='md:text-[100px] text-[50px] uppercase'><span className="text-primary font-bold">Welcome</span> back</h1>
                                    <p className='text-xl'>in CodeQueryFire</p>
                                    <Link href={'/'}><button className='mt-5 bg-black text-white hover:bg-white hover:text-black duration-200 py-1 rounded-md w-[250px] text-sm md:text-md'>Back to home</button></Link>
                                </div>
                                <div className='md:w-[50%]'>
                                    {/* start ---------------------- */}
                                    <div className='md:h-[100vh] mx-auto pt-5 border-primary  md:border-l-[1px] flex md:flex-col flex-row justify-center '>
                                        <div className="md:w-[50%] mx-auto">
                                        <div className="md:w-[90%] mx-auto text-left">
                                            <h2 className="text-2xl font-bold">Log In </h2>
                                            <p>Stay updated with us</p>
                                        </div>
                                        <form onSubmit={handleLogin} className="space-y-5 w-full md:p-5 mt-5">
                                            <div>
                                                <label className="text-sm text-primary ml-[2px]" htmlFor="email">Email</label><br />
                                                <input className={inputstyle} name="email" id="email" placeholder="type your email" type="email" />
                                            </div>
                                            <div>
                                                <label className="text-sm text-primary ml-[2px]" htmlFor="password">Password</label><br />
                                                <div className="flex items-center">
                                                    <input className={inputstyle} name="password" id="password" placeholder="create a password" type={viewPass ? "text" : 'password'} />
                                                    {
                                                        viewPass ?
                                                        <LuEye onClick={() => setViewPass(!viewPass)} title="view password" className="text-xl -ml-8 cursor-pointer select-none" />
                                                        :
                                                        <LuEyeOff onClick={() => setViewPass(!viewPass)} title="view password" className="text-xl -ml-8 cursor-pointer select-none" />
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    registerd &&  <span className='text-green-500 text-sm'>{serverMsg}</span>
                                                }
                                                {
                                                    error &&  <span className='text-red-500 text-sm'>{serverMsg}</span>
                                                }
                
                                                {/* login handler  */}
                                                {
                                                    !loading ?
                                                    <input className="w-full cursor-pointer text-white bg-primary hover:bg-white hover:text-primary duration-300 py-2 rounded-md" type="submit" />
                                                    :
                                                    <button className="w-full animate-pulse cursor-pointer text-white bg-primary hover:bg-white hover:text-primary duration-300 py-2 rounded-md">Getting You Inside...</button>
                                                }
                
                                                <p className='mt-3 text-sm'>New in {name}? Please <Link href="/signup" className="text-primary underline font-bold uppercase">Join now</Link> </p>
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                    {/* end ---------------------- */}
                                </div>
                            </div>
                        </div>
                    </>
                }
            </>
            
        );
    
};

export default LoginPageComponent;