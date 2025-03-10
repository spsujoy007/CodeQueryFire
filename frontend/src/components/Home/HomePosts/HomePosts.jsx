'use client'
import SingleCard from './SingleCard';
const HomePosts = ({posts}) => {
    
  
    return (
        <div className='space-y-2 mt-3'>
            {
                posts.map((post, id) => 
                  <SingleCard key={post._id} post={post} index={id}></SingleCard>
              )
            }
        </div>
    );
};

export default HomePosts;