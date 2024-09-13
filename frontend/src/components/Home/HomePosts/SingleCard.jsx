"use client"
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import { LuExternalLink } from "react-icons/lu";
import { IoIosShareAlt } from "react-icons/io";
import { FaCode } from "react-icons/fa6";
import { useState } from "react";

const SingleCard = ({post}) => {
    const{
        title,
        details,
        code,
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
    } = post

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

    const [viewCode, setViewCode] = useState(false)

    return (
        <div className='w-full  px-3 pt-3 pb-6 border-b-[1px] border-primary'>
            {/* navigate details page  */}
            <div>
                <h3 className='text-lg font-semibold'>{title}</h3>
                <p className="whitespace-pre-wrap text-sm mt-2">{details.length >= 520 ? <>{details.slice(0,550)}... <Link className="underline" href={'/'}>see more</Link></> : details}</p>
                {link && <p className="text-sm underline flex justify-end md:mt-0 mt-2"><Link className="flex items-center gap-2 bg-black text-white rounded-md px-8 py-1" target="blank" href={link}><LuExternalLink />visit</Link></p>}

            </div>
            {
                code && 
                <div className="mt-3">
                    <h5 onClick={() =>setViewCode(!viewCode)} className="whitespace-pre-wrap flex items-center gap-2 underline cursor-pointer select-none"><FaCode />view code</h5>

                    <div className={`bg-[#1d1d1d] text-white p-4 ${viewCode ? "min-h-[200px] max-h-[800px] duration-300 block":"min-h-[0px] hidden max-h-[0px] overflow-hidden duration-300"} `}>
                        <p className="whitespace-pre-wrap">{code}</p>
                    </div>
                </div>
            }
            <div className="flex items-center gap-1 mt-2">
                <span className="text-sm text-primary font-semibold">topics:</span>
                <div className="flex flex-wrap gap-2 ">
                    {
                        tags.map((tag, i) => <button title={`tag: ${tag}`} key={i} className="border-[1px] border-primary text-primary px-2 rounded-md text-xs">{tag}</button>)
                    }
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <button title="likes" className="text-2xl w-[120px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                    <BiLike /> <span className="text-sm">{likeNumberChecker(likes)}</span>
                </button>
                {/* <button title="dislikes" className="text-2xl w-[120px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                    <BiDislike /> <span className="text-sm font-semibold">{likeNumberChecker(dislikes)}</span>
                </button> */}
                <button title="views" className="text-2xl w-[120px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                    <AiOutlineEye /> <span className="text-sm font-semibold">{likeNumberChecker(views)}</span>
                </button>
                <button title="views" className="text-2xl w-[120px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                    <IoIosShareAlt /> <span className="text-sm">{likeNumberChecker(shares)}</span>
                </button>

                <button title="view post" className="text-xl w-[120px] flex justify-center items-center border-[1px] border-black hover:bg-black hover:text-white duration-100 py-1 rounded-md text-black gap-2">
                <LuExternalLink /> <span className="text-sm">view post</span>
                </button>
            </div>

            <div className="mt-5 flex items-center gap-2">
                <Image src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726165245/personal/spsujoy.jpg'} width={35} height={35} className="rounded-full"></Image>
                <div>
                    <h6 className="text-xs font-semibold">{name}</h6>
                    <p className="text-xs">{postTime}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleCard;