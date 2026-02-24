import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const baseURL = import.meta.env.VITE_BACKEND_URL;
const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([])
  const nav=useNavigate()
      const getData=async()=>{
         try {
          console.log("here it is working")
           
           const req = await axios.get(`${baseURL}/api/blog/find`, {
        params: {
          page,
          limit: 3,
          search: searchTerm, // send search term
        },
      });
           console.log("this is backend data comming ",req.data)
           setBlogs(req.data || [])
         } catch (error) {
          console.log(error.response.data.message)
         }
      }
    useEffect(()=>{
      getData()
    },[])
  return (
    <div className='h-full w-full  p-10'>
    <button onClick={()=>{
      nav("/blogform")
    }} className='p-3 bg-green-400 m-3 active:scale-90'>Add Blog</button>

     <table className='w-full'>
      <thead className='border' >
        <tr className='' >
          <th className='w-1/6'>Image</th>
          <th className='w-1/6'>Title</th>
          <th className=''>Category</th>
          <th className=''>Author</th>
          <th className=''>Created At</th>
          <th className=''>Controler</th>
        </tr>
      </thead>
      <tbody >
         {(blogs || []).map((elem,idx)=>{
       return  <tr key={idx} >
          <td className='h-30'> <img className='h-25 w-25' src={elem.image} alt="img" /> </td>
          <td>{elem.title}</td>
          <td>{elem.category}</td>
          <td>{elem.author}</td>
          <td>{ elem.createdAt?.split("T")[0]}</td>
          <td><button>Edit</button><button>Delet</button></td>
        </tr>
      })}
       
      </tbody>
     </table>
    </div>
  )
}

export default BlogAdmin