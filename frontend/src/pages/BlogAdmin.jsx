import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([])
      const getData=async()=>{
         try {
          const req=await axios.get("http://localhost:2000/api/blog/find")
           console.log(req.data)
           setBlogs(req.data)
         } catch (error) {
          console.log(error.response.data.message)
         }
      }
    useEffect(()=>{
      getData()
    },[])
  return (
    <div className='h-full w-full  p-10'>
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
         {blogs.map((elem,idx)=>{
       return  <tr key={idx} >
          <td className='h-30'> <img className='h-25 w-25' src={elem.image} alt="img" /> </td>
          <td>{elem.title}</td>
          <td>{elem.category}</td>
          <td>{elem.author}</td>
          <td>{elem.createdAt.split("T")[0]}</td>
          <td><button>Edit</button><button>Delet</button></td>
        </tr>
      })}
       
      </tbody>
     </table>
    </div>
  )
}

export default BlogAdmin