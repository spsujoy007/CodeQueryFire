'use client'
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
import { useState } from 'react';

const PostDetails = ({post, searchParams}) => {
    // console.log(searchParams);
    
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
        code,
        code_language,
        image,
        tags,
        name,
        profilePic,
        source,
        createdAt
    } = post;

    const FormatedTime = moment(createdAt).startOf('hour').fromNow();
    const [viewImage, setViewImage] = useState(false)

    return (
        <div className='py-24 mt-8 realative'>
                {
                    !viewImage &&
                    <>
                        <ContainMargin box_width="sm">

                            <h1 className='text-3xl font-bold'>{title}</h1>

                            <div className="mt-2 bg-white border-[1px] border-gray-200 p-2 rounded-lg w-full flex items-center gap-3">
                                <Image priority  alt="avatar" src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726165245/personal/spsujoy.jpg'} width={45} height={45} className="rounded-full"></Image>
                                <div>
                                    <h6 className="text-sm font-semibold">Sujoy</h6>
                                    <p className="text-sm">{FormatedTime}</p>
                                </div>
                            </div>
                            

                            {/* details images and source  */}
                            <div className='bg-white border-[1px] border-gray-200 p-4 rounded-lg mt-2'>
                                <p className='text-lg text-justify'><span className='text-primary font-bold'>Details: </span>{details}</p>

                                {
                                    source && <p className='mt-2'>
                                    <Link href={source} target='blank'>Source: <span className='underline text-orange-700'>{source}</span></Link>
                                </p>
                                }

                                <div className='w-full mt-5 flex md:flex-row flex-col gap-2'>
                                    <div onClick={()=> setViewImage(!viewImage)} className='md:w-[25%] cursor-pointer'>
                                        <Image alt='post_image' className='rounded-lg' src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726417737/personal/codes.png'} height={200} width={500}></Image>
                                    </div>
                                    <div onClick={()=> setViewImage(!viewImage)} className='md:w-[25%] cursor-pointer'>
                                        <Image alt='post_image' className='rounded-lg' src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726417737/personal/codes.png'} height={200} width={500}></Image>
                                    </div>
                                </div>
                            </div>
                            
                            {
                                code && 
                                    <div 
                                    className='rounded-lg overflow-hidden mt-2 border-[1px] border-gray-300 bg-white'>
                                    <div 
                                    className='px-5 py-1 text-primary border-b-[1px] border-primary'>
                                        <p>Code:</p>
                                    </div>
                                    <SyntaxHighlighter wrapLines={true}  showLineNumbers language={code_language} style={docco}>
                                        {code}
                                    </SyntaxHighlighter>
                                    <p 
                                    className='py-2 pl-4 w-full bg-gray-100 font-bold'>language: <span className='text-primary capitalize font-normal'>{code_language}</span> </p>
                                    </div>
                            }

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

                            </ContainMargin>
                    </>
                }
                    {/* // big image preview  */}
                    {
                        viewImage && 
                        <div className={'absolute left-0 w-full h-full top-0 flex justify-center items-center backdrop-blur-xl '}>
                            <div className={`bg-black md:w-[70%] w-[95%] border-2 border-black rounded-2xl`}>
                                <div onClick={()=>setViewImage(!viewImage)} className='flex justify-end cursor-pointer items-center text-white py-1 pr-2 gap-1'>
                                    <IoClose  className=' text-xl bg-primary rounded-tr-xl '/>close
                                </div>

                                <Image alt='post_image' className='rounded-b-xl' src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726417737/personal/codes.png'} height={1000} width={2000} layout='responsive'></Image>
                            </div>
                        </div>
                    }
            </div>
    );
};

export default PostDetails;