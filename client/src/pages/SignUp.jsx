import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const SingUp = () => {
  const [formdata, setFormdata] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    setFormdata({...formdata,[e.target.id] : e.target.value})
  }
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/signup',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formdata)
      })
      const data = await response.json()
      if(data.success === false){
        setError(data.message)
        setLoading(false)
        return
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
      
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-7 text-slate-600'>SIGN UP</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" className='border rounded-lg p-3 outline-none' placeholder='Username' id='username' required onChange={onChangeHandler}/>
        <input type="email" className='border rounded-lg p-3 outline-none' placeholder='Email' id='email' required onChange={onChangeHandler}/>
        <input type="password" className='border rounded-lg p-3 outline-none' placeholder='Password' id='password' required onChange={onChangeHandler}/>
        <button disabled={loading} className='bg-slate-700 outline-none text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-70' onClick={handleSubmit}>
          {loading ? 'Loading...' : 'SIGN UP'}
        </button>
      </form>
      <div className='flex gap-1 text-center justify-center items-center my-1'>
        <p className='text-slate-700'>Have an account?</p>
        <Link to='/sign-in' className='text-blue-700'>Sign in</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SingUp