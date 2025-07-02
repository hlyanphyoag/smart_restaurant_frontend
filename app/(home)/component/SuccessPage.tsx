'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetOneOrderQuery } from '@/services/OrderServices/order.query'
import { useCartStore } from '@/store/CartStore'
import Lottie from 'lottie-react'
import { IndentIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const SuccessPage = () => {
    const router = useRouter()
    const {id: orderId } : {id: string} = useParams()
    const { data: OrderData, isPending, isError } = useGetOneOrderQuery(orderId)
    const { cart, removeAllCart, GrandTotalPrice} = useCartStore()
    console.log('OrderData:', OrderData)


    const handleGoBack = () => {
        removeAllCart()
        router.push('/');
    }
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div className='w-40 h-40'>
        <Lottie 
            animationData={require('@/public/success_mark.json')}
            loop={false}
            autoPlay={true}
            size={100}
        />
      </div>
       
      <div className='flex flex-col items-center justify-center gap-y-1'>
        <h2 className="text-3xl font-bold text-green-400">Order Success!</h2>
        <p className="text-md font-semibold text-gray-600">Thank you for your order.</p>
        <small className='text-sm font-semibold text-gray-500'>Your delicious meal is being prepared!</small>
      </div>

      <Card className='w-full mt-6'>
        <CardHeader className='flex items-center justify-between'>
            <CardTitle>Order Details</CardTitle>
            <div className='border border-green-400 px-2 py-1 rounded-full text-sm font-semibold text-green-400'>Confirm</div>
        </CardHeader>
        <CardContent className='flex flex-col md:flex-row items-start justify-center gap-x-6 gap-y-6'>
            <div className='grid grid-cols-1 gap-y-4'>
                <div className='flex items-center  gap-x-4'>
                  <h2 className='text-sm font-semibold text-gray-600'>Order ID: </h2>
                  <small className='text-sm font-semibold text-blue-500'>#{OrderData?.id}</small>
                </div>
                <div className='flex items-center  gap-x-4'>
                  <h2 className='text-sm font-semibold text-gray-600'>Order Type: </h2>
                  <small className='text-sm font-semibold text-gray-600'>{OrderData?.tableId ?  `( Dine in ) - Table No. ${OrderData?.table?.number}` : 'Take Away'}</small>
                </div>
                <div className='flex items-center gap-x-4'>
                  <h2 className='text-sm font-semibold text-gray-600'>Estimated Time: </h2>
                  <small className='text-sm font-semibold text-green-400'>15mins - 20mins</small>
                </div>
                <div className='flex items-center gap-x-4'>
                  <h2 className='text-sm font-semibold text-gray-600'>Total: </h2>
                  <small className='text-xl font-semibold text-green-400'>${GrandTotalPrice(cart)}</small>
                </div>
            </div>
            <div className='flex flex-col gap-y-2'>
              {/* <h2 className='text-lg mb-2 font-semibold text-gray-600'>Your Items</h2> */}
              {cart?.map((item: any, index: number) => (
                <div className='flex flex-col bg-neutral-100 p-4 rounded-2xl' key={index}>
                  <div className='flex flex-row items-center justify-between gap-x-4'>
                    <div className='flex items-center gap-x-2'>
                      <div className='h-10 w-10 rounded-2xl bg-green-400'></div>
                      <div>
                        <h2 className='text-sm font-semibold text-gray-600'>{item.name}</h2>
                        <small className='text-sm text-gray-500'>Qty - {item.quantity}</small>
                      </div>
                    </div>
                     <small className='text-sm font-semibold text-green-400'>${item.totalPrice ? item.totalPrice : item.price}</small>
                  </div>
                </div>
              ))}
            </div>
        </CardContent>
      </Card>
      
      <Button
        variant="customize"
        onClick={handleGoBack}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg mt-4"
      >
        Go Home
      </Button>
    </div>
  )
}

export default SuccessPage