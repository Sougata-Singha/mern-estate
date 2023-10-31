import React ,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

const SignIn = () => {
  const [formdata, setFormdata] = useState({})
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChangeHandler = (e) => {
    setFormdata({...formdata,[e.target.id] : e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const response = await fetch('/api/auth/signin',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formdata)
      })
      const data = await response.json()
      if(data.success === false){
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
      
    } catch (error) {
      dispatch(signInFailure(error.message))
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-7 text-slate-600'>SIGN IN</h1>
      <form className='flex flex-col gap-4'>
        <input type="email" className='border rounded-lg p-3 outline-none' placeholder='Email' id='email' required onChange={onChangeHandler}/>
        <input type="password" className='border rounded-lg p-3 outline-none' placeholder='Password' id='password' required onChange={onChangeHandler}/>
        <button disabled={loading} className='transition delay-100 bg-slate-700 outline-none text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-70' onClick={handleSubmit}>
          {loading ? 'Loading...' : 'SIGN IN'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-1 text-center justify-center items-center my-1'>
        <p className='text-slate-700'>Don't have an account? </p>
        <Link to='/sign-up' className='text-blue-700'>Register</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn