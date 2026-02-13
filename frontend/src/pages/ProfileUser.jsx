import axios from 'axios'
import React, { useEffect, useState } from 'react'


const ProfileUser = () => {
    const [userData, setUserData] = useState([])
    const id=localStorage.getItem("id")
    console.log(id)
    const getData=async()=>{
        try {
            const req=await axios.get(`http://localhost:2000/api/user/findbyid/${id}`)
            console.log(req.data)
            setUserData(req.data)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
        <img className='h-30 w-30 rounded-2xl bg-green-200 ' src={userData.image} alt="img" />
        <h1>{userData.name}</h1>
        <h2>{userData.email}</h2>

    </div>
  )
}

export default ProfileUser