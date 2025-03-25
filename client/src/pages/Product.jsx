import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/forever-assets/assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const {products,currency,cartItmes,addToCart} = useContext(ShopContext)
  const [productData,setProductData] = useState(false)
  const [image,setImage] = useState('')
  const [size,setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
   fetchProductData()
  },[productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,i) => {
               return <img src={item} onClick={() => setImage(item)} key={i} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
              })
            }
          </div>
          <div className='w-full sm:w-[80%]'>
           <img src={image} alt='' className='w-full h-auto'/>
          </div>
         </div>
         <div className='flex-1'>
           <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
           <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-20'>(122)</p>
           </div>
           <p className='mt-3 text-3xl font-medium'>{currency}{productData.price}</p>
           <p className='mt-3 text-gray-500 md:w-4/5'>{productData.description}</p>
           <div className='flex flex-col gap-4 my-5'>
            <p>Select Size</p>
            <div className='flex gap-2'>
               {
                productData.sizes.map((item,index) => {
                  return <button onClick={() => setSize(item)} className={`border border-gray-200 py-2 cursor-pointer px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""}`} key={index}>{item}</button>
                })
               }
            </div>
           </div>
           <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm cursor-pointer active:bg-gray-700'>ADD TO CART</button>
           <hr className='mt-6 border border-gray-200 sm:w-4/5'/>
           <div className='text-sm tex-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchage policy within 7 days.</p>
           </div>
         </div>
      </div>
      <div className='mt-20'>
        <div className='flex'>
          <p className='border border-gray-200 px-5 py-3 text-sm'>Description</p>
          <p className='border border-gray-200 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-gray-200 text-gray-500 px-6 py-6 text-sm'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ):<div className='opacity-0'></div>
}

export default Product