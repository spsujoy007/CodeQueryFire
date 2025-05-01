import React from 'react';
import LoadingPage from '../loading';

const loading = () => {
    return (
        <div className='w-full h-full z-[100]'>
            <LoadingPage></LoadingPage>
        </div>
    );
};

export default loading;