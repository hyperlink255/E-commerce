import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { currency } from '../App'

const List = ({token}) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
       const res = await axios.get('http://localhost:5000/api/product/list')
       if(res.data.success){
         setList(res.data.products)
         
       }else{
        toast.error(res.data.message)
       }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  const removeProduct = async (id) => {
     try{
       const res = await axios.post('http://localhost:5000/api/product/remove',{id},{headers:{token}})
       if(res.data.success){
        toast.success(res.data.message)
        await fetchList()
       }else{
        toast.error(res.data.message)
       }
     }catch(error){
      console.log(error)
      toast.error(error.message)      
     }
  }

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
    <p className='mb-2'>All Product List</p>
    <div className='flex flex-col gap-2'>
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-sm'>
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className='text-center'>Action</p>
      </div>
      {
        list.map((item,i) => {
           return (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm' key={i}>
              <img className='w-12' src={item.image[0]} alt=''/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
           )
        })
      }
    </div>
    </>
  )
}

export default List