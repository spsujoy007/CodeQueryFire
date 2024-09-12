import React from 'react';

const ContainMargin = ({children}) => {
    return (
        <div className='md:w-[92%] w-[96%] mx-auto'>
            {children}
        </div>
    );
};

export default ContainMargin;