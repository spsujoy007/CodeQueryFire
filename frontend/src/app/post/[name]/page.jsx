import PostDetails from '@/components/Posts/Post details/PostDetails';
import React from 'react';
 
export async function generateMetadata ({ params, searchParams }) {
    const gettitle = params.name
    const getid = searchParams.id
    let decodedString = decodeURIComponent(gettitle);

    // const res = await fetch('https://mocki.io/v1/4f69807c-4aa7-426f-884d-d51554599b80');

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/post/post_details?id=${getid}`)
    const getdata = await res.json();
    const data = getdata.data.post
      
    // Use the JSON data
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
    
    // const res = await fetch('https://mocki.io/v1/4f69807c-4aa7-426f-884d-d51554599b80');
    // const data = await res.json();
    const data = {
        _id: "652f7543cd214dcf9b247b34",
        author_id: "652f7534d1a6b1bcf8a8b9a1",
        title: "Understanding Event Loop in JavaScript",
        details: "This post explains how the event loop works in JavaScript, focusing on async programming and promises.",
        images: [
          {
            url: "https://example.com/image1.jpg",
            public_id: "image1_public_id"
          }
        ],
        code: "console.log('Hello, World!');",
        programming_language: "JavaScript",
        topics: [
          { name: "JavaScript" },
          { name: "Async" },
          { name: "Event Loop" }
        ],
        source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop",
        createdAt: "2024-10-23T12:34:56.789Z",
        updatedAt: "2024-10-23T12:34:56.789Z"
      }
      

    
    return (
        <div className='w-full h-full bg-background'>
            <div className=' bg-background'>
                <PostDetails searchParams={searchParams}></PostDetails>
            </div>
        </div>
    );
};

export default PostDetailsPage;