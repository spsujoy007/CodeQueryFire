import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div>
            <p className='text-xl text-center'>The page does not exists <br />
            back to <Link href={'/'} className='text-primary underline font-semibold'>home</Link></p>
        </div>
    );
};

export default NotFound;