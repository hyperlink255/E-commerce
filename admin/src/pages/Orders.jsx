import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { assets } from '../assets/admin_assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const res = await axios.post('http://localhost:5000/api/order/list', {}, { headers: { token } })
      if (res.data.success) {
        setOrders(res.data.orders.reverse())
      } else {
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error.message)
      alert(error.message)
    }

  }
   const statusHandler = async (event,orderId) => {
    try{
        const res = await axios.post('http://localhost:5000/api/order/status',{orderId,status:event.target.value},{headers:{token}})
        if(res.data.success){
          await fetchAllOrders()
        }
    }catch(error){
      console.log(error)
      alert(error.message)

    }

   }
  useEffect(() => {
    fetchAllOrders()
  }, [token])
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, i) => {
            return (
              <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gra-700' key={i}>
                <img className='w-12' src={assets.parcel_icon} alt='' />
                <div>
                  <div>
                    {
                      order.items.map((item, i) => {
                        if (i === order.items.length - 1) {
                          return <p className='py-0.5' key={i}>{item.name} X {item.quantity}<span>{item.size}</span></p>
                        } else {
                          return <p className='py-0.5' key={i}>{item.name} X {item.quantity}<span>{item.size}</span>,</p>
                        }
                      })
                    }
                  </div>
                  <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ", "}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                  </div>
                  <p className=''>{order.address.phone}</p>
                </div>
                <div>
                   <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                   <p className='mt-3'>Method : {order.paymentMethod}</p>
                   <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                   <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className='text-sm sm:text-[15px]'>${order.amount}</p>
                <select value={order.status} onChange={(event) => statusHandler(event,order._id)} className='p-2 font-semibold'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders