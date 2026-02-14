import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLike , AiFillLike } from "react-icons/ai";


const Blog = () => {
   const [blogs, setBlogs] = useState([])
   const [allliked, setAllLiked] = useState([])
  //  const eachLike=allliked.filter((items)=> itmms.postid===id)
  
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
       const getLike=async()=>{
        try {
            const req=await axios.get(`http://localhost:2000/api/like/findall`)
            console.log("all user like :",req.data)
            setAllLiked(req.data)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
        const submitLike=async()=>{
            try {
                const req=await axios.post("http://localhost:2000/api/like/create",{
                    postid:id,
                    userid:userid
                })
                console.log(req.data.message)
                getLike()
                
            } catch (error) {
                 console.log(error.response.data.message)
            }
        }
        const deletLike=async()=>{
            try {
                const req=await axios.delete(`http://localhost:2000/api/like/delet/${isLiked._id}`)
                console.log(req.data.message)
                getLike()
                
            } catch (error) {
                 console.log(error.response.data.message)
            }
        }

    useEffect(()=>{
      getData()
      getLike()
    
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
        <div className="flex  justify-between px-10 mt-5 ">
          <div className="flex items-center gap-2">
            <button className="" ><AiOutlineLike size={35}/></button>
            <h1 className="text-2xl">1</h1>
            </div>
        
        <button
        onClick={()=>{
          nav(`/read/${elem._id}`)
        }}
        className='bg-green-300 p-2 text-xl  rounded active:scale-95'>Read More..</button>
        
        </div>
        </div>
      </div>

      })}
      
      </div>
  )
}

export default Blog