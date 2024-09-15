'use client'
import React from 'react';
import SingleCard from './SingleCard';

const HomePosts = ({posts}) => {
  
    return (
        <div className='space-y-2 mt-0'>
            {
                posts.map((post, i) => 
                  <SingleCard key={i} post={post}></SingleCard>
              )
            }
        </div>
    );
};

export default HomePosts;