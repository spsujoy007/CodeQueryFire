import useAuthenticated from '@/Hooks/useAuthenticated';
import ServerUrl from '@/Hooks/useServerUrl';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
const null_avatar = '/images/null_avatar.jpg'
const UpdateAvatarModal = () => {
    const {user, loading} = useAuthenticated()

    const [avatarBlob, setAvatarBlob] = useState(undefined);
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        e.preventDefault()

        const file = e.target.files[0];
        const blobUrl = URL.createObjectURL(file)
        setImageFile(file)
        setAvatarBlob(blobUrl)
    }

    const handleSaveAvatar = async () => {
        await axios({
            method: 'patch',
            url: `${ServerUrl()}/users/update_avatar`,
            data: {
                avatar: imageFile
            },
            withCredentials: true
        })
        .then(data => {
            console.log(data)
            // location.reload()
        })
        .catch(e => {
            console.error(e)
        })
    } 


    return (
        <div className='w-full'>
            {
                !loading &&
                <div className='w-full'>
                    <div className='w-[200px] h-[200px] rounded-full overflow-hidden mx-auto border-2 border-primary'>
                        <Image
                            className=''
                            src={avatarBlob ? avatarBlob : `${user?.avatar?.url ? user?.avatar?.url : null_avatar}`}
                            width={200}
                            height={200}
                            priority
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
                            <button onClick={handleSaveAvatar} className='bg-primary text-white w-full py-2 rounded-md block text-center hover:opacity-90 mt-2'>
                                Save
                            </button>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default UpdateAvatarModal;