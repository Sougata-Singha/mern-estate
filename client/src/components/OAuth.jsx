import React from 'react'
import { app } from '../firebase'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)
            console.log(result)
            const res = await fetch('/api/auth/google',{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({name : result.user.displayName, email : result.user.email, photo : result.user.photoURL})
            })

            const data = await res.json()
            dispatch(signInSuccess(data))
            navigate('/')

        } catch (error) {
            console.log('Could not sign in with google ',error)
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='transition delay-100 bg-red-600 p-3 text-slate-50 rounded-lg hover:bg-red-500'>CONTINUE WITH GOOGLE</button>
  )
}

export default OAuth