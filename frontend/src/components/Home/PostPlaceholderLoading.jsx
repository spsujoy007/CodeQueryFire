import React from 'react';

const PostPlaceholderLoading = () => {
    return (
        <>
            {
                Array.from({length: 5}, (_, i) => i).map(num => 
                    <div key={num} className='p-4 border-t-[1px] border-primary'>
                        <div className='bg-gray-200 p-2 w-[500px] rounded-full animate-pulse duration-75'></div>
                        <div className='mt-2 flex items-center gap-2'>
                            <div className='p-2 bg-gray-200 w-[100px] rounded-full animate-pulse duration-100'></div>
                            <div className='p-2 bg-gray-200 w-[100px] rounded-full animate-pulse duration-150'></div>
                        </div>
                        <div className='mt-4 space-y-1'>
                            <div className='p-2 bg-gray-200 w-[100px] rounded-full animate-pulse duration-200'></div>
                            <div className='p-2 bg-gray-200 w-[100px] rounded-full animate-pulse duration-150'></div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default PostPlaceholderLoading;