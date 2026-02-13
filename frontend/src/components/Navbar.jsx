import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setlogout } from '../redux/features/userSlice'

const Navbar = () => {

    const token=useSelector((state)=>state.Auth.token)
    const role=localStorage.getItem("role")
    const dispatch=useDispatch()
    const handlelogout=async()=>{
        try {
            const req= await axios.post("http://localhost:2000/api/user/logout",{},{withCredentials:true})
            console.log(req.data.message)
            dispatch(setlogout())
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='flex justify-center p-5 text-2xl gap-10 bg-gray-300 '>
      {role !== "admin" && (
        <>
        <NavLink to="/" className={({isActive})=>`${isActive ?"text-red-300":""}`}>Home</NavLink>
        <NavLink to="/blog" className={({isActive})=>`${isActive ?"text-red-300":""}`}>Blog</NavLink>
        <NavLink to="/profile/profileuser" className={({isActive})=>`${isActive ?"text-red-300":""}`}>Profile</NavLink>
        </>
        )}
      {role === "admin" && (<h1>Admin Panel</h1>)}
       {token? <NavLink to="/login"
       onClick={handlelogout}
       className={({isActive})=>`${isActive ?"text-red-300":""}`}>Logout</NavLink> : <NavLink to="/login" className={({isActive})=>`${isActive ?"text-red-300":""}`}>Login</NavLink>}
    </div>
  )
}

export default Navbar