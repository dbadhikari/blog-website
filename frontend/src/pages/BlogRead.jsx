import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BlogRead = () => {
    const [blogData, setBlogData] = useState([])
    const [likeData, setLikeData] = useState([])
    const {id}=useParams()
    console.log(id)
    const thisLike=likeData.filter(item=> item.postid===id)
    console.log("this post is liked ", thisLike)
    const liked=thisLike.length > 0
    console.log(liked)
    const userid=localStorage.getItem("id")
    
    const getLiked=async()=>{
     try {
        const req=await axios.get(`http://localhost:2000/api/like/find/${userid}`)
        console.log(req.data)
        setLikeData(req.data)
     } catch (error) {
         console.log(error.response.data.message)
     }
    }
    
      const getData=async()=>{
            try {
                const req=await axios.get(`http://localhost:2000/api/blog/findbyid/${id}`)
                setBlogData(req.data)
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
        const handelLike=async()=>{
            try {
                if(liked==true){
                   return await axios.delete("")
                }
            if(liked==false){
                return await axios.post("http://localhost:2000/api/like/create",{
                    "postid":id,
                    "userid":userid
                })
            }
            } catch (error) {
                 console.log(error.response.data.message)
            }
        }
        useEffect(()=>{
            getData()
            getLiked()
        },[])
  return (
    <div>
        <h3>{blogData.createdAt}</h3>
        <h1>{blogData.category}</h1>
        <img src={blogData.image} alt="img" />
        <h1>{blogData.title}</h1>
        <p>{blogData.content}</p>
        <h1>{blogData.author}</h1>
        {liked ? <button className='p-2 px-5 bg-green-300 active:scale-90'>Liked</button> :<button className='p-2 px-5 bg-green-300 active:scale-90'>Like</button>  }
    </div>
  )
}

export default BlogRead