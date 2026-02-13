import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div className='h-screen w-full flex'>
      <div className='bg-gray-500 flex flex-col gap-2 h-full w-1/6 text-white pt-5'>
      <NavLink to="/admin/dashboard" className={({isActive})=>`${isActive ?" bg-gray-400 ":""}  hover:bg-gray-300 hover:text-gray-500 h-10 w-full flex justify-center items-center text-3xl`}>Dashboard</NavLink>
      <NavLink to="/admin/blogs" className={({isActive})=>`${isActive ?" bg-gray-400":""}  hover:bg-gray-300 hover:text-gray-500 h-10 w-full flex justify-center items-center text-3xl`}>Blogs</NavLink>
      <NavLink to="/admin/users" className={({isActive})=>`${isActive ?" bg-gray-400 ":""}  hover:bg-gray-300 hover:text-gray-500 h-10 w-full flex justify-center items-center text-3xl`}>Users</NavLink>
    </div>
    <div className='flex-1 overflow-y-auto'>
      <Outlet/>
    </div>
    
    </div>
  )
}

export default AdminPage