"use client"
import Link from 'next/link';
import React from 'react';
import ContainMargin from './ContainMargin';
import { usePathname } from 'next/navigation';

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

    return (
        <nav className='bg-background fixed w-full border-b-[1px] z-20 border-primary'>
            <ContainMargin>
            <div className='flex gap-20 items-center py-4'>
                <div>
                    <h3 className='text-2xl font-bold'><span className='text-primary'>Code</span>QueryFire</h3>
                </div>
                <div>
                    <ul className='flex items-center justify-center gap-6'>
                        {
                            navmenu.map(navitem => 
                                <li className={`${pathname.includes(navitem.url) && 'text-active'}`}>
                                    <Link href={navitem.url}>{navitem.title}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
            </ContainMargin>
        </nav>
    );
};

export default Navbar;