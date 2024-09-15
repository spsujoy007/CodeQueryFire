import LoginPage from '@/components/Authentication/LoginPage';
import useSiteName from '@/Hooks/useSiteName';
import Link from 'next/link';
import React from 'react';
const {name, htmlname} = useSiteName() 

export const metadata = {
    title: `Login - ${name}`,
    description: `Welcome back to ${name}`
}

const page = () => {
    return (
        <div className='bg-background w-full h-full flex items-center justify-center'>
            <div className='flex items-center justify-center  w-full'>
                <div className='w-[50%] text-center'>
                    <h1 className='text-[100px] uppercase'><span className="text-primary font-bold">Welcome</span> back</h1>
                    <p className='text-xl'>in {htmlname}</p>
                    <Link href={'/'}><button className='mt-5 bg-black text-white hover:bg-white hover:text-black duration-200 py-1 rounded-md w-[250px]'>Back to home</button></Link>
                </div>
                <div className='w-[50%]'>
                    <LoginPage></LoginPage>
                </div>
            </div>
        </div>
    );
};

export default page;