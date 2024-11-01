"use client"
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import { LuExternalLink } from "react-icons/lu";
import { MdBookmarkBorder } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { useState } from "react";
import moment from "moment";

const SingleCard = ({post}) => {
    const{
        _id,
        title,
        details,
        code,
        image,
        topics,
        createdAt,
        updatedAt,
        source,
    } = post

    const FormatedTime = moment(updatedAt).startOf('hour').fromNow(); // format the time for UX

    // const likeNumberChecker = (num)=>{
    //     if (num >= 1000000) {
    //         return (num / 1000000).toFixed(1) + 'M';
    //       }
    //       else if (num >= 1000) {
    //         return (num / 1000).toFixed(1) + 'k';
    //       }
    //       else {
    //         return num.toString();
    //       }
    // }

    const [viewCode, setViewCode] = useState(false)
    const [seeMore, setSeeMore] = useState(false)

    return (
        <div className='w-full  px-3 pt-3 pb-6 border-b-[1px] border-primary'>
            {/* navigate details page  */}
            <div>
                <h3 className='text-lg font-semibold'>{title}</h3>
                
                <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm text-primary font-semibold">topics:</span>
                    <div className="flex flex-wrap gap-2 ">
                        {
                            topics.map(topic => <button title={`topic: ${topic.name}`} key={topic.name} className="border-[1px] border-primary text-primary px-2 rounded-md text-xs">{topic.name}</button>)
                        }
                    </div>
                </div>
                <div className="mt-5">
                    <div dangerouslySetInnerHTML={{__html: details.slice(0, 450)}} className="whitespace-pre-wrap text-sm mt-2 tiptap-style">
                        {/* {
                            !seeMore ? 
                            <>
                                {details.length >= 520 ? <>{details.slice(0,550)}... <button className="underline" onClick={() => setSeeMore(!seeMore)}>see more</button></> : details}
                            </>
                            :
                            <span onClick={()=>setSeeMore(!seeMore)}>{details}</span>
                        } */}
                    </div>
                </div>

                {/* {source !== null && <p className="text-sm flex justify-end md:mt-5"><Link className="flex items-center gap-2  text-black underline font-semibold rounded-md px-8 py-1" target="blank" href={source}><LuExternalLink />source</Link></p>} */}

            </div>

            {/* {
                code && 
                <div className="mt-3">
                    <h5 onClick={() =>setViewCode(!viewCode)} className="whitespace-pre-wrap flex items-center gap-2 underline cursor-pointer select-none"><FaCode />view code</h5>

                    <div className={`bg-[#1d1d1d] text-white p-4 ${viewCode ? "min-h-[200px] max-h-[800px] duration-300 block":"min-h-[0px] hidden max-h-[0px] overflow-hidden duration-300"} `}>
                        <p className="whitespace-pre-wrap">{code}</p>
                    </div>
                </div>
            } */}


            <div className="mt-4 flex items-center gap-2">
                <button title="likes" className="text-2xl w-[120px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                    <BiLike /> <span className="text-sm">0</span>
                </button>

                {/* <button title="dislikes" className="text-2xl w-[120px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                    <BiDislike /> <span className="text-sm font-semibold">{likeNumberChecker(dislikes)}</span>
                </button> */}

                <button title="views" className="text-2xl w-[120px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                    <AiOutlineEye /> <span className="text-sm font-semibold">0</span>
                </button>

                <button title="bookmark" className="text-2xl w-[80px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                    <MdBookmarkBorder />
                </button>

                <Link className="" href={`post/${title.split(/[\\/]+/).join(' ')}?id=${_id}`}>
                    <button title="view post" className="text-xl w-[120px] flex justify-center items-center border-[1px] border-black bg-black hover:bg-background text-white duration-200 py-1 rounded-md hover:text-black gap-2">
                        <LuExternalLink /> <span className="text-sm">view post</span>
                    </button>
                </Link>
            </div>

            <div className="mt-5 flex items-center gap-2">
                <Image alt="avatar" src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726165245/personal/spsujoy.jpg'} width={35} height={35} className="rounded-full"></Image>
                <div>
                    <h6 className="text-xs font-semibold">Sujoy</h6>
                    <p className="text-xs">{FormatedTime}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleCard;