import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try{
      e.preventDefault()
      const response = await axios.post("http://localhost:5000/api/user/admin",{email,password})
      if(response.data.success){
        setToken(response.data.token)
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
    }catch(error){
        console.log(error)
        toast.error(error.message)
    }
  }
  return (
    <div className=' min-h-screen flex items-center  justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-extrabold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)}  className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Enter Email' required/>
          </div>
          <div className='mb min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter Password' required/>
          </div>
         <button type='submit' className='mt-2 w-full cursor-pointer py-2 px-4 rounded-md text-white bg-black'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login