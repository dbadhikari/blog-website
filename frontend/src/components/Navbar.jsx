import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setlogout } from '../redux/features/userSlice'
import { RiLogoutBoxRLine } from "react-icons/ri";

const Navbar = () => {

    const token=useSelector((state)=>state.Auth.token)
    const role=localStorage.getItem("role")
    const dispatch=useDispatch()
    const userDetails=useSelector((state)=>state.Auth.user)
    console.log("this is user details :",userDetails)
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
    <div className='flex  justify-between items-center p-5 px-15 text-2xl gap-10 bg-gray-300 '>
      <h1 className='text-4xl'>Blog Web.com</h1>
      <div className=' flex gap-5'>
      {role !== "admin" && (
        <>
        <NavLink to="/" className={({isActive})=>`${isActive ?"text-red-300":""}`}>Home</NavLink>
        <NavLink to="/blog" className={({isActive})=>`${isActive ?"text-red-300":""}`}>Blog</NavLink>
        {token && (<NavLink to="/liked" className={({isActive})=>`${isActive ?"text-red-300":""}`}>Liked</NavLink>) } 

        </>
        )}

        </div >
        {role === "admin" && (<h1>Admin Panel</h1>)}
        <div className='flex items-center gap-10'>
      
       {token? <NavLink to="/login"
       onClick={handlelogout}
       className={({isActive})=>`${isActive ?"text-red-300":""}`}><RiLogoutBoxRLine/></NavLink> : <NavLink to="/login" className={({isActive})=>`${isActive ?"text-red-300":""}`}>Login</NavLink>}
       {token && (
        <NavLink to='/profileuser' className='capitalize flex gap-5 items-center'>{userDetails?.name} <img className='h-13  rounded-full' src="https://media.themoviedb.org/t/p/w235_and_h235_face/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg" alt="" /> </NavLink> 
       )}
    </div>
    </div>
  )
}

export default Navbar