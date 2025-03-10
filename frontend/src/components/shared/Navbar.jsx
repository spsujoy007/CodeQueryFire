"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ContainMargin from './ContainMargin';
import { usePathname } from 'next/navigation';
import useSiteName from '@/Hooks/useSiteName';
import useAuthenticated from '@/Hooks/useAuthenticated';
import Image from 'next/image';
import ServerUrl from '@/Hooks/useServerUrl';
import axios from 'axios';
const null_avatar = '/images/null_avatar.jpeg'

const Navbar = () => {
    const {isLoggedIn, user, loading} = useAuthenticated()
    const [drawer, setDrawer] = useState(false)

    // console.log("is logged in: ", isLoggedIn)

    const pathname = usePathname()
    const navmenu = [
        {
            title: "Home",
            url: '/',
        },
        {
            title: "Login",
            url: '/login',
        },
        {
            title: "Signup",
            url: '/signup',
        }
    ]

    const loggedInMenuItems = [
        {
            title: "Home",
            url: '/',
        },
        {
            title: "Profile",
            url: `/profile/${user?.username}`,
        }
    ]

    const name = useSiteName()
    // const activeRoute = navmenu.includes(pathname)

    const handleLogoutUser = async () => {
        await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_SERVER}/users/logout_user`,
            withCredentials: true
        })
        .then(data => {
            console.log(data)
            location.reload()
        })
        .catch(e => {
            location.reload()
        })
    }

    return (
        <div onMouseLeave={() => setDrawer(false)} className='bg-[#ffffffbf] backdrop-blur-md fixed top-0 w-full border-b-[1px] z-20 border-primary'>
            <ContainMargin box_width={'md'}>
            <div className='flex gap-20 items-center py-4'>
                <div>
                    <Link href={'/'}><h3 className='text-2xl font-bold select-none'><span className='text-primary'>Code</span>QueryFire</h3></Link>
                </div>
                <div className='flex gap-5 items-center w-full justify-between'>
                    <ul className='flex items-center justify-center gap-6'>
                        {
                            loading ?
                            <></>
                            :
                            <>
                                {
                                    isLoggedIn ?
                                    <>
                                        {
                                            loggedInMenuItems.map(navitem => 
                                                <li key={navitem.url} className={`${navitem.url === pathname ? 'text-active': 'text-black'}`}>
                                                    <Link href={navitem.url}>{navitem.title}</Link>
                                                </li>
                                            )
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            navmenu.map(navitem => 
                                                <li key={navitem.url} className={`${navitem.url === pathname ? 'text-active': 'text-black'}`}>
                                                    <Link href={navitem.url}>{navitem.title}</Link>
                                                </li>
                                            )
                                        }
                                    </>
                                    
                                }
                            </>
                        }
                    </ul>

                    <div className='w-[40%] flex items-center gap-5'>
                        <input className='text-sm w-full py-2 px-2 border-[1px] border-gray-200 rounded-md outline-none' placeholder='search what you want...' type="text" />

                        {
                            isLoggedIn &&
                            <div onMouseOver={() => setDrawer(true)}  className='relative'>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    {/* <p>{user && user.first_name}</p> */}
                                    <div className='w-[35px] h-[35px]'>
                                        <Image className='w-full h-full object-cover rounded-full ring-[1px] ring-primary border-2 border-white' width={35} height={35} src={user?.avatar ? user.avatar?.url : null_avatar} alt='profile_pic'></Image>
                                    </div>
                                </div>

                                {
                                    drawer &&
                                    <div className='absolute top-10 -right-4 w-[200px] rounded-md border-[1px] border-gray-300  bg-white backdrop-blur-md p-2'>
                                        <Link href={`/profile/${user?.username}`}>
                                            <button className='mt-2 mb-1 w-full py-2 border-[1px] border-gray-300 hover:bg-gray-200 duration-300 rounded-md'>Profile</button>
                                        </Link>
                                        <button onClick={handleLogoutUser} className='w-full py-2 border-[1px] border-gray-300 hover:bg-gray-200 duration-300 rounded-md'>Logout</button>
                                    </div>
                                }
                            </div>
                        }
                    </div>

                </div>
                
            </div>
            </ContainMargin>
        </div>
    );
};

export default Navbar;