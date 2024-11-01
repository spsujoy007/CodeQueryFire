'use client'
import React, { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from 'axios';
import ServerUrl from '@/Hooks/useServerUrl';

const HomePosts = () => {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        axios.get(`${ServerUrl()}/post/viewposts`)
        .then(res => {
            setPosts(res.data.data.posts)
        })
    }, [])
  
    return (
        <div className='space-y-2 mt-0'>
            {
                posts.map(post => 
                  <SingleCard key={post._id} post={post}></SingleCard>
              )
            }
        </div>
    );
};

export default HomePosts;