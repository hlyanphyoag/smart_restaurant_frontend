import React from 'react'
import OrderHistory from './components/OrderHistory'
import PendingCard from './components/PendingCard'

const page = () => {
  return (
    <div className='flex flex-col gap-y-8'>
        <PendingCard />
        <OrderHistory />
    </div>
  )
}

export default page
