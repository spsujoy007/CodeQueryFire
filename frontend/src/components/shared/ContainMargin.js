import React from 'react';

const ContainMargin = ({children, width}) => {
    return (
            <div className={`${width ? `md:w-[${width}%]` : `md:w-[90%]`} w-[96%] mx-auto`}>
            {/* <div className={`${width ? `md:w-[${width}%]` : `md:w-[90%]`} w-[96%] mx-auto`}> */}
                {children}
            </div>
    );
};

export default ContainMargin;