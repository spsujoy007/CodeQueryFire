import SignupPage from '@/components/Authentication/SignupPage';
import Link from 'next/link';
import React from 'react';

export const metadata = {
    title: `Signup - CodeQueryFire`,
    description: `Answer and post your problem's with CodeQueryFire`,
}

const page = () => {
    return (
        <div className='bg-background w-full h-full flex items-center justify-center'>
            <div className='flex items-center justify-center '>
                <div className='w-[50%] text-center'>
                    <h1 className='text-[80px] uppercase'><span className="text-primary font-bold">Answer</span> and share your <span className="text-primary font-bold">problem&apos;s</span></h1>
                    <p className='text-xl'>with CodeQueryFire</p>
                    <Link href={'/'}><button className='mt-5 bg-black text-white hover:bg-white hover:text-black duration-200 py-1 rounded-md w-[250px]'>Back to home</button></Link>
                </div>
                <div className='w-[50%]'>
                    <SignupPage></SignupPage>
                </div>
            </div>
        </div>
    );
};

export default page;