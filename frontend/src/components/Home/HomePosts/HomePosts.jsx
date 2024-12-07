'use client'
import SingleCard from './SingleCard';
const HomePosts = ({posts}) => {
    
  
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