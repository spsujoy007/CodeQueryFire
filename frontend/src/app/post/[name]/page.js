import ContainMargin from '@/components/shared/ContainMargin';
import Navbar from '@/components/shared/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { dark, docco, nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { AiOutlineEye } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import { LuExternalLink } from "react-icons/lu";
import { MdBookmarkBorder } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import moment from 'moment';

const page = ({params}) => {
    const gettitle = params.name

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

    let decodedString = decodeURIComponent(gettitle);
    const post = {
        _id: "67",
        title: "Introduction to React Hooks",
        details: "Explore the basics of React Hooks and how they can simplify state management in functional components.",
        code: "import React, { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n};\n\nexport default Counter;",
        image: "https://via.placeholder.com/150",
        code_language: 'javascript',
        tags: ["React", "Hooks"],
        name: "Emma Brown",
        profilePic: "https://via.placeholder.com/50",
        postTime: "2024-09-11T11:10:05Z",
        link: "https://example.com/react-hooks",
        likes: 150,
        dislikes: 1,
        shares: 20,
        views: 400,
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

    // if(_id !== '67'){
    //     return router.push('/login')
    // }
    return (
        <div className='w-full h-full '>
            <Navbar></Navbar>
            <div className='pt-20'>
                <ContainMargin>
                    <h1 className='text-3xl'>{title}</h1>
                    
                    <p className='mt-4 text-lg text-justify'><span className='text-primary font-bold'>Details: </span>{details}</p>
                    
                    {
                        link && <p className='mt-2'>
                        <Link href={link} target='blank'>Source: <span className='underline text-orange-700'>{link}</span></Link>
                    </p>
                    }

                    <div className="flex items-center gap-1 mt-10 ml-4">
                        <span className="text-md text-black font-semibold">topics:</span>
                        <div className="flex flex-wrap gap-2 ">
                            {
                                tags.map((tag, i) => <button title={`tag: ${tag}`} key={i} className="border-[1px] border-primary text-primary px-2 rounded-md text-sm">{tag}</button>)
                            }
                        </div>
                    </div>

                    <div className='rounded-xl overflow-hidden mt-2 border-[1px] border-gray-300'>
                    <SyntaxHighlighter language={code_language} style={docco}>
                        {code}
                    </SyntaxHighlighter>
                    </div>

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
        </div>
    );
};

export default page;