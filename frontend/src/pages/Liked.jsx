import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Liked = () => {
  const [alllikedata , setallLikeData] = useState([])
  const [userlikedetails, setuserLikeDetails] = useState([])
  const userid=localStorage.getItem("id")
  const thisUserLiked=alllikedata.filter((items)=>items.userid===userid)
  console.log("this is liked post",thisUserLiked)
  const nav=useNavigate()
   const getLike=async()=>{
        try {
            const req=await axios.get(`http://localhost:2000/api/like/findall`)
            console.log("all user like :",req.data)
            setallLikeData(req.data)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

   
      const fetchBlogData=async()=>{
        if(thisUserLiked.length===0) return;

        const result=await Promise.all(
          thisUserLiked.map((elem)=>axios.get(`http://localhost:2000/api/blog/findbyid/${elem.postid}`))
        )
        setuserLikeDetails(result.map((res)=>res.data))
        console.log("this is data",result.map((res)=>res.data))
       }
  useEffect(()=>{
   getLike()
   fetchBlogData()
  },[])
  useEffect(()=>{
   fetchBlogData()
  },[alllikedata])

  
  return (
    <div>
   <div className='w-full flex flex-col items-center'>
        <h4 className='text-sm text-gray-500 my-2'>Favourite</h4>
        <h1 className='text-4xl my-2'>Find  All Blogs You Liked</h1>
      </div>
     <div className='grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-5  pt-15 p-20 overflow-y-auto'>
      {userlikedetails.map((elem,idx)=>{
     
        return <div key={idx} >
        <div className=' h-[360px]'>
        <img className='h-full w-full object-cover rounded-3xl ' src={elem.image} alt="img" />
        </div>
        <div className='pt-5'>
        <h1>{elem.category}<span className='bold text-gray-400 text-sm pl-5'>{elem.createdAt.split("T")[0]}</span></h1>
        <h1 className='font-bold py-5'>{elem.title} </h1>
        
        <p className='font-light text-md text-gray-600 '>{elem.content.split(" ").slice(1,25).join(" ")} .... </p>
       
          <button
        onClick={()=>{
          nav(`/read/${elem._id}`)
        }}
        className='cursor-pointer text-md font-bold text-[#7c4ee4] underline rounded active:scale-95'>Read More...</button>
        
        
            
            </div>
        
        
        </div>
      

      })}
      </div>
   </div>
  )
}

export default Liked