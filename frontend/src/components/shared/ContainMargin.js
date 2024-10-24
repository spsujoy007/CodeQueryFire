import React from 'react';

const ContainMargin = ({box_width, children}) => {
    

    const custom_width = () => {
        console.log(box_width)
        if (box_width === 'sm') {
            return 60
        }
    }

    return (
            <div className={`md:w-[90%] w-[96%] mx-auto`}>
            {/* <div className={`${width ? `md:w-[${width}%]` : `md:w-[90%]`} w-[96%] mx-auto`}> */}
                {children}
            </div>
    );
};

export default ContainMargin;