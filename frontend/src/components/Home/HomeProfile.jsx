"use client"
import ServerUrl from '@/Hooks/useServerUrl';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const HomeProfile = () => {
    const pathname = usePathname();

    // console.log('url', `${ServerUrl()}/users/loggedin-profile`)

    // GET request for remote image in node.js
    const [
        {
            first_name,
            last_name,
            bio,
            email
        }, setProfile] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios({
            method: 'get',
            url: `${ServerUrl()}/users/loggedin-profile`,
            withCredentials: true
        })
        .then(res => {
            console.log(res.data.data)
            setProfile(res.data.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [])

    return (
        <>
            {
                !loading &&
                <main className='md:pr-4'>
                {/* profile info */}
                <div>
                    <div className='flex items-center gap-3'>
                        <Image alt='avatar' className='rounded-full ring-1 ring-primary' src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726165245/personal/spsujoy.jpg'} width={45} height={45}></Image>
                        <div>
                            <h5 className='text-sm font-bold'>{first_name + " " + last_name}</h5>
                            <p className='text-xs'>{email}</p>
                        </div>
                    </div>
                    <p className='mt-5 text-xs'>Some ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, ullam!</p>
                </div>
                <div className='mt-5 flex flex-col gap-2'>
                    <Link href={'/'} className=''>
                        <button className={`${pathname === '/' ? 'bg-primary':'bg-gray-400'} text-white w-full py-1 rounded-md`}>Home</button>
                    </Link>
                    <Link href={'/saved'}>
                        <button className={`${pathname === '/saved' ? 'bg-primary':'bg-gray-400'} text-white w-full py-1 rounded-md`}>Saved</button>
                    </Link>
                </div>
            </main>
            }
        </>
    );
};

export default HomeProfile;