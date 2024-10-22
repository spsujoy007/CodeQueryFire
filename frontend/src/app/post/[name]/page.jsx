import PostDetails from '@/components/Posts/PostDetails';
import React from 'react';

const PostDetailsPage = async({params, searchParams}) => {
    const gettitle = params.name
    let decodedString = decodeURIComponent(gettitle);
    console.log("SearchParams: ", searchParams.id)
    console.log("Params: ", params)
    
    const res = await fetch('https://mocki.io/v1/4f69807c-4aa7-426f-884d-d51554599b80');
    const data = await res.json();

    
    return (
        <div className='w-full bg-background pt-16'>
            <div className=' bg-background'>
                <PostDetails post={data} searchParams={searchParams}></PostDetails>
            </div>
        </div>
    );
};

export default PostDetailsPage;