import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState,setCurrentState] = useState('Login')
  const {setToken,token,axios,navigate} = useContext(ShopContext)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

 console.log(axios)
  const onSubmitHandler =  async (e) => {
   e.preventDefault()
   try{
     if(currentState === "Sign Up"){
      const res = await axios.post("/api/user/register",{name,email,password})
      if(res.data.success){
        setToken(res.data.token)
        localStorage.setItem('token',res.data.token)
      }else{
        toast.error(res.data.message)
      }
     }else{
      const res = await axios.post("/api/user/login",{email,password})
      if(res.data.success){
        setToken(res.data.token)
        localStorage.setItem('token',res.data.token)
      }else{
        toast.error(res.data.message)
      }
     }
   }catch(error){
      console.log(error)
      toast.error(error.message)
   }

  }
  useEffect(() => {
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-5 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] bg-gray-800'/>
      </div>
      {currentState === "Login" ? "" : <input type="text" value={name} onChange={(e) => setName(e.target.value)}  placeholder='Name' required  className='w-full px-3 py-2 border border-gray-800'/>}
      <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}  className='w-full px-3 py-2 border border-gray-800'/>
      <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800'/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === "Login"
          ? <p onClick={() => setCurrentState("Sign Up")}className='cursor-pointer'>Create account</p>
          : <p onClick={() => setCurrentState("Login")}className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>{currentState === "Login" ? "Sign In" : "Sign Up"}</button>
    </form>
  )
}

export default Login