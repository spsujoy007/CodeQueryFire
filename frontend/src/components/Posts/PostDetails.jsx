'use client'
import ContainMargin from '@/components/shared/ContainMargin';
import Image from 'next/image';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AiOutlineEye } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import { MdBookmarkBorder } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import moment from 'moment';

const PostDetails = ({post}) => {
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
        postTime,
        link,
        likes,
        dislikes,
        shares,
        views
    } = post;

    const FormatedTime = moment(postTime).startOf('hour').fromNow();

    return (
        <div className='py-20'>
                <ContainMargin>
                    <h1 className='text-3xl font-bold'>{title}</h1>
                    
                    <p className='mt-4 text-lg text-justify'><span className='text-primary font-bold'>Details: </span>{details}</p>

                    {
                        link && <p className='mt-2'>
                        <Link href={link} target='blank'>Source: <span className='underline text-orange-700'>{link}</span></Link>
                    </p>
                    }

                    <div className='w-full mt-5 flex md:flex-row flex-col  gap-2'>
                        <div className='md:w-[50%]'>
                            <Image className='rounded-lg' src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726417737/personal/codes.png'} height={800} width={1200} layout='responsive'></Image>
                        </div>
                        <div className='md:w-[50%]'>
                            <Image className='rounded-lg' src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726417737/personal/codes.png'} height={800} width={1200} ></Image>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 mt-10 ml-4">
                        <span className="text-md text-black font-semibold">topics:</span>
                        <div className="flex flex-wrap gap-2 ">
                            {
                                tags.map((tag, i) => <button title={`tag: ${tag}`} key={i} className="border-[1px] border-primary text-primary px-2 rounded-md text-sm">{tag}</button>)
                            }
                        </div>
                    </div>
                    
                    {
                        code && 
                            <div className='rounded-xl overflow-hidden mt-2 border-[1px] border-gray-300'>
                            <SyntaxHighlighter wrapLines={true}  showLineNumbers  language={"javascript"} style={docco}>
                                {code}
                            </SyntaxHighlighter>
                            </div>
                    }

                    <div className="mt-4 flex items-center gap-2">
                        <button title="likes" className="text-2xl w-[120px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                            <BiLike /> <span className="text-sm">{likeNumberChecker(likes)}</span>
                        </button>
                        
                        <button title="dislikes" className="text-2xl w-[120px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                            <BiDislike /> <span className="text-sm font-semibold">{likeNumberChecker(dislikes)}</span>
                        </button>

                        <button title="views" className="text-2xl w-[120px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                            <AiOutlineEye /> <span className="text-sm font-semibold">{likeNumberChecker(views)}</span>
                        </button>
                        <button title="bookmark" className="text-2xl w-[80px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                            <MdBookmarkBorder />
                        </button>
                    </div>

                    <div className="mt-10 flex items-center gap-3">
                        <Image alt="avatar" src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726165245/personal/spsujoy.jpg'} width={45} height={45} className="rounded-full"></Image>
                        <div>
                            <h6 className="text-sm font-semibold">{name}</h6>
                            <p className="text-sm">{FormatedTime}</p>
                        </div>
                    </div>

                </ContainMargin>
            </div>
    );
};

export default PostDetails;