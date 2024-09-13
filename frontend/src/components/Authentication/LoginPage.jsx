import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
    return (
        <div className='text-center flex justify-center items-center min-h-screen'>
            <p>Login Page</p>
            <p className='ml-5 underline text-primary'>
            <Link href={'/'}>
                home
            </Link>
            </p>
        </div>
    );
};

export default LoginPage;