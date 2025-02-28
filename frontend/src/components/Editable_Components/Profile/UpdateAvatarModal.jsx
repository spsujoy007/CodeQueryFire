import useAuthenticated from '@/Hooks/useAuthenticated';
import ServerUrl from '@/Hooks/useServerUrl';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
const null_avatar = '/images/null_avatar.jpeg'

const UpdateAvatarModal = ({refetch, setAvatarModel}) => {
    const {user, loading} = useAuthenticated()

    const [avatarBlob, setAvatarBlob] = useState(undefined);
    const [imageFile, setImageFile] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()

        const file = e.target.files[0];
        if(file){
            const blobUrl = URL.createObjectURL(file)
            setImageFile(file)
            setAvatarBlob(blobUrl)
        }
    }

    const handleSaveAvatar = async () => {
        const formData = new FormData();
        formData.append("avatar", imageFile)
        
        setUploadLoading(true)
        await axios({
            method: 'PATCH',
            url: `${ServerUrl()}/users/update_avatar`,
            data: formData,
            withCredentials: true,
        })
        .then(data => {
            console.log(data.status)
            if(data.status === 200){
                refetch()
                setAvatarModel(false)
            }
        })
        .catch(e => {
            console.error(e)
            setUploadLoading(false)
            // location.reload()
        })
    } 


    return (
        <div className='w-full'>
            {
                loading ?
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-[300px] h-[300px] bg-gray-300 rounded-full animate-pulse duration-75"></div>
                  <div className="w-full h-[40px] bg-gray-500 text-white text-center rounded-lg flex items-center justify-center animate-pulse duration-100">
                  </div>
                </div>
                :
                <div className='w-full'>
                    <div className='w-[300px] h-[300px] rounded-full overflow-hidden mx-auto border-2 border-black flex justify-center items-center'>
                        <Image
                            className='bg-white w-full h-full object-cover'
                            src={avatarBlob ? avatarBlob : `${user?.avatar?.url ? user?.avatar?.url : null_avatar}`}
                            width={300}
                            height={300}
                            priority={true}
                            alt='avatar'
                        ></Image>
                    </div>

                    <div className='mt-6 '>
                        <label 
                            className='bg-black text-white w-full py-2 rounded-md block text-center hover:bg-gray-800' 
                            htmlFor="avatar">
                            Select avatar
                        </label>
                        <input 
                            onChange={handleChange}
                            id='avatar' 
                            name='avatar' 
                            className='hidden' 
                            type="file" 
                            accept='.jpg, .jpeg' 
                        />

                        {
                            imageFile &&
                            <>
                                {
                                    uploadLoading ?
                                    <button className='bg-primary text-white w-full py-2 rounded-md block text-center hover:opacity-90 mt-2 animate-pulse duration-200'>
                                        saving...
                                    </button>
                                    :
                                    <button onClick={handleSaveAvatar} className='bg-primary text-white w-full py-2 rounded-md block text-center hover:opacity-90 mt-2'>
                                        Save
                                    </button>
                                }
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default UpdateAvatarModal;