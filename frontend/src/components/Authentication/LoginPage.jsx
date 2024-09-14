"use client"
import Link from "next/link";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
const LoginPage = () => {
    const [viewPass, setViewPass] = useState(false)
    const inputstyle = `border-b-[1px] outline-none border-b-primary placeholder:text-gray-400 placeholder:text-sm w-full px-2 py-[6px] text-md rounded-t-md`

    return (
        <div className='h-[100vh] mx-auto pt-5 border-primary  border-l-[1px] flex flex-col justify-center '>
            <div className="w-[50%] mx-auto">
            <div className="w-[90%] mx-auto">
                <h2 className="text-2xl font-bold">Log In </h2>
                <p>Stay updated with us</p>
            </div>
            <form className="space-y-5 p-5 mt-5">
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
                    <input className="w-full cursor-pointer text-white bg-primary hover:bg-white hover:text-primary duration-300 py-2 rounded-md" type="submit" />

                    <p className='mt-3 text-sm'>New in <span className="text-primary font-bold">Code</span>QueryFire? Please <Link href="/signup" className="text-primary underline font-bold uppercase">Join now</Link> </p>
                </div>
            </form>
            </div>
        </div>
    );
};

export default LoginPage;