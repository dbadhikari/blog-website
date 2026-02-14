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
    <div className='h-screen w-full grid grid-cols-3 gap-5  pt-5 p-20 overflow-y-auto'>
      {blogs.map((elem,idx)=>{
        return <div key={idx} className=' h-[50vh] bg-gray-100 '>
        <div className=' h-[30vh]'>
        <img className='h-full w-full object-cover ' src={elem.image} alt="img" />
        </div>
        <div className='  p-2'>
        <h1 className='font-bold'>{elem.title} <span className='bold text-gray-400 text-sm'>{elem.category}</span></h1>
        
        <p className='font-light'>{elem.content.split(" ").slice(1,15).join(" ")} .... </p>
        <button
        onClick={()=>{
          nav(`/read/${elem._id}`)
        }}
        className='bg-green-300 p-1 text-xl px-2 mt-6 relative left-25 rounded-xl  active:scale-95'>Read More..</button>
        </div>
      </div>

      })}
      
      </div>
  )
}

export default Blog