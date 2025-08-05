import React from 'react'
import ProgressOrderCard from './components/ProgressOrderCard'
import StockRequestCard from './components/StockRequestCard'
import ReadyOrderCard from './components/ReadyOrderCard'

const page = () => {
  return (
    <div className='flex gap-x-4 justify-center'>
      <ProgressOrderCard />
      <StockRequestCard />
      <ReadyOrderCard />
    </div>
  )
}


export default page
