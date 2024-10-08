"use client"
import Link from 'next/link';
import React from 'react';
import ContainMargin from './ContainMargin';
import { usePathname } from 'next/navigation';
import useSiteName from '@/Hooks/useSiteName';

const Navbar = () => {
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

    const name = useSiteName()

    return (
        <div className='bg-[#ffffffbf] backdrop-blur-md fixed w-full border-b-[1px] z-20 border-primary'>
            <ContainMargin width={90}>
            <div className='flex gap-20 items-center py-4'>
                <div>
                    {/* <Link href={'/'}>
                        <div className='w-[200px]'>{htmlname}</div>
                    </Link> */}
                    <Link href={'/'}><h3 className='text-2xl font-bold select-none'>{name}</h3></Link>
                </div>
                <div>
                    <ul className='flex items-center justify-center gap-6'>
                        {
                            navmenu.map((navitem, i) => 
                                <li key={i} className={`${pathname.includes(navitem.url) && 'text-active'}`}>
                                    <Link href={navitem.url}>{navitem.title}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
            </ContainMargin>
        </div>
    );
};

export default Navbar;