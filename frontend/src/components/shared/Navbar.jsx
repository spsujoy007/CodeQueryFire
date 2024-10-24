"use client"
import Link from 'next/link';
import React from 'react';
import ContainMargin from './ContainMargin';
import { usePathname } from 'next/navigation';
import useSiteName from '@/Hooks/useSiteName';
import useAuthenticated from '@/Hooks/useAuthenticated';

const Navbar = () => {
    const {isLoggedIn} = useAuthenticated()
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
            url: '/profile',
        }
    ]

    const name = useSiteName()
    // const activeRoute = navmenu.includes(pathname)

    return (
        <div className='bg-[#ffffffbf] backdrop-blur-md fixed top-0 w-full border-b-[1px] z-20 border-primary'>
            <ContainMargin width={90}>
            <div className='flex gap-20 items-center py-4'>
                <div>
                    {/* <Link href={'/'}>
                        <div className='w-[200px]'>{htmlname}</div>
                    </Link> */}
                    <Link href={'/'}><h3 className='text-2xl font-bold select-none'><span className='text-primary'>Code</span>QueryFire</h3></Link>
                </div>
                <div>
                    <ul className='flex items-center justify-center gap-6'>
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
                    </ul>
                </div>
            </div>
            </ContainMargin>
        </div>
    );
};

export default Navbar;