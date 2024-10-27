import MakePost from '@/components/Posts/MakePost/MakePost';
import React from 'react';

export const metadata = {
    title: 'Make a Post | CodeQueryFire',
    description: 'Make a question or post any opinion with codequeryfire'
}

const page = () => {
    return (
        <div className='w-full h-full'>
            <MakePost></MakePost>
        </div>
    );
};

export default page;