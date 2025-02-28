import useAuthenticated from '@/Hooks/useAuthenticated'
import ServerUrl from '@/Hooks/useServerUrl';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaCheck, FaCode, FaCross, FaFacebook, FaHackerrank, FaInstagram, FaLinkedinIn, FaPlus, FaReddit, FaSnapchat, FaTelegram, FaTwitter, FaWhatsapp, FaX, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaGithub, FaInstagramSquare } from 'react-icons/fa';

export default function EditProfile({modal, refetch: FetchProfileData}) {
  const router = useRouter()
  const {user, loading, refetch} = useAuthenticated()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
  })

  const [dataBeforeSaved, setDataBeforeSaved] = useState(null);
  const [errorMsg, setErrorMsg] = useState()

  // set by default profile infos
  useEffect(() => {
    if (!loading && user) {
      const initialData = {
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        bio: user.bio || "",
      }

      setFormData(initialData)
      setDataBeforeSaved(initialData)
    }
  }, [loading, user]); 



  // push datas in formData when change
  const handleOnChange = (e) => {
    e.preventDefault()

    const {name, value} = e.target;
    e.target.setCustomValidity("First name can only contain letters and spaces");
    setFormData((data) => ({
      ...data,
      [name]: value
    }))
  }


  const [isActiveSocial, setIsActiveSocial] = useState(false)
  const [selectLink, setSelectLink] = useState(false)
  const [tempUsername, setTempUsername] = useState("")
  const [storedSocialLinks, setStoredSocialLinks] = useState([]);

  const handleTryToaddSocialLink = () => {
    setIsActiveSocial(true)
  }

  const handleAddSocialLink = async() => {
    try{
      const getSocialPlatform = document.getElementById("social_links").value;
      const link_object = {platform: getSocialPlatform, username: tempUsername}
      setStoredSocialLinks([...storedSocialLinks, link_object ])

      if(!link_object){
        return null
      }
      else{
        await axios({
          method: "POST",
          url: `${ServerUrl()}/users/add_social_link`,
          data: link_object,
          withCredentials: true
        })
        .then(result => {
          console.log(result)
          setErrorMsg("")
          FetchProfileData()
          refetch()
        })
        .catch(e => {
          console.error("Something went wrong: ", e?.response?.data?.message)
          setErrorMsg(e?.response?.data?.message)
          refetch()
        })
      }
    }
    finally {
        setIsActiveSocial(false)
        setSelectLink(false)
    }
  }

  const handleRemoveSocialLink = async (platform) => {
    console.log("Platform: ", platform)
    if(platform){
      await axios({
        method: "DELETE",
        url: `${ServerUrl()}/users/remove_social_link`,
        data: {platform: platform},
        withCredentials: true
      })
      .then(result => {
        console.log(result)
        setErrorMsg("")
        refetch()
      })
      .catch(e => {
        console.error("Error when removing", e)
        refetch()
      })
    }
  }
  

  const [saveLoading, setSaveLoading] = useState(false)
  const handleSaveProfile = async (e) => {
    e.preventDefault()
    // setFormData( (data) => ({...data, social_accounts: storedSocialLinks}))
    setSaveLoading(true)

    // validation for no change data 
    if( JSON.stringify(formData) === JSON.stringify(dataBeforeSaved) ){
      setErrorMsg("No changes made to the form")
      setSaveLoading(false)
      return
    }
    
    await axios({
      method: "POST",
      url: `${ServerUrl()}/users/edit_profile`,
      data: formData,
      withCredentials: true
    })
    .then(data => {
      setErrorMsg(false)
      setSaveLoading(false)
      // router.refresh()
      location.reload()
      modal(false)
    })
    .catch(e => {
      setSaveLoading(false)
      location.reload()
    })
  }

  const platform_lists = [
    { platform: "facebook", label: "Facebook", icon: <FaFacebook/> },
    { platform: "whatsapp", label: "WhatsApp", icon: <FaWhatsapp/> },
    { platform: "twitter", label: "Twitter (X)", icon: <FaXTwitter/> },
    { platform: "instagram", label: "Instagram", icon: <FaInstagram/> },
    { platform: "linkedin", label: "LinkedIn", icon: <FaLinkedinIn/> },
    { platform: "snapchat", label: "Snapchat", icon: <FaSnapchat/> },
    { platform: "youtube", label: "YouTube", icon: <FaYoutube/> },
    { platform: "telegram", label: "Telegram", icon: <FaTelegram/> },
    { platform: "reddit", label: "Reddit", icon: <FaReddit/> },
    { platform: "hackerrank", label: "HackerRank", icon: <FaHackerrank/> },
    { platform: "leetcode", label: "LeetCode", icon: <FaCode/> },
    { platform: "codeforces", label: "Codeforces", icon: <FaCode/> },
    { platform: "codechef", label: "CodeChef", icon: <FaCode/> },
    { platform: "github", label: "GitHub", icon: <FaGithub/> }
  ];

  // TODO: working in this line
  let filteredPlatformListOptions = []
  if(!loading){
    filteredPlatformListOptions = platform_lists.filter((item) => !user?.social_links.some((p) => p.platform === item.platform))
  }
  
  let filteredPlatformListAlreadyUsed = []
  if(!loading){
    filteredPlatformListAlreadyUsed = platform_lists.filter((item) => user?.social_links.some((p) => p.platform === item.platform))
  }
  

  // designs 
  const label_design = `text-sm ml-2 mt-4 text-primary`
  return (
    <div className='max-h-[60vh] pr-2 overflow-y-auto
  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
      {
        loading ?
        <div className="pt-5 rounded-xl w-full space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2 h-10 bg-gray-300 rounded animate-pulse duration-[100ms]"></div>
            <div className="w-1/2 h-10 bg-gray-300 rounded animate-pulse duration-[120ms]"></div>
          </div>
          <div className="h-24 bg-gray-300 rounded animate-pulse duration-[140ms]"></div>
          <div className="text-right">
            <div className="inline-block w-16 h-6 bg-gray-400 rounded animate-pulse duration-[150ms]"></div>
          </div>
        </div>
        :
        <form id='editprofileform' className='w-full'>
          {/* user name inputs  */}
          <div className='flex gap-2 w-full'>
              <div className='md:w-[50%]'>
                  <label htmlFor="first_name" className={label_design}>First name</label>
                  <input 
                    onChange={handleOnChange}
                    id='first_name' 
                    name='first_name'
                    defaultValue={user?.first_name}
                    className='border-[1px] border-gray-200 focus:border-primary rounded-md w-full py-2 px-3 outline-none placeholder:text-sm' placeholder='type your first name...' 
                    type="text" />
              </div>
              <div className='md:w-[50%]'>
                  <label htmlFor="last_name" className={label_design}>Last name</label>
                  <input 
                    onChange={handleOnChange}
                    id='last_name' 
                    name='last_name' 
                    defaultValue={user?.last_name} 
                    className='border-[1px] border-gray-200 rounded-md w-full py-2 px-3 outline-none placeholder:text-sm focus:border-primary' placeholder='type your last name...' 
                    type="text" />
              </div>
          </div>

          <div className='mt-2'>
            <label htmlFor="bio" className={label_design}>Bio</label>
            <textarea 
              onChange={handleOnChange}
              id="bio"
              name="bio" 
              defaultValue={user?.bio && user.bio} 
              className=' border-[1px] border-gray-200 rounded-md w-full max-h-[100px] min-h-[100px] p-2 outline-none placeholder:text-sm focus:border-primary' 
              placeholder='something about your self...' 
            ></textarea>
          </div>

          <div className='my-1'>
            <p htmlFor="social" className={label_design}>Social accounts</p>
            {
              !isActiveSocial ?
              <button onClick={handleTryToaddSocialLink} type='button' className='px-5 py-2 border-[1px]  border-gray-200 hover:border-primary rounded-lg capitalize flex items-center gap-2'><FaPlus className='text-primary' /> add social links</button>
              :
              <div className='flex items-center gap-1 mx-0'>
                  <select name="social_links" id="social_links" className='border-none outline-none bg-gray-200 px-5 py-[10px] rounded-md'>
                    <option value="" selected disabled>Select Platform</option>
                    {
                      filteredPlatformListOptions.map(({platform, label}, i) => <option key={i} value={platform}>{label}</option>)
                    }
                    {/* <option value="facebook">Facebook</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="twitter">Twitter (X)</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="snapchat">Snapchat</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="telegram">Telegram</option>
                    <option value="reddit">Reddit</option>
                    <option value="hackerrank">HackerRank</option>
                    <option value="leetcode">LeetCode</option>
                    <option value="codeforces">Codeforces</option>
                    <option value="codechef">CodeChef</option>
                    <option value="github">GitHub</option> */}
                  </select>

                  <input 
                    id='social_username'
                    name='social_username'
                    onKeyDown={(e) => {
                      setErrorMsg("")
                      if(e.key === "Enter" && e.target.value.length > 0) handleAddSocialLink()
                    }}
                    onChange={(e) => {
                      e.target.value.length > 0 ? setSelectLink(true) : setSelectLink(false)
                      setTempUsername(e.target.value)
                    }}
                    className='border-[1px] border-gray-200 rounded-md w-full py-2 px-3 outline-none placeholder:text-sm focus:border-primary' placeholder='username' 
                    type="text" />

                  {
                    selectLink && <button onClick={handleAddSocialLink} type='button' className={`px-4 text-white bg-primary py-[13px] rounded-md`}><FaCheck /></button>
                  }
              </div>
            }

            {/* exist social medias  */}
            <div className='grid grid-cols-4 gap-1 mt-1 '>
              {
                filteredPlatformListAlreadyUsed?.map(({platform, username, icon}, i) => 
                  <div key={i} className='bg-gray-100 px-2 py-2 rounded-lg border-[1px] border-gray-300 overflow-hidden group flex justify-center items-center duration-300'>
                    <button onClick={()=> handleRemoveSocialLink(platform)} className='group-hover:block hidden group-hover:duration-300 text-black text-xl' type='button'> <AiOutlineCloseCircle /> </button>
                    <p className='group-hover:hidden group-hover:duration-300 text-sm capitalize flex gap-2 items-center' title={username}>{icon} {platform}</p>
                  </div>
                )
              }
            </div>
          </div>

          {
            errorMsg && <p className='text-sm text-red-500 ml-2'>{errorMsg}</p>
          }
          <div className='flex justify-end mt-2'>
            {
              saveLoading ?
              <button className='w-[150px] py-2 rounded-md bg-black hover:bg-gray-800 text-white animate-pulse duration-200'>saving...</button>
              :
              <button onClick={handleSaveProfile} className='w-[150px] py-2 rounded-md bg-primary hover:bg-gray-800 text-white'>Save</button>
            }
          </div>
        </form> 
      }
    </div>
  )
}
