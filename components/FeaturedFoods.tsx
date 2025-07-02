import { Food } from '@/types/food'
import React from 'react'
import { InfiniteMovingCardsDemo } from './MovinigCard'

const FeaturedFoods = ({footData} : {footData: Food[]}) => {
  return (
    <div className="flex  justify-start items-center mt-4">
      <InfiniteMovingCardsDemo items={footData}/>
    </div>
  )
}

export default FeaturedFoods
