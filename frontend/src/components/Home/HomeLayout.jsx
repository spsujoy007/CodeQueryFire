"use client"
import { usePathname, useSearchParams } from 'next/navigation';
import ContainMargin from '../shared/ContainMargin';
import HomeProfile from './HomeProfile';
import { useState } from 'react';
import useAuthenticated from '@/Hooks/useAuthenticated';
import LoadingPage from '@/app/loading';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

const HomeLayout = ({children}) => {
    const params = useSearchParams()
    const currentTab = params.get('tab')

    const paths = ['/', '/saved', '/post']
    const pathname = usePathname()
    const showContent = paths.includes(pathname);

    const [openMenu, setOpenMenu] = useState(false)

    const { isLoggedIn, loading } = useAuthenticated()

    const [categoryNo, setCategoryNo] = useState(Number(currentTab) || 0)
    const DynamicTitles = [
        "Recent posts",
        "Top posts",
        "Todays hot posts",
        "This week",
        "This month",
    ]

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
                />
            {
                showContent ? 
                <>
                {/* <button className='' onClick={() => setOpenMenu(!openMenu)}>menu</button> */}
                    <ContainMargin box_width={'md'}>
                        <div className="md:flex md:flex-row flex-col">
                            <div className={`md:w-[15%]  w-full p-1 min-h-[90vh] overflow-hidden hid md:max-h-[90vh] scroll-pr-14 overflow-y-scroll top-20 duration-200 scrollbar-custom sticky md:ml-0 ${openMenu ? '-ml-0 bg-white ':'-ml-[500px]'}`}>
                                {
                                    loading ?
                                    <LoadingPage></LoadingPage>
                                    :
                                    <HomeProfile></HomeProfile>
                                }
                            </div>
                            <div className="border-x-[1px] border-primary md:w-[70%] min-h-screen w-full">
                                {/* search and post section  */}
                                <section className=''>
                                    <div className='p-4 bg-background m-3 rounded-md'>
                                        <h1 className='text-[3em] uppercase'>{DynamicTitles[categoryNo]}</h1>
                                            <p>Ask a question or share your opinion</p>

                                        <div className='flex justify-end items-center gap-2'>
                                            <Link href={'/post/makepost'} className='bg-primary border-background border-2 ring-[1px] ring-primary hover:bg-primary_hover text-white font-bold px-5 py-2 rounded-md'>Make a Post</Link>
                                        </div>
                                    </div>

                                    <div className='px-4'>
                                        <div className='flex gap-1 flex-wrap border-[1px] border-[#ddd] p-1 rounded-md'>
                                            <Link href={'/'}>
                                                <button onClick={() => setCategoryNo(0)} className={`border-[1px] border-[#ddd] rounded-md py-1 px-3  ${categoryNo === 0 ? 'bg-black text-white' : 'bg-white text-black'} duration-150`}>Default</button>
                                            </Link>

                                            <Link href={'/?tab=1'}>
                                                <button onClick={() => setCategoryNo(1)} className={`border-[1px] border-[#ddd] rounded-md py-1 px-3  ${categoryNo === 1 ? 'bg-black text-white' : 'bg-white text-black'} duration-150`}>Interesting</button>
                                            </Link>

                                            <Link href={'/?tab=2'}>
                                                <button onClick={() => setCategoryNo(2)} className={`border-[1px] border-[#ddd] rounded-md py-1 px-3  ${categoryNo === 2 ? 'bg-black text-white' : 'bg-white text-black'} duration-150`}>Todays</button>
                                            </Link>

                                            <Link href={'/?tab=3'}>
                                                <button onClick={() => setCategoryNo(3)} className={`border-[1px] border-[#ddd] rounded-md py-1 px-3  ${categoryNo === 3 ? 'bg-black text-white' : 'bg-white text-black'} duration-150`}>Week</button>
                                            </Link>

                                            <Link href={'/?tab=4'}>
                                                <button onClick={() => setCategoryNo(4)} className={`border-[1px] border-[#ddd] rounded-md py-1 px-3  ${categoryNo === 4 ? 'bg-black text-white' : 'bg-white text-black'} duration-150`}>Month</button>
                                            </Link>
                                            
                                        </div>
                                    </div>
                                </section>

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