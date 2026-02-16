import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineLike , AiFillLike } from "react-icons/ai";

const BlogRead = () => {
    const [blogData, setBlogData] = useState([])
    const [like, setLikeData] = useState([])
    const {id}=useParams()
    const userid=localStorage.getItem("id")
     const usertoken=localStorage.getItem("token")
    const isLiked=like.find((items)=>items.userid===userid)
    console.log("this person liked this post :",isLiked)
    const nav=useNavigate()
  
    
      const getData=async()=>{
            try {
                const req=await axios.get(`http://localhost:2000/api/blog/findbyid/${id}`)
                setBlogData(req.data)
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
    const getLike=async()=>{
        try {
            const req=await axios.get(`http://localhost:2000/api/like/find/${id}`)
            console.log("all user like :",req.data)
            setLikeData(req.data)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
        const submitLike=async()=>{
            try {
                if(!usertoken){
                    alert("please login to like")
                    nav("/login")
                        return;
                    
                }
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
    <div>
        <h3>{blogData.createdAt}</h3>
        <h1 className="capitalize">{blogData.category}</h1>
        <img src={blogData.image} alt="img" />
        <h1>{blogData.title}</h1>
        <p>{blogData.content}</p>
        <h1>{blogData.author}</h1>
        <div className='flex items-center gap-2'>
     <h1 className='text-3xl'>{like.length}</h1>
       {isLiked ? <button className='cursor-pointer' onClick={deletLike} ><AiFillLike size={35} color="#3a98f6"/></button> :  <button className='cursor-pointer' onClick={submitLike} ><AiOutlineLike size={35}/></button>}
    
        </div>
   </div>
  )
}

export default BlogRead