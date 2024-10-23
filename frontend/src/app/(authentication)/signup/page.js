import SignupPageComponent from '@/components/Authentication/SignupPageComponent';
import React from 'react';

export const metadata = {
    title: `Signup - CodeQueryFire`,
    description: `Answer and post your problem's with CodeQueryFire`,
}

const SignupPage = () => {
    return (
        <div className='bg-background w-full h-full flex items-center justify-center'>
            <SignupPageComponent></SignupPageComponent>
        </div>
    );
};

export default SignupPage;