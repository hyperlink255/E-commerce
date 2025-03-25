import React from 'react'
import { assets } from '../assets/forever-assets/assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base-700'>
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt='' />
            <p className='font-semibold'> Easy Exchage Policy</p>
            <p className='text-gray-400'>We offer hassle free exchage policy</p>
        </div>
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt='' />
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt='' />
            <p className='font-semibold'>Best customar support</p>
            <p className='text-gray-400'>We provide 24/7 customar support</p>
        </div>
   
    </div>
  )
}

export default OurPolicy