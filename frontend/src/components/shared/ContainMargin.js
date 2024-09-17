import React from 'react';

const ContainMargin = ({children, width}) => {
    console.log(width);
    return (
        <div className={`md:max-w-[${width ? width : '90%'}] max-w-[96%] mx-auto`}>
            {children}
        </div>
    );
};

export default ContainMargin;