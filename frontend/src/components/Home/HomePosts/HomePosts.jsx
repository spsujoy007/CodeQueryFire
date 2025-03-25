'use client'
import SingleCard from './SingleCard';
const HomePosts = ({posts, refetch, setDataFetched}) => {
  
    return (
        <div className='space-y-2 mt-3'>
            {
                posts.map((post, id) => 
                  <SingleCard refetch={refetch} key={post._id} setDataFetched={setDataFetched} post={post} index={id}></SingleCard>
              )
            }
        </div>
    );
};

export default HomePosts;