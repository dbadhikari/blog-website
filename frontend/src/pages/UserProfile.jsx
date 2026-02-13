import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const UserProfile = () => {
  return (
    <div className='h-screen w-full flex'>
         <div className='bg-gray-500 flex flex-col gap-2 h-full w-1/6 text-white pt-5'>
            <NavLink to="/profile/profileuser" className={({isActive})=>`${isActive ?" bg-gray-400 ":""}  hover:bg-gray-300 hover:text-gray-500 h-10 w-full flex justify-center items-center text-3xl`}>Profile</NavLink>
            <NavLink to="/profile/liked" className={({isActive})=>`${isActive ?" bg-gray-400":""}  hover:bg-gray-300 hover:text-gray-500 h-10 w-full flex justify-center items-center text-3xl`}>Liked</NavLink>
          </div>
          <div className='flex-1 overflow-y-auto'>
            <Outlet/>
          </div>


      
    </div>
  )
}

export default UserProfile