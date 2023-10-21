import React from 'react'
import {Link} from 'react-router-dom'

const SingUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-7 text-slate-600'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" className='border rounded-lg p-3 outline-none' placeholder='Username' id='username' required/>
        <input type="email" className='border rounded-lg p-3 outline-none' placeholder='Email' id='email' required/>
        <input type="password" className='border rounded-lg p-3 outline-none' placeholder='Password' id='password' required/>
        <button className='bg-slate-700 outline-none text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-70'>SIGN UP</button>
      </form>
      <div className='flex gap-1 text-center justify-center items-center my-1'>
        <p className='text-slate-700'>Have an account?</p>
        <Link to='sign-in' className='text-blue-700'>Sign in</Link>
      </div>
    </div>
  )
}

export default SingUp