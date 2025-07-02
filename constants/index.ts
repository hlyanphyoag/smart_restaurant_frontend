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


export const adminSideBarLinks = [
    {
      img: "/icons/admin/home.svg",
      route: "/admin",
      text: "Home",
    },
    {
      img: "/icons/admin/users.svg",
      route: "/admin/users",
      text: "All Users",
    },
    {
      img: "/icons/admin/book.svg",
      route: "/admin/books",
      text: "All Books",
    },
    {
      img: "/icons/admin/bookmark.svg",
      route: "/admin/order-records",
      text: "Order Records",
    },
    {
      img: "/icons/admin/user.svg",
      route: "/admin/account-requests",
      text: "Account Requests",
    },
  ];