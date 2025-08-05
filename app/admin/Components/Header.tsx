'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathName = usePathname()
    let headerText = ""
    switch(pathName) {
        case '/admin':
            headerText = "Dashboard"
            break;
        case '/admin/products':
            headerText = "Products"
            break;
        case '/admin/orders':
            headerText = "Orders"
            break;
        case '/admin/users':
            headerText = "Customers"
            break;
    }
  return (
    <div className='text-2xl font-bold mb-4'>
      {headerText}
    </div>
  )
}

export default Header
