import PostDetails from '@/components/Posts/PostDetails';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const page = async({params, searchParams}) => {
    const gettitle = params.name
    let decodedString = decodeURIComponent(gettitle);
    
    const res = await fetch('https://mocki.io/v1/4f69807c-4aa7-426f-884d-d51554599b80');
    const data = await res.json();

    
    return (
        <div className='w-full h-full'>
            <Navbar></Navbar>
            <PostDetails post={data} searchParams={searchParams}></PostDetails>
        </div>
    );
};

export default page;