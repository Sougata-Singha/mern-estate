import React,{useRef, useState, useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateUserStart,upadateUserSuccess, upadateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'

const Profile = () => {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector(state => state.user )
  const dispatch = useDispatch()
  const [file, setFile] = useState(undefined)
  const [imagePerc, setImagePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})

  console.log(formData)

  const handleUploadFile = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,file)

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setImagePerc(Math.round(progress))
    },(error) => {
      setFileUploadError(true)
    },() => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        setFormData({...formData,avatar : downloadUrl})
      })
    })
    
  }

  useEffect(() => {
    if(file){
      handleUploadFile(file)
    }
    return () => {
      setFile(undefined)
      setImagePerc(0)
    }
    
  },[file])

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id] : e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method : 'POST',
        headers : {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.message === false){
        dispatch(upadateUserFailure(data.message))
        return
      }
      dispatch(upadateUserSuccess(data))
    } catch (error) {
      dispatch(upadateUserFailure(error.message))
    }
  }

  const handlDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method : 'DELETE',
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess())
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*'/>
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full w-24 h-24 object-cover cursor-pointer mt-2 self-center'/>
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : imagePerc > 0 && imagePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${imagePerc}%`}</span>
          ) : imagePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input onChange={handleChange} type="text" defaultValue={currentUser.username} id='username' placeholder='Username' className='rounded-lg p-3 border '/>
        <input onChange={handleChange} type="email" defaultValue={currentUser.email} id='email' placeholder='Email' className='rounded-lg p-3 border '/>
        <input onChange={handleChange}  type="password" id='password' placeholder='Password' className='rounded-lg p-3 border '/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-60'>{loading ? 'LOADING...' : 'UPDATE'}</button>
      </form>
      <div className='mt-4 flex justify-between'>
        <span onClick={handlDeleteUser} className='text-slate-50 cursor-pointer font-semibold p-2 rounded-lg bg-red-700 hover:bg-red-600 text-sm'>Delete Account</span>
        <span className='text-slate-50 cursor-pointer font-semibold p-2 rounded-lg bg-red-700 hover:bg-red-600 text-sm'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ""}</p>
    </div>
  )
}

export default Profile