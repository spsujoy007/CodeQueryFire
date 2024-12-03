'use client'

// import useAuthenticated from "@/Hooks/useAuthenticated";
import Image from "next/image";
import ContainMargin from "../shared/ContainMargin";
import LoadingPage from "@/app/loading";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import SingleCard from "../Home/HomePosts/SingleCard";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import ServerUrl from "@/Hooks/useServerUrl";
import ModalBody from "../shared/Modal/ModalBody";
import Modal from "../shared/Modal/Modal";
import useModal from "../shared/Modal/useModal";

const ProfileComponent = () => {
    useEffect(() => window.scrollTo(0, 0),[])
    
    const [posts, setPosts] = useState([])


    // modal functionalities 
    const {modal, showModal, closeModal} = useModal()
    
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${ServerUrl()}/post/viewposts`,
            withCredentials: true,
        })
        .then(res => {
            setPosts(res.data.data.posts)
        })
    }, [])
    const loading = false
    return (
        <div className="">
            {
                loading ?
                <section className="h-[80vh] m-auto">
                    <LoadingPage></LoadingPage>
                </section>
                :
                <>
                <main className="py-10 min-h-screen bg-background">
                    <section>
                    <ContainMargin box_width={'md'}>
                        <section className="flex gap-10 items-center">
                            <Image className="rounded-full ring-2 ring-primary border-4 border-white" width={250} height={250} src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726165245/personal/spsujoy.jpg'} alt={'user'} layout="fit"></Image>
                            <div>
                                <h1 className="text-2xl font-bold text-primary">Alan Walker</h1>
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
                                    <button onClick={() => showModal()} className="border-[1px] border-primary bg-primary text-white w-[155px] rounded-md py-[3px]">Edit Profile</button>
                                    <button onClick={() => closeModal()} className="border-[1px] border-primary bg-primary text-white w-[155px] rounded-md py-[3px]">close</button>
                                </div>

                            </div>
                        </section>

                        <section className="mt-10 bg-white rounded-xl p-3">
                            <div className="w-full bg-white text-black font-bold  rounded-t-xl" ><p>Social links: </p></div>
                            <div className="mt-2 flex items-center flex-wrap gap-1">
                                {/* maping social links ================ */}
                                <div className="flex items-center gap-2 text-[#1877F2] hover:bg-[#1877F2] hover:text-white max-w-[140px] rounded-full px-2 py-1 cursor-pointer duration-100">
                                    <FaFacebook className="text-xl" /> <span>Facebook</span>
                                </div>
                                    |
                                <div className="flex items-center gap-2 text-black max-w-[140px] rounded-full px-2 py-1 hover:bg-black hover:text-white cursor-pointer duration-100">
                                    <FaGithub className="text-xl" /> <span>Github</span>
                                </div>
                                    |
                                <div className="flex items-center gap-2 text-[#0077B5] max-w-[140px] rounded-full px-2 py-1 hover:bg-[#0077B5] hover:text-white cursor-pointer duration-100">
                                    <FaLinkedinIn className="text-xl" /> <span>LinkedIn</span>
                                </div>
                            </div>
                        </section>

                        {/* post and blogs section  */}
                        <section className="mt-10 flex gap-1">
                            <div className="w-[70%] bg-white min-h-[40%] rounded-b-xl overflow-hidden">
                                <div className="w-full bg-black text-white font-bold py-1 pl-5 rounded-t-xl" ><p>Posts: </p></div>
                                {
                                    posts.map((post) => <SingleCard key={post._id} post={post}></SingleCard>)
                                }
                            </div>
                            <div className="w-[30%] bg-white min-h-[40%] rounded-b-xl overflow-hidden">
                                <div className="w-full bg-black text-white font-bold py-1 pl-5 rounded-t-xl "><p>Blogs: </p></div>
                                    <p className="p-2 mt-5 text-sm text-center">No blogs yet....</p>
                            </div>
                        </section>
                    </ContainMargin>
                    </section>
                </main>
                </>
            }

            {/* <Modal>S</Modal> */}
            <Modal>Hello world</Modal>
        </div>
    );
};

export default ProfileComponent;