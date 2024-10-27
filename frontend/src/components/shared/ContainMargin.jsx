import React from 'react';

const ContainMargin = ({box_width, children}) => {

    return (
        <div className={box_width === 'md' ? 'md:w-[90%] w-[96%] mx-auto' : 'md:w-[70%] w-[96%] mx-auto'}>
            {children}
        </div>
    );
};

export default ContainMargin;