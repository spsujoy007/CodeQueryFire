import PostDetails from '@/components/Posts/PostDetails';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const page = async({params}) => {
    const res = await fetch('https://mocki.io/v1/4f69807c-4aa7-426f-884d-d51554599b80');
    const data = await res.json();

    const gettitle = params.name
    let decodedString = decodeURIComponent(gettitle);

    
    return (
        <div className='w-full h-full'>
            <Navbar></Navbar>
            <PostDetails post={data}></PostDetails>
        </div>
    );
};

export default page;