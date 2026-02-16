import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DashboardAdmin = () => {
    const [blogs, setBlogs] = useState([])
    const [users, setUsers] = useState([])
    
        const getData=async()=>{
           try {
            const req=await axios.get("http://localhost:2000/api/blog/find")
             console.log(req.data)
             setBlogs(req.data)
           } catch (error) {
            console.log(error.response.data.message)
           }
        }
          

  const getuser=async()=>{
    try {
      const req=await axios.get("http://localhost:2000/api/user/find")
      console.log(req.data)
      setUsers(req.data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
      useEffect(()=>{
        getData()
        getuser()
      },[])
  return (
    <div>
      <h1>Total Users:{users.length}</h1>
      <h1>Total Blogs:{blogs.length}</h1>
      update in process...

    </div>
  )
}

export default DashboardAdmin