import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import {useSelector} from 'react-redux'

const Header = () => {
    const {currentUser} = useSelector((state) => state.user)
  return (
    <header className='bg-slate-200 shadow-md py-3 px-5'>
        <div className='flex justify-between items-center max-w-6xl m-auto'>
            <Link to='/'>
                <h1 className='font-bold text-lg sm:text-2xl flex flex-wrap'>
                    <span className='text-slate-500'>Free</span>
                    <span className='text-red-500'>Estate</span>
                </h1>
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex justify-between items-center'>
                <input type="text" className='bg-transparent outline-none w-24 md:w-48 lg:w-64' placeholder='Search...'/>
                <FaSearch className='text-slate-500 cursor-pointer'/>
            </form>
            <ul className='flex gap-3 text-slate-600 font-semibold'>
                <Link to='/'><li className='hidden md:inline hover:underline'>Home</li></Link>
                <Link to='/about'><li className='hidden md:inline hover:underline'>About</li></Link>
                {currentUser ?
                    <Link to='/profile'><img src={currentUser.avatar} className='rounded-full w-7 h-7 object-cover' alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" /></Link> : 
                    <Link to='sign-in'><li className='hover:underline'>Sign In</li></Link>
                }
            </ul>
        </div>
    </header>
  )
}

export default Header