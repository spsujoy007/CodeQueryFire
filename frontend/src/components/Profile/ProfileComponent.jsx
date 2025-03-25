'use client'

// import useAuthenticated from "@/Hooks/useAuthenticated";
import Image from "next/image";
import ContainMargin from "../shared/ContainMargin";
import LoadingPage from "@/app/loading";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import SingleCard from "../Home/HomePosts/SingleCard";
import { FaCode, FaFacebook, FaGithub, FaHackerrank, FaInstagram, FaLinkedinIn, FaReddit, FaSnapchat, FaTelegram, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import ServerUrl from "@/Hooks/useServerUrl";
import ModalBody from "../shared/Modal/ModalBody";
import Modal from "../shared/Modal/Modal";
import useModal from "../shared/Modal/useModal";
import EditProfile from "../Editable_Components/Profile/EditProfile";
import useAuthenticated from "@/Hooks/useAuthenticated";
import UpdateAvatarModal from "../Editable_Components/Profile/UpdateAvatarModal";
import { TiHome } from "react-icons/ti";
import { usePathname } from "next/navigation";
import useGlobalFetch from "@/Hooks/useGlobalPostFetch";
const null_avatar = '/images/null_avatar.jpeg'

const ProfileComponent = () => {
    const path = usePathname()
    const {user, loading, refetch} = useAuthenticated()

    useEffect(() => window.scrollTo(0, 0),[])
    
    const api = process.env.NEXT_PUBLIC_SERVER
    // const [posts, setPosts] = useState([])

    // useEffect(() => {
    //     axios({
    //         method: 'GET',
    //         url: `${api}/post/myposts`,
    //         withCredentials: true,
    //     })
    //     .then(res => {
    //         setPosts(res?.data?.data?.posts)
    //     })
    // }, [api])

    // const {modal, showModal, closeModal} = useModal()
    const [editProfileModal, setEditProfile] = useState(false)
    const [avatarModal, setAvatarModel] = useState(false)


    const handleAvatarModal = () => {
        if( editProfileModal ) setAvatarModel(false);
        setAvatarModel(true)
    }


    const [profile, setProfile] = useState([])
    const [pageLoading, setPageLoading] = useState(true)
    const pathname = path.split("profile/")[1]

    
    const fetchUserProfile = async () => {
        // setPageLoading(true)
        axios({
            method: "GET",
            url: `${api}/users/user_profile?username=${pathname}`
        })
        .then(res => {
            if(res.data.data) {
                setProfile(res.data.data)
                setPageLoading(false)
            }
        })
    }
    useEffect(() => {
        fetchUserProfile()
        useGlobalFetch.getState().setRefetchDatas?.(fetchUserProfile)
    }, [pathname])

    const handleEditProfileModal = () => {
        if(user?.username !== profile?.username){
            location.reload()
        }
        if( avatarModal ) setAvatarModel(false);
        setEditProfile(true)
    }
    
    // linked social media formula ***************
    const styleForIcon = "text-lg"
    const platform_lists = [
        { platform: "facebook", label: "Facebook", icon: <FaFacebook className={styleForIcon}/>, url: "https://www.facebook.com/" },
        { platform: "whatsapp", label: "WhatsApp", icon: <FaWhatsapp className={styleForIcon}/>, url: "https://wa.me/" },
        { platform: "twitter", label: "Twitter (X)", icon: <FaXTwitter className={styleForIcon}/>, url: "https://twitter.com/" },
        { platform: "instagram", label: "Instagram", icon: <FaInstagram className={styleForIcon}/>, url: "https://www.instagram.com/" },
        { platform: "linkedin", label: "LinkedIn", icon: <FaLinkedinIn className={styleForIcon}/>, url: "https://www.linkedin.com/in/" },
        { platform: "snapchat", label: "Snapchat", icon: <FaSnapchat className={styleForIcon}/>, url: "https://www.snapchat.com/add/" },
        { platform: "youtube", label: "YouTube", icon: <FaYoutube className={styleForIcon}/>, url: "https://www.youtube.com/" },
        { platform: "telegram", label: "Telegram", icon: <FaTelegram className={styleForIcon}/>, url: "https://t.me/" },
        { platform: "reddit", label: "Reddit", icon: <FaReddit className={styleForIcon}/>, url: "https://www.reddit.com/user/" },
        { platform: "hackerrank", label: "HackerRank", icon: <FaHackerrank className={styleForIcon}/>, url: "https://www.hackerrank.com/" },
        { platform: "leetcode", label: "LeetCode", icon: <FaCode className={styleForIcon}/>, url: "https://leetcode.com/" },
        { platform: "codeforces", label: "Codeforces", icon: <FaCode className={styleForIcon}/>, url: "https://codeforces.com/profile/" },
        { platform: "codechef", label: "CodeChef", icon: <FaCode className={styleForIcon}/>, url: "https://www.codechef.com/users/" },
        { platform: "github", label: "GitHub", icon: <FaGithub className={styleForIcon}/>, url: "https://github.com/" }
    ];
    
    let filteredPlatformListAlreadyUsed = []
    if(!loading){
        filteredPlatformListAlreadyUsed = profile?.social_links?.filter((item) => platform_lists.some((p) => p.platform === item.platform))
    }

    const match_link_by_platform = (platform_name) =>{
        return platform_lists.find((p) => p.platform === platform_name)
    }
    // linked social media formula ***************

    return (
        <div className={`${editProfileModal || avatarModal && "h-[80vh] overflow-hidden"}`}>
            {
                pageLoading && loading ?
                <section className="h-[80vh] m-auto">
                    <LoadingPage></LoadingPage>
                </section>
                :
                <>
                <main className="py-10 min-h-screen bg-background">
                    <section>
                    <ContainMargin box_width={'md'}>
                        <section className="flex gap-10 items-center">
                            <section>
                            <div className="h-[250px] w-[250px] rounded-full bg-gray-300">
                                {
                                    profile?.username === user?.username ?
                                    <Image priority onClick={handleAvatarModal} className="  rounded-full object-cover h-full w-full cursor-pointer hover:brightness-90 duration-150 ring-2 ring-primary border-4 border-white" width={250} height={250}  src={profile?.avatar ? profile.avatar?.url : null_avatar} alt={profile?.full_name}></Image>
                                    :
                                    <Image priority className="rounded-full object-cover h-full w-full ring-2 ring-primary border-4 border-white" width={250} height={250}  src={profile?.avatar ? profile.avatar?.url : null_avatar} alt={profile?.full_name}></Image>
                                }
                            </div>
                            </section>
                            <div className="w-full">
                                <h1 className="text-2xl font-bold text-primary">{profile.full_name}</h1>
                                <p className="text-sm mt-1 w-[600px]  whitespace-pre-wrap">{profile?.bio && profile.bio}</p>


                                {/* some followers pic  */}
                                {
                                    profile.followers &&
                                    <div className="mt-2 flex -space-x-3">
                                        <Image className="rounded-full border-2 border-white" width={35} height={35} src={null_avatar} alt=""></Image>
                                        <Image className="rounded-full border-2 border-white" width={35} height={35} src={null_avatar} alt=""></Image>
                                        <Image className="rounded-full border-2 border-white" width={35} height={35} src={null_avatar} alt=""></Image>
                                        <div className="bg-gray-200 w-[35px] h-[35px] border-2 border-gray-400 rounded-full flex justify-center items-center text-gray-400">
                                            <HiOutlineDotsHorizontal />
                                        </div>
                                    </div>
                                }

                                <div className="mt-2">
                                    <p className="font-semibold text-sm"> <Link className="hover:underline" href={''}>Followers: <span className="text-primary">{profile?.followers ? profile?.followers : 0}</span></Link>   |  <Link className="hover:underline" href={''}>Following: <span className="text-primary">{profile?.following ? profile?.following : 0}</span></Link> </p>
                                </div>

                                {
                                    profile?.username === user?.username &&
                                    <div className="mt-4 space-x-2">
                                        {/* <button className="border-[1px] border-black w-[150px] rounded-md py-[3px]">Follow</button> */}
                                        <button onClick={handleEditProfileModal} className="border-[1px] border-primary bg-primary text-white w-[155px] rounded-md py-[3px]">Edit Profile</button>
                                    </div>
                                }

                            </div>
                        </section>

                        {/*
                            ╔══════════════════════════════════════════════════════════════════════════╗
                            ║ 🌐 SOCIAL LINKS SECTION - CONNECT WITH THE WORLD 🚀                     ║
                            ╠══════════════════════════════════════════════════════════════════════════╣
                        */}
                        {
                            profile?.social_links?.length > 0 && 
                            <section className="mt-10 bg-white rounded-xl p-3 space-y-2 ">
                                <p className="text-primary text-sm ml-2 rounded-full border-[1px] border-primary inline-block px-2">Social links</p>
                                {/* <div className="w-full flex gap-2">
                                    <span className="flex items-center gap-2"> <TiHome className="text-xl text-gray-800" /> Lives in:</span><button className="hover:underline text-black font-bold">Dhaka city</button>
                                </div> */}
                                <div> {/* for separate the div */}
                                    <div className="mt-1 gap-1 space-y-2 ml-2 flex-col inline-flex">
                                        {/* maping social links ================ */}
                                        {
                                            profile?.social_links?.map(({platform, username}, i) => 
                                                <Link href={`${match_link_by_platform(platform).url}${username}`} target="_blank" key={i} className="flex items-center gap-2 hover:underline cursor-pointer hover:text-primary">
                                                    {match_link_by_platform(platform).icon} <span className=" "> {username} </span>
                                                </Link>
                                            )
                                        }
                                    </div>
                                </div>
                            </section>
                        }
                        {/* 
                            ╔══════════════════════════════════════════════════════════════════════════╗
                            ║ 🎯 CODE END                                                              ║
                            ╠══════════════════════════════════════════════════════════════════════════╣
                        */}

                        {/* post and blogs section  */}
                        <section className="mt-10 flex gap-1">
                            <div className="w-[70%] bg-white min-h-[40%] rounded-b-xl ">
                            <div className="w-full bg-black text-white font-bold py-1 pl-5 rounded-t-xl" ><p>Posts: </p></div>
                               {
                                profile?.posts?.length > 0 ?
                                <>
                                    {
                                        profile.posts?.map((post, idx) => 
                                        <SingleCard 
                                            key={post._id} 
                                            post={post} 
                                            profile={profile} 
                                            index={idx}
                                            refetch={fetchUserProfile}>
                                        </SingleCard>)
                                    }
                                </>
                                :
                                <div>
                                    <p className="text-center py-5">No posts yet...</p>
                                </div>
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



            {/* Editable modals //////////////////////////////////////////////// */}

            {/* edit profile details  */}
            <section>
                {
                    editProfileModal &&
                    <Modal handleCloseModal={setEditProfile}>
                        <EditProfile modal={setEditProfile} refetch={fetchUserProfile}></EditProfile>
                    </Modal>
                }

                {/* update avatar  */}
                {
                    avatarModal &&
                    <Modal size="25" handleCloseModal={setAvatarModel}>
                        <UpdateAvatarModal refetch={fetchUserProfile} setAvatarModel={setAvatarModel}></UpdateAvatarModal>
                    </Modal> 
                }
            </section>
        </div>
    );
};

export default ProfileComponent;