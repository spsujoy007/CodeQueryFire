import useAuthenticated from '@/Hooks/useAuthenticated'
import ServerUrl from '@/Hooks/useServerUrl';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function EditProfile({modal}) {
  const router = useRouter()
  const {user, loading} = useAuthenticated()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: ""
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
  

  const [saveLoading, setSaveLoading] = useState(false)
  const handleSaveProfile = async (e) => {
    e.preventDefault()
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
      modal(false)
      setErrorMsg(false)
      setSaveLoading(false)
      // router.refresh()
      location.reload()
    })
    .catch(e => {
      setSaveLoading(false)
      location.reload()
    })
  }

  return (
    <div>
      {
        !loading &&
        <form id='editprofileform'>
          {/* user name inputs  */}
          <div className='flex gap-2'>
              <div>
                  <label htmlFor="first_name" className='text-sm ml-2 text-primary'>First name</label>
                  <input 
                    onChange={handleOnChange}
                    id='first_name' 
                    name='first_name'
                    defaultValue={user?.first_name}
                    className='border-[1px] border-gray-200 rounded-md w-full py-2 px-3 outline-none placeholder:text-sm' placeholder='type your first name...' 
                    type="text" />
              </div>
              <div>
                  <label htmlFor="last_name" className='text-sm ml-2 text-primary'>Last name</label>
                  <input 
                    onChange={handleOnChange}
                    id='last_name' 
                    name='last_name' 
                    defaultValue={user?.last_name} 
                    className='border-[1px] border-gray-200 rounded-md w-full py-2 px-3 outline-none placeholder:text-sm' placeholder='type your last name...' 
                    type="text" />
              </div>
          </div>

          <label htmlFor="bio" className='text-sm ml-2 mt-4 text-primary'>Bio</label>
          <textarea 
            onChange={handleOnChange}
            id="bio"
            name="bio" 
            defaultValue={user?.bio && user.bio} 
            className=' border-[1px] border-gray-200 rounded-md w-full max-h-[100px] min-h-[100px] p-2 outline-none placeholder:text-sm' 
            placeholder='something about your self...' 
          ></textarea>

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
