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
const null_avatar = '/images/null_avatar.jpeg'

const SingleCard = ({post}) => {
    const{
        _id,
        title,
        topics,
        updatedAt,
        author
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
        <div className='w-full  px-3 pt-3 pb-3 border-t-[1px] border-primary'>
            {/* navigate details page  */}
            <div>
                <Link href={`post/${title.split(/[\\/]+/).join(' ')}?id=${_id}`}>
                    <h3 className='text-md text-black hover:text-primary duration-100 hover:underline'>{title}</h3>
                </Link>
                
                <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm text-primary font-semibold">topics:</span>
                    <div className="flex flex-wrap gap-2 ">
                        {
                            topics.map(topic => <button title={`topic: ${topic.name}`} key={topic.name} className="border-[1px] border-primary text-primary font-semibold px-2 rounded-md text-xs">{topic.name}</button>)
                        }
                    </div>
                </div>
            </div>


            {/* <div className="mt-4 flex items-center gap-2">
                <button title="likes" className="text-2xl w-[120px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 duration-100 py-1 rounded-md text-gray-500 gap-2">
                    <BiLike /> <span className="text-sm">0</span>
                </button>

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
            </div> */}

            <div className="pt-2 mt-3 inline-flex items-center gap-2 relative group">
                {/* <div className="w-[35px] h-[35px] rounded-full">
                    <Image alt="avatar" src={author?.avatar ?  author?.avatar?.url : null_avatar} width={35} height={35} className="rounded-full bg-gray-200 w-full h-full object-cover"></Image>
                </div> */}
                <div>
                    <h6 className="text-xs font-semibold">{author?.full_name}</h6>
                    <p className="text-xs">{FormatedTime}</p>
                </div>

                {/* // hovered profile info */}
                <div className="w-[400px] absolute -top-[125px] drop-shadow-lg shadow-gray-400 hidden group-hover:block  bg-gray-100 border-[1px] border-gray-300 p-2 rounded-md">
                    <section className="flex items-start gap-2">
                        <div className="w-[35px] h-[35px] rounded-full">
                            <Image alt="avatar" src={author?.avatar ?  author?.avatar?.url : null_avatar} width={35} height={35} className="rounded-full bg-gray-200 w-full h-full object-cover"></Image>
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
                    <button className="w-full mt-2 bg-gray-300 text-black border-[1px] border-white rounded-md py-1">View Profile</button>
                </div>
            </div>
        </div>
    );
};

export default SingleCard;