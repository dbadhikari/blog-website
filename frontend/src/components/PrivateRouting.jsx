import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouting = () => {
      const token=useSelector((state)=>state.Auth.token)

  return token? <Outlet/> : <Navigate to='/login'/>
   
  
}

export default PrivateRouting