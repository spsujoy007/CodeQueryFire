"use client"
import Link from 'next/link';
import React from 'react';
import ContainMargin from './ContainMargin';

const Navbar = () => {
    return (
        <nav className='bg-background fixed w-full border-b-[1px] z-20 border-primary'>
            <ContainMargin>
            <div className='flex gap-20 items-center py-4'>
                <div>
                    <h3 className='text-2xl font-bold'><span className='text-primary'>Code</span>QueryFire</h3>
                </div>
                <div>
                    <ul className='flex items-center justify-center gap-6'>
                        <li className='text-active'>
                            <Link href={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link href={'/login'}>Login</Link>
                        </li>
                        <li>
                            <Link href={'/signup'}>Signup</Link>
                        </li>
                    </ul>
                </div>
            </div>
            </ContainMargin>
        </nav>
    );
};

export default Navbar;