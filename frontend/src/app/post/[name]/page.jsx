import PostDetails from '@/components/Posts/PostDetails';
import React from 'react';
import { Metadata } from 'next'
 
export async function generateMetadata({ params, searchParams }) {
    const gettitle = params.name
    let decodedString = decodeURIComponent(gettitle);

    const res = await fetch('https://mocki.io/v1/4f69807c-4aa7-426f-884d-d51554599b80');
    const data = await res.json();

    return {
        title: data?.title,
        details: data?.details,

        // open graph 
        openGraph: {
            title: data?.title,
            details: data?.details,
            images: [
                {
                    url: 'https://res.cloudinary.com/cloudinarybysp/image/upload/v1685516074/y3juhac1c3tp4b1txsiv.png',
                    width: 800,
                    height: 500,
                    alt: data?.title
                }
            ]
        }
    }
}

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