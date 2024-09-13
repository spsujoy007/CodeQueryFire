"use client"
import { usePathname } from 'next/navigation';
import ContainMargin from '../shared/ContainMargin';
import HomeProfile from './HomeProfile';
import Navbar from '../shared/Navbar';

const HomeLayout = ({children}) => {
    const paths = ['/', '/saved']
    const pathname = usePathname()
    const showContent = paths.includes(pathname);
    console.log(showContent, pathname);
    return (
        <div>
            {
                showContent ? 
                <>
                    <Navbar></Navbar>
                    <ContainMargin>
                        <div className="flex md:flex-row flex-col">
                            <div className="md:w-[20%] md:block hidden w-full p-1 mt-5 max-h-[90vh] scroll-pr-14 overflow-y-scroll top-20 scrollbar-custom sticky">
                                <HomeProfile></HomeProfile>
                            </div>
                            <div className="border-x-[1px] pt-16 border-primary md:w-[80%] min-h-screen w-full">
                                {children}
                            </div>
                            <div className="md:w-[10%] w-full">

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