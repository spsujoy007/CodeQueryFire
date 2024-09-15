import PostDetails from '@/components/Posts/PostDetails';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const page = async({params}) => {
    const res = await fetch('https://mocki.io/v1/89fe5add-1ac4-4616-88b5-7e89c82f29d3');
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