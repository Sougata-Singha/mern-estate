import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector(state => state.user )
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className='rounded-full w-24 h-24 object-cover cursor-pointer mt-2 self-center' />
        <input type="text" id='username' placeholder='Username' className='rounded-lg p-3 border '/>
        <input type="email" id='email' placeholder='Email' className='rounded-lg p-3 border '/>
        <input type="password" id='password' placeholder='Password' className='rounded-lg p-3 border '/>
        <button className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-60'>UPDATE</button>
      </form>
      <div className='mt-4 flex justify-between'>
        <span className='text-slate-50 cursor-pointer font-semibold p-2 rounded-lg bg-red-700 hover:bg-red-600 text-sm'>Delete Account</span>
        <span className='text-slate-50 cursor-pointer font-semibold p-2 rounded-lg bg-red-700 hover:bg-red-600 text-sm'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile