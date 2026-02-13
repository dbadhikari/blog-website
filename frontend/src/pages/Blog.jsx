import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Blog = () => {
   const [blogs, setBlogs] = useState([])
const nav=useNavigate()
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
    <div className='h-screen w-full flex flex-col gap-5 pt-5 overflow-y-auto'>
      {blogs.map((elem,idx)=>{
        return <div key={idx} className=' w-full h-[40vh] flex justify-center'>
        <div className=' w-1/3'>
        <img className='h-full w-full object-cover rounded-3xl' src={elem.image} alt="img" />
        </div>
        <div className=' h-full w-2/4 p-5'>
        <h1 className='text-2xl font-bold'>{elem.title}</h1>
        <h2 className='font-extralight pb-5'>{elem.category}</h2>
        <p>{elem.content.split(" ").slice(1,45).join(" ")} .... </p>
        <button
        onClick={()=>{
          nav(`/read/${elem._id}`)
        }}
        className='bg-green-300 p-2 px-3 rounded-xl mt-5 active:scale-95'>Read More..</button>
        </div>
      </div>

      })}
      
      </div>
  )
}

export default Blog