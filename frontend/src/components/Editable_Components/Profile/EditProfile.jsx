import React from 'react'

export default function EditProfile() {
  return (
    <div>

        {/* user name inputs  */}
        <div className='flex gap-2'>
            <div>
                <label htmlFor="first_name" className='text-sm ml-2'>First name</label>
                <input id='first_name' first_name='name' defaultValue={`Admin`} className='border-[1px] border-gray-200 rounded-md w-full py-2 px-3 outline-none placeholder:text-sm' placeholder='type your first name...' type="text" />
            </div>
            <div>
                <label htmlFor="last_name" className='text-sm ml-2'>Last name</label>
                <input id='last_name' last_name='name' defaultValue={`bro`} className='border-[1px] border-gray-200 rounded-md w-full py-2 px-3 outline-none placeholder:text-sm' placeholder='type your last name...' type="text" />
            </div>
        </div>

        <textarea defaultValue={`Let's make a good habit.`} className='mt-2 border-[1px] border-gray-200 rounded-md w-full max-h-[100px] min-h-[100px] p-2 outline-none placeholder:text-sm' placeholder='something about your self...' name="bio" id="bio"></textarea>
    </div>
  )
}
