'use client'
import { useCartStore } from '@/store/CartStore'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useOrderMutation } from '@/services/OrderServices/order.queryMutation'
import { useTableMutation } from '@/services/TableServices/table.mutation'

const CheckOutCard = () => {
    const router = useRouter()
    const  { id : tableId }  = useParams()
    const {data: session} = useSession();

    const {cart, decreaseQuantity, increaseQuantity, removeAllCart, GrandTotalPrice} = useCartStore();

    const orderItem = cart?.map((item: any) => {
      return {
        foodItemId: item.id,
        quantity: item.quantity,
        note: item.note
      }
    })
    
    const {mutate : postOrder } = useOrderMutation();
    const {mutate: tableMutation } = useTableMutation()

    const handleSubmit = () => {
      postOrder({
        tableId: tableId,
        customerId: session?.user?.id,
        orderItems: orderItem
      },
    {
      onSuccess: (data) => {
        tableMutation({
          tableId: data.tableId,
          occupied: !data.table.occupied
        },
        {
          onSuccess: (data) => {
            console.log('TableSuccess:', data)
          },
          onError: (error) => {
            console.log('TableError:', error)
          }
        }
      )
        console.log('OrderSuccess:', data)
        router.push(`/success/${data.id}`)
      },
      onError: (error) => {
        console.log('OrderError:', error)
      }
    })
    }

  console.log('Cart:', cart)

  return (
    <Card className='w-full col-span-2'>
      <CardHeader>
        <CardTitle>Order Confirm</CardTitle>
      </CardHeader>
      <CardContent>
        {cart ? (
          <div className='flex flex-col gap-6'>
          {cart.map((item: any, index: number) => (
            <div key={index} className='flex justify-center items-center gap-x-4'>
            <div className='flex gap-x-2 items-center justify-center'>
                <img src={item.images[0]} alt={item.name} className='w-13 h-13 rounded-full' />
                <p className='text-sm text-gray-600 font-semibold'>{item.name}</p>
            </div>

             <div className='flex items-center gap-x-2'>
                <Button variant='outline' onClick={() => decreaseQuantity(item.id)}>-</Button>
                <p className='text-sm text-gray-600 font-semibold'>{item.quantity}</p>
                <Button variant='outline' onClick={() => increaseQuantity(item.id)}>+</Button>
             </div>

              <div>
                <p className='text-sm text-gray-600 font-medium'>${item.totalPrice ? item.totalPrice : item.price}</p>
              </div>
            </div>
          ))}
          <CardFooter className='flex flex-row items-center justify-end gap-2'>
            <p className='text-sm text-gray-600 font-semibold'>Total Price - </p>
            <p className='text-xl font-semibold text-green-400'>${GrandTotalPrice(cart)}</p>
          </CardFooter>
          <div className='flex flex-col justify-center items-center gap-y-2'>
          <Button variant='customize' className='w-full' onClick={handleSubmit}>Checkout</Button>
          <Button variant='secondary' className='w-full' onClick={removeAllCart}>Clear Cart</Button>
          </div>
          </div>
        ) : (
          <p>No items in cart</p>
        )}
      </CardContent>
    </Card>
  )
}

export default CheckOutCard
