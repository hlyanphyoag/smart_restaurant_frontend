'use client'
import { notiStore } from '@/store/StatusStore'
import React from 'react'

const page = () => {
  const {notifications} = notiStore()
  return (
    <div>
      Here is notification page
    </div>
  )
}

export default page
