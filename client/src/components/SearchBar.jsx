import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/forever-assets/assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch} = useContext(ShopContext)
    const [visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(() => {
     if(location.pathname.includes('collection')){
          setVisible(true)
     }else{
          setVisible(false)
     }
    },[location])

  return showSearch  && visible ? (
    <div className='border-t  bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 my-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} type='text' className='flex-1 outline-none text-sm bg-inherit' placeholder='Search'/>
        <img src={assets.search_icon} alt='' className='w-4'/>
        </div>
        <img src={assets.cross_icon} alt='' onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer'/>
    </div>
  ) : null
}

export default SearchBar