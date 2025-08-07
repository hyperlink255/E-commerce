import { createContext, useEffect, useState } from "react";
import { assets, products } from "../assets/forever-assets/assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext(null)

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;




const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search,setSearch] = useState('')
    const [showSearch,setShowSearch] = useState(false)
    const [cartItmes,setCartItems] = useState({})
    const [products,setProducts] = useState([])
    const [token,setToken] = useState("")
    const navigate = useNavigate()

    const addToCart = async (itemId,size) => {
        if(!size){
            toast.error('Select Prodcut Size')
            return
        }
        let cartData = structuredClone(cartItmes)
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)
        if(token){
            try {
                await axios.post('/api/cart/add',{itemId,size}, {headers:{token}})
            }catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }
    }
  
   const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItmes) {
        for(const item in cartItmes[items]){
            try{
                if(cartItmes[items][item] > 0){
                    totalCount += cartItmes[items][item]
                }
            }catch(error){

            }
        }
    }
    return totalCount;
   }

   const updateQuantity = async (itemId,size,quantity) => {
    let cartData = structuredClone(cartItmes)
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if(token) {
        try{
           await axios.post('/api/cart/update',{itemId,size,quantity},{headers:{token}})
        }catch(error){
           console.log(error)
           toast.error(error.message)
        }
    }
   }

   const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItmes){
        let itemInfo = products.find((product) => product._id === items)
        for(const item in cartItmes[items]){
            try{
                if(cartItmes[items][item] > 0){
                    totalAmount += itemInfo.price * cartItmes[items][item]
                }
            }catch(error){

            }
        }
    }
    return totalAmount
   }


   const getProductData = async () => {
    try {
     const res = await axios.get("/api/product/list")
     if(res.data.success){
        setProducts(res.data.products)
     }else{
        toast.error(res.data.message)
     }
    }catch(error){
         console.log(error)
         toast.error(error.message)
    }
   }

    const getUserCart = async (token) => {
     try{
         const res = await axios.post("/api/cart/get",{},{headers:{token}})
         if(res.data.success){
             setCartItems(res.data.cartData || [])
         }
     }catch(error){
         console.log(error)
         toast.error(error.message)
     }
    }

   useEffect(() => {
    getProductData()
   },[])

   useEffect(() => {
    if(!token && localStorage.getItem('token')){
       setToken(localStorage.getItem('token'))
       getUserCart(localStorage.getItem('token'))
    }
   },[token])
   
    const value = {
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItmes,addToCart,setCartItems,
        getCartCount,updateQuantity,
        getCartAmount,navigate,
        setToken,token,axios
        
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider