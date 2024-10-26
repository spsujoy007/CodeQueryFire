"use client"
// import useAuthenticated from '@/Hooks/useAuthenticated';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomeProfile = () => {
    const pathname = usePathname();
    const router = useRouter
    
    
    // const {user, loading, isLoggedIn} = useAuthenticated()
    // const {
    //     first_name,
    //     last_name,
    //     email
    // } = user


    // useEffect(() => {
    //     router.reload
    // }, [loading, isLoggedIn, user, router])
    const loading = false
    const isLoggedIn = false

    return (
        <>
            {
                loading ?
                <main className='md:pr-4'>
                    {/* profile info */}
                    <div className='animate-pulse duration-150'>
                        <div className='flex items-center gap-3'>
                            <div className='w-[45px] h-[45px] rounded-full bg-gray-200'></div>
                            <div className='w-[65%]'>
                                {/* <h5 className='text-sm font-bold'>{first_name + " " + last_name}</h5> */}
                                <div className='h-[20px] w-full bg-gray-200 rounded-full'></div>
                                <div className='mt-2 h-[10px] w-full bg-gray-200 rounded-full'></div>
                            </div>
                        </div>
                        <div className='mt-2 w-full h-[10px] bg-gray-200 rounded-xl'></div>
                    </div>
                </main>
                :
                <>
                    {
                        isLoggedIn ?
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
                        :
                        <></>
                    }
                </>
            }
        </>
    );
};

export default HomeProfile;