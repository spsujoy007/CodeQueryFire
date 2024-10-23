import LoginPageComponent from '@/components/Authentication/LoginPageComponent';
import Link from 'next/link';
import React from 'react';

export const metadata = {
    title: `Login - CodeQueryFire`,
    description: `Welcome back to CodeQueryFire`
}

const LoginPage = () => {
    return (
        <div className='bg-background w-full h-full md:flex items-center justify-center'>
            <LoginPageComponent></LoginPageComponent>
        </div>
    );
};

export default LoginPage;