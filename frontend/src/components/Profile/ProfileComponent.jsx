'use client'

import useAuthenticated from "@/Hooks/useAuthenticated";
import Image from "next/image";
import ContainMargin from "../shared/ContainMargin";
import LoadingPage from "@/app/loading";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";

const ProfileComponent = () => {

    const { user, loading, isLoggedIn } = useAuthenticated()
    const {
        first_name,
        last_name,
        email
    } = user

    
    return (
        <div className="">
            {
                loading ?
                <section className="h-[80vh] m-auto">
                    <LoadingPage></LoadingPage>
                </section>
                :
                <>
                <section className="pt-5 min-h-screen">
                    <ContainMargin>
                        <div className="flex gap-10 items-center">
                            <Image className="rounded-full ring-2 ring-primary border-4 border-white" width={250} height={250} src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726165245/personal/spsujoy.jpg'} alt={first_name+last_name || 'user'} layout="fit"></Image>
                            <div>
                                <h1 className="text-2xl font-bold text-primary">{first_name + ' ' + last_name}</h1>
                                <p className="text-sm mt-1 w-[70%]">Some ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, ullam!</p>

                                {/* some followers pic  */}
                                <div className="mt-2 flex -space-x-3">
                                    <Image className="rounded-full border-2 border-white" width={35} height={35} src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726165245/personal/spsujoy.jpg'} alt=""></Image>
                                    <Image className="rounded-full border-2 border-white" width={35} height={35} src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726165245/personal/spsujoy.jpg'} alt=""></Image>
                                    <Image className="rounded-full border-2 border-white" width={35} height={35} src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726165245/personal/spsujoy.jpg'} alt=""></Image>
                                    <div className="bg-gray-200 w-[35px] h-[35px] border-2 border-gray-400 rounded-full flex justify-center items-center text-gray-400">
                                        <HiOutlineDotsHorizontal />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <p className="font-semibold text-sm"> <Link className="hover:underline" href={''}>Followers: <span className="text-primary">10</span></Link>   |  <Link className="hover:underline" href={''}>Following: <span className="text-primary">14</span></Link> </p>
                                </div>

                                <div className="mt-4 space-x-2">
                                    {/* <button className="border-[1px] border-black w-[150px] rounded-md py-[3px]">Follow</button> */}
                                    <button className="border-[1px] border-primary bg-primary text-white w-[155px] rounded-md py-[3px]">Following</button>
                                </div>

                            </div>
                        </div>
                    </ContainMargin>
                </section>
                </>
            }
        </div>
    );
};

export default ProfileComponent;