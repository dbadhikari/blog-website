import axios from 'axios'
import React, { useEffect, useState } from 'react'
const baseURL = import.meta.env.VITE_BACKEND_URL;
const DashboardAdmin = () => {
    const [blogs, setBlogs] = useState([])
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
        const getData=async()=>{
           try {
            const req = await axios.get(`${baseURL}/api/blog/find`, {
        params: {
          page,
          limit: 3,
          search: searchTerm, // send search term
        },
      });
             console.log("blog data",req.data.totalPages)
             setBlogs(req.data.totalPages)
           } catch (error) {
            console.log(error.response.data.message)
           }
        }
          

  const getuser=async()=>{
    try {
      const req=await axios.get(`${baseURL}/api/user/find`)
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