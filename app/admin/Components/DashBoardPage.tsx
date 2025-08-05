import React from 'react'
import DashBoardStatus from './DashBoardStatus'
import { ChartPieDonutText } from './chart_pie'
import { ChartLineDefault } from './line_chart'
import { ChartBarDefault } from './example_chart'

const DashBoardPage = () => {
  return (
    <div>
        <DashBoardStatus />
        <div className='flex gap-x-4  mt-6'>
            <ChartPieDonutText />
            <ChartLineDefault />
            <ChartBarDefault />
        </div>
    </div>
  )
}

export default DashBoardPage
