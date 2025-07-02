import OrderCard from '@/app/(home)/component/OrderCard'
import React from 'react'
import CheckOutCard from '../../component/CheckOutCard'

const page = () => {
  return (
    <div className='max-w-7xl flex flex-col lg:flex-row items-start'>
      <OrderCard />
      <CheckOutCard />
    </div>
  )
}

export default page
