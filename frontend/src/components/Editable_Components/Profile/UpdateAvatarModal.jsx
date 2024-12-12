import useAuthenticated from '@/Hooks/useAuthenticated';
import ServerUrl from '@/Hooks/useServerUrl';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
const null_avatar = '/images/null_avatar.jpeg'

const UpdateAvatarModal = () => {
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
            method: 'patch',
            url: `${ServerUrl()}/users/update_avatar`,
            data: formData,
            withCredentials: true
        })
        .then(data => {
            console.log(data)
            setUploadLoading(false)
            location.reload()
        })
        .catch(e => {
            console.error(e)
            setUploadLoading(false)
            location.reload()
        })
    } 


    return (
        <div className='w-full'>
            {
                !loading &&
                <div className='w-full'>
                    <div className='w-[300px] h-[300px] rounded-full overflow-hidden mx-auto border-2 border-black'>
                        <Image
                            className='bg-white w-full h-full'
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