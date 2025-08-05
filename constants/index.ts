import { Boxes, ClipboardList, LayoutDashboard, User, User2, UserRoundPen, Users, UserX2Icon, Utensils } from "lucide-react";

export const FIELD_NAMES = {
    name: 'User Name',
    email: 'User Email',
    password: 'User Password',
    role: 'User Role'   
}

export const FIELD_TYPES = {
    name : 'text',
    email : 'email',
    password : 'password',
    role : 'select'
}

export const FOOD_FIELD_NAMES = {
    name: 'Food Name',
    description: 'Food Description',
    price: 'Food Price', 
    images: 'Food Images',
    ingredients: 'Food Ingredients'
}

export const FOOD_FIELD_TYPES = {
    name: 'text',
    description: 'textarea',
    price: 'number',
    images: 'file',
    ingredients: 'select'
}


export const adminSideBarLinks = [
    {
      icon: LayoutDashboard,
      route: "/admin",
      text: "Dashboard",
    },
    {
      icon: Utensils,
      route: "/admin/products",
      text: "Menu",
    },
    {
      icon: ClipboardList,
      route: "/admin/orders",
      text: "Order Records",
    },
    {
      icon: Users,
      route: "/admin/users",
      text: "Customers",
    },
    // {
    //   icon: "/icons/admin/user.svg",
    //   route: "/admin/account-requests",
    //   text: "Account Requests",
    // },
  ];

  export const adminStatus = [
    {
      icon: Users,
      text: "Total Customers",
      count: 447,
    },
    {
      icon: Boxes,
      text: "Total Products",
      count: 147,
    },
    {
      icon: ClipboardList,
      text: "Total Orders",
      count: 147,
    },
    {
      icon: UserRoundPen,
      text: "Total Employe",
      count: 147,
    }
  ]