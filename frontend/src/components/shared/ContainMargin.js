import React from 'react';

const ContainMargin = ({children, width}) => {
    console.log(width);
    return (
        <div className={`md:w-[${width}%] w-[96%] mx-auto`}>
            {children}
        </div>
    );
};

export default ContainMargin;