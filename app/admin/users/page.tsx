'use client'
import { useQueryUser } from '@/services/UserServices/user.query'
import React from 'react'
import CustomerTablePage from './component/CustomerTablePage'

const page = () => {
  return (
   <CustomerTablePage />
  )
}

export default page
