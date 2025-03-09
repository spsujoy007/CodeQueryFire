"use client"
import ContainMargin from '../shared/ContainMargin';
import HomeProfile from './HomeProfile';
import { Suspense, useEffect, useState } from 'react';
import useAuthenticated from '@/Hooks/useAuthenticated';
import LoadingPage from '@/app/loading';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import HomePosts from './HomePosts/HomePosts';
import axios from 'axios';
import ServerUrl from '@/Hooks/useServerUrl';
import Head from 'next/head';

const HomeLayout = ({children}) => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const query_name = searchParams.get("category") || ""
    
    const paths = ['/', '/saved', '/post']
    let pathname = usePathname()
    let showContent = paths.includes(pathname);
    // let pathname = '/'

    const [openMenu, setOpenMenu] = useState(false)

    const { user, isLoggedIn, loading } = useAuthenticated()

    const [categoryName, setcategoryName] = useState(query_name || "")

    const DynamicTitles = [
        {title: {name: "", tag:"Recent posts", sort_date: 0}},
        {title: {name: "interesting", tag:"Top posts"}},
        {title: {name: "todays", tag:"Todays hot posts"}},
        {title: {name: "week", tag:"This week"}},
        {title: {name: "month", tag:"This month"}},
    ]

    const mainTitle = DynamicTitles.find(item => item.title.name === query_name)


    const [posts, setPosts] = useState([])
    const [postLoading, setPostLoading] = useState(true)
    
    const [dataFetched, setDataFetched] = useState(false)
    async function handleSortDataByCategory(reqCategory) {
        
        setcategoryName(reqCategory)
        if(dataFetched)return;
        await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_SERVER}/post/viewposts?category=${reqCategory}`,
            withCredentials: true,
        })
        .then(res => {
            setPostLoading(false)
            setPosts(res.data.data.posts)
            setDataFetched(true)
            // window.location.reload()
        })
        .catch(e => {
            setDataFetched(true)
            setPostLoading(false)
            router.refresh()
        })
    }

    useEffect(() => {
        handleSortDataByCategory(categoryName)
    })
    
    
    const handleCategoryRequestData = async (title) => {
        // window.location.reload()
        await handleSortDataByCategory(title)
    }

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
                            <div className={`md:w-[15%] w-full p-1 min-h-[90vh] overflow-hidden md:max-h-[95vh] scroll-pr-14 overflow-y-scroll top-20 duration-200 scrollbar-custom sticky md:ml-0 ${openMenu ? '-ml-0 bg-white ':'-ml-[500px]'}`}>
                                <HomeProfile></HomeProfile>
                            </div>
                            {
                                pathname === '/' ?
                                <div className="border-x-[1px] border-primary md:w-[70%] min-h-screen w-full">
                                {/* search and post section  */}
                                <section className=''>
                                    <div className='p-4 bg-background m-3 rounded-md'>
                                        <h1 className='text-[3em] uppercase'>{mainTitle?.title?.tag}</h1>
                                            <p>Ask a question or share your opinion</p>

                                        <div className='flex justify-end items-center gap-2'>
                                            <Link href={'/post/makepost'} className='bg-primary border-background border-2 ring-[1px] ring-primary hover:bg-primary_hover text-white font-bold px-5 py-2 rounded-md'>Ask Question</Link>
                                        </div>
                                    </div>

                                    <div className='px-4 '>
                                        <div className='flex gap-1 flex-wrap border-[1px] border-[#ddd] p-1 rounded-md'>
                                            <Link href={'/'}>
                                                <button onClick={() => handleCategoryRequestData("")} className={`border-[1px] border-[#ddd] rounded-md py-1 px-3  ${categoryName === "" ? 'bg-black text-white' : 'bg-white text-black'} duration-150`}>Default</button>
                                            </Link>

                                            <Link href={'?category=interesting'}>
                                                <button onClick={() => handleCategoryRequestData('interesting')} className={`border-[1px] border-[#ddd] rounded-md py-1 px-3  ${categoryName === 'interesting' ? 'bg-black text-white' : 'bg-white text-black'} duration-150`}>Interesting</button>
                                            </Link>

                                            <Link href={'?category=todays'}>
                                                <button onClick={() => handleCategoryRequestData('todays')} className={`border-[1px] border-[#ddd] rounded-md py-1 px-3  ${categoryName === 'todays' ? 'bg-black text-white' : 'bg-white text-black'} duration-150`}>Todays</button>
                                            </Link>

                                            <Link href={'?category=week'}>
                                                <button onClick={() => handleCategoryRequestData('week')} className={`border-[1px] border-[#ddd] rounded-md py-1 px-3  ${categoryName === 'week' ? 'bg-black text-white' : 'bg-white text-black'} duration-150`}>Week</button>
                                            </Link>

                                            <Link href={'?category=month'}>
                                                <button onClick={() => handleCategoryRequestData('month')} className={`border-[1px] border-[#ddd] rounded-md py-1 px-3  ${categoryName === 'month' ? 'bg-black text-white' : 'bg-white text-black'} duration-150`}>Month</button>
                                            </Link>
                                            
                                        </div>
                                    </div>
                                </section>

                                {/* {children} */}
                                {
                                    postLoading ?
                                    <LoadingPage></LoadingPage>
                                    :
                                    <>
                                        {
                                            posts?.length > 0 ?
                                            <HomePosts posts={posts}></HomePosts>
                                            :
                                            <p className='text-center mt-5'>No posts founded</p>
                                        }
                                    </>
                                }
                            </div>
                            :
                            <div className='md:w-[70%] w-full min-h-[100vh]'>
                                {children}
                            </div>
                                
                            }
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