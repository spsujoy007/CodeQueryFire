"use client"
import { usePathname } from 'next/navigation';
import ContainMargin from '../shared/ContainMargin';
import HomeProfile from './HomeProfile';
import Navbar from '../shared/Navbar';
import { useState } from 'react';

const HomeLayout = ({children}) => {
    const paths = ['/', '/saved', '/post/']
    const pathname = usePathname()
    console.log(pathname);
    const showContent = paths.includes(pathname);

    const [openMenu, setOpenMenu] = useState(false)
    return (
        <div>
            {
                showContent ? 
                <>
                {/* <button className='' onClick={() => setOpenMenu(!openMenu)}>menu</button> */}
                    <Navbar></Navbar>
                    <ContainMargin>
                        <div className="md:flex md:flex-row flex-col">
                            <div className={`md:w-[15%]  w-full p-1 min-h-[90vh] overflow-hidden hid md:max-h-[90vh] scroll-pr-14 overflow-y-scroll top-20 duration-200 scrollbar-custom sticky md:ml-0 ${openMenu ? '-ml-0 bg-white ':'-ml-[500px]'}`}>
                                <HomeProfile></HomeProfile>
                            </div>
                            <div className="border-x-[1px] pt-16 border-primary md:w-[70%] min-h-screen w-full">
                                {children}
                            </div>
                            <div className="md:w-[15%] w-full">

                            </div>
                        </div>
                    </ContainMargin>
                </>
                :
                <>
                    <div className='flex justify-center items-center h-screen'>
                        {children}
                    </div>
                </>
            }
        </div>
    );
};

export default HomeLayout;