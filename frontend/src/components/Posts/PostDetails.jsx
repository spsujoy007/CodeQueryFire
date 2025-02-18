"use client"
import ContainMargin from '@/components/shared/ContainMargin';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineEye } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import { MdBookmarkBorder } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import moment from 'moment';
import { BiShare } from "react-icons/bi";
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { IoClose } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ServerUrl from '@/Hooks/useServerUrl';
const imgPlaceholderView = "/images/placeholdeImageView.jpg"
import './postdesign.css'
import LoadingPage from '@/app/loading';
const null_avatar = "/images/null_avatar.jpeg"

const PostDetails = ({searchParams}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { id } = searchParams
    const [post, setPost] = useState({});
    
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`${ServerUrl()}/post/post_details?id=${id}`)
            .then(res => {
                setPost(res?.data?.data?.post);
                setLoading(false)
            })
            .catch(error => {
                console.error("Error fetching post details:", error)
                setLoading(false)
            });
    }, [id]);
    
    const likeNumberChecker = (num)=>{
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
          }
          else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
          }
          else {
            return num.toString();
          }
    }

      const {
        _id,
        title,
        details,
        author,
        code,
        programming_language,
        image,
        tags,
        name,
        images,
        profilePic,
        source,
        createdAt
    } = post;

    const FormatedTime = moment(createdAt).startOf('hour').fromNow();
    const [viewImage, setViewImage] = useState(false)
    const [viewImageUrl, setViewImageUrl] = useState("")

    return (
        <>
            {
                loading ?
                <div className='min-h-screen flex justify-center items-center'>
                    <LoadingPage></LoadingPage>
                </div>
                :
                <div className='py-8 realative'>
                    {
                        !viewImage &&
                        <>
                            <ContainMargin box_width="sm">
                                <div>
                                

                                {/* details images and source  */}
                                <div className='bg-white border-[1px] border-gray-200 p-4 rounded-lg mt-2'>
                                <h1 className='text-3xl font-bold border-b-[1px] border-black pb-2'>{title}</h1>
                                    <div className='tiptap-style-home mt-2' dangerouslySetInnerHTML={{__html: details}}></div>
                                    {/* <p className='text-lg text-justify'><span className='text-primary font-bold'></span>{details}</p> */}

                                    {
                                        source && <p className='mt-2'>
                                        <Link href={source} target='blank'>Source: <span className='underline text-orange-700'>{source}</span></Link>
                                    </p>
                                    }

                                    
                                    {
                                        images?.length > 0 &&
                                        <div className='w-full mt-5 flex md:flex-row flex-col gap-2'>
                                            {
                                                images?.map(img => 
                                                <div key={img?.public_id} 
                                                    onClick={()=> {
                                                        setViewImageUrl(img?.url)
                                                        setViewImage(!viewImage)
                                                    }} className='md:w-[25%] cursor-pointer'>
                                                    <Image 
                                                        alt='post_image' 
                                                        quality={50}
                                                        // loader={imgPlaceholder}
                                                        // placeholder='blur'
                                                        priority={true}
                                                        className='rounded-lg' 
                                                        src={img?.url} 
                                                        height={200} 
                                                        width={500}
                                                    ></Image>
                                                </div>)
                                            }
                                        </div>
                                    }
                                </div>


                                {/* shared code start ========================================== */}
                                {
                                    code && 
                                    <div 
                                    className='rounded-lg overflow-hidden mt-2 border-[1px] border-gray-300 bg-white'>
                                        <div 
                                        className='px-5 py-1 text-primary border-b-[1px] border-primary'>
                                            <p>Code:</p>
                                        </div>
                                        <SyntaxHighlighter wrapLines={true}  showLineNumbers language={programming_language} style={docco}>
                                            {code}
                                        </SyntaxHighlighter>
                                        <p 
                                        className='py-2 pl-4 w-full bg-gray-100 font-bold'>language: <span className='text-primary capitalize font-normal'>{programming_language}</span> </p>
                                        </div>
                                }
                                {/* shared code end ========================================== */}

                                <div className="mt-4 grid md:grid-cols-5 border-[1px] border-gray-200 lg:grid-cols-6 grid-cols-3 gap-2 bg-white p-2 rounded-md">
                                    <button 
                                    title="likes" 
                                    className="text-2xl flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                                        <BiLike /> <span className="text-sm font-semibold">0</span>
                                    </button>
                                    
                                    <button 
                                    title="dislikes" 
                                    className="text-2xl flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                                        <BiDislike /> <span className="text-sm">0</span>
                                    </button>

                                    <button 
                                    title="views" 
                                    className="text-2xl flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                                        <BiCommentDetail 
                                        className='' /><span className="text-sm font-bold">0</span> <span className="text-sm">Comments</span>
                                    </button>

                                    <button 
                                    title="views" 
                                    className="text-2xl flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                                        <AiOutlineEye /> <span className="text-sm font-semibold">0</span>
                                    </button>

                                    <button 
                                    title="views" 
                                    className="text-2xl flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                                        <BiShare /> <span className="text-sm font-semibold">0</span>
                                    </button>

                                    <button 
                                    title="bookmark" 
                                    className="text-2xl flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 rounded-md py-1 text-gray-500 gap-2">
                                        <MdBookmarkBorder /> 
                                        <span className="text-sm">Bookmark</span>
                                    </button>
                                </div>
                                </div>

                                <div className="mt-2 relative group bg-white border-[1px] border-gray-200 p-2 rounded-lg w-full flex items-center gap-3 ">
                                    <div className='w-[45px] h-[45px]'>
                                        <Image priority  alt="avatar" src={author?.avatar ? author.avatar?.url : null_avatar} width={45} height={45} className="rounded-full w-full h-full object-cover"></Image>
                                    </div>
                                    <div>
                                        <h6 className="text-sm font-semibold">Sujoy</h6>
                                        <p className="text-sm">{FormatedTime}</p>
                                    </div>

                                    {/* // hovered profile info */}
                                    <div className="w-[400px] absolute -top-[210%] drop-shadow-lg shadow-gray-400 hidden group-hover:block  bg-gray-100 border-[1px] border-gray-300 p-2 rounded-md">
                                        <section className="flex items-start gap-2">
                                            <div>
                                                <div className="w-[35px] h-[35px] rounded-full">
                                                    <Image alt="avatar" src={author?.avatar ?  author?.avatar?.url : null_avatar} width={35} height={35} className="rounded-full bg-gray-200 w-full h-full object-cover"></Image>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-bold"> {author?.full_name}</h5>
                                                <p className="text-sm">{author?.bio}</p>
                                                <div className="text-sm mt-2 flex gap-2">
                                                    <p>Followers: <span className="font-bold text-primary">0</span></p>
                                                    |
                                                    <p>Following: <span className="font-bold text-primary">0</span></p>
                                                </div>
                                            </div>
                                        </section>
                                        <Link href="/" className="w-full mt-2 block text-center bg-gray-300 text-black border-[1px] border-white rounded-md py-1">View Profile</Link>
                                    </div>
                                </div>
                            </ContainMargin>
                        </>
                    }
                        {/* // big image preview  */}
                        {
                            viewImage && 
                            <div className={'absolute z-[100] left-0 w-[100%] lg:h-[100vh] top-0 flex justify-center items-center backdrop-blur-xl '}>
                                <div className={`bg-black md:w-[80%] lg:h-[90%] aspect-square w-[95%] border-2 border-black rounded-2xl`}>
                                    <div className='flex justify-end  text-white border-b-[1px] border-primary shadow-2xl shadow-primary'>
                                        <div onClick={()=>setViewImage(!viewImage)} className='flex items-center cursor-pointer py-1 pr-2 gap-1'>
                                            <IoClose   className=' text-xl bg-primary rounded-tr-xl '/>close
                                        </div>
                                    </div>

                                    <div className='w-full h-full'>
                                        <Image  alt='post_image' quality={100} className='rounded-b-xl w-full h-full object-cover' src={viewImageUrl ? viewImageUrl : imgPlaceholderView} height={1000} width={1000} ></Image>
                                    </div>
                                </div>
                            </div>
                        }
                </div>
            }
        </>
    );
};

export default PostDetails;