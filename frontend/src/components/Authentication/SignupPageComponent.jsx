"use client"
import LoadingPage from '@/app/loading';
import useAuthenticated from '@/Hooks/useAuthenticated';
import useSiteName from '@/Hooks/useSiteName';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

const SignupPageComponent = () => {
    const router = useRouter()
    const name = useSiteName()
    const [viewPass, setViewPass] = useState(false)
    const [registerd, setRegisterd] = useState(false)
    const [error, setError] = useState(false)
    const [serverMsg, setserverMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const inputstyle = `border-b-[1px] outline-none border-b-primary placeholder:text-gray-400 placeholder:text-sm w-full px-2 py-[6px] text-md rounded-t-md`

    const handleRegister = (event) => {
        event.preventDefault()
        setLoading(true)
        // Use FormData to get the input values
        const formData = new FormData(event.target);
        
        // Convert FormData to an object for easier access
        const formValues = Object.fromEntries(formData.entries());
        
        const { firstname, lastname, email, password, repassword } = formValues;

        axios({
            method: 'POST',
            url: 'https://cqf-be.onrender.com/api/v1/users/register',
            data: {
                first_name: firstname, 
                last_name: lastname,
                email,
                password,
            },
            responseType: "json"
        })
        .then((res) => {
            console.log(res.data.message)
            setRegisterd(true)
            setserverMsg(res.data.message)
            setError(false)
            setLoading(false)
            router.push('/login')
        })
        .catch((err) => {
            console.log(err.response.data.split('Error: ')[1].split("<br>")[0])
            setError(true)
            setserverMsg(err.response.data.split('Error: ')[1].split("<br>")[0])
            setRegisterd(false)
            setLoading(false)
        })

    }    

    const { isLoggedIn, loading: isLoadUser } = useAuthenticated()
        // validate for already logged in user 
        if(isLoggedIn) return router.push('/')

        return (
           <>
                {
                    isLoadUser ?
                    <LoadingPage></LoadingPage>
                    :
                    <>
                        <div className='bg-background w-full h-full flex items-center justify-center'>
                            <div className='flex items-center justify-center '>
                                <div className='w-[50%] text-center'>
                                    <h1 className='text-[80px] uppercase'><span className="text-primary font-bold">Answer</span> and share your <span className="text-primary font-bold">problem&apos;s</span></h1>
                                    <p className='text-xl'>with CodeQueryFire</p>
                                    <Link href={'/'}><button className='mt-5 bg-black text-white hover:bg-white hover:text-black duration-200 py-1 rounded-md w-[250px]'>Back to home</button></Link>
                                </div>
                                <div className='w-[50%]'>
                                    {/* start ----------------------- */}
                                    <div className='h-[100vh] mx-auto pt-5 border-primary  border-l-[1px] flex flex-col justify-center '>
                                        <div className="w-[50%] mx-auto">
                                        <div className="w-[90%] mx-auto">
                                            <h2 className="text-2xl font-bold">Sign Up </h2>
                                            <p>Let&apos;s share and learn</p>
                                        </div>
                                        <form onSubmit={handleRegister} className="space-y-5 p-5 mt-5">
                                            <div className='flex gap-2'>
                                                <div className='w-[50%]'>
                                                    <label className="text-sm text-primary ml-[2px]" htmlFor="firstname">First name</label><br />
                                                    <input className={inputstyle} name="firstname" id="firstname" placeholder="type your first name" type="text" />
                                                </div>
                                                <div className='w-[50%]'>
                                                    <label className="text-sm text-primary ml-[2px]" htmlFor="lastname">Last name</label><br />
                                                    <input className={inputstyle} name="lastname" id="lastname" placeholder="type your lastname" type="text" />
                                                </div>
                                            </div>
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
                                                <label className="text-sm text-primary ml-[2px]" htmlFor="password">Retype password</label><br />
                                                <div className="flex items-center">
                                                    <input className={inputstyle} name="repassword" id="repassword" placeholder="retype your password" type={viewPass ? "text" : 'password'} />
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    registerd &&  <span className='text-green-500 text-sm'>{serverMsg}</span>
                                                }
                                                {
                                                    error &&  <span className='text-red-500 text-sm'>{serverMsg}</span>
                                                }
                                                {
                                                    !loading ?
                                                    <input className="w-full cursor-pointer text-white bg-primary hover:bg-white hover:text-primary duration-300 py-2 rounded-md" type="submit" />
                                                    :
                                                    <button className="w-full animate-pulse cursor-pointer text-white bg-primary hover:bg-white hover:text-primary duration-300 py-2 rounded-md">Creating Your Account...</button>
                                                }
                    
                                                <p className='mt-3 text-sm'>Already have an account? Please <Link href="/login" className="text-primary underline font-bold">Login</Link> </p>
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                    {/* end ----------------------- */}
                                </div>
                            </div>
                        </div>
                    </>
                }
           </>
        );

};

export default SignupPageComponent;