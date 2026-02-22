import React, { useEffect, useState } from 'react'

import {SwiperSlide,Swiper} from "swiper/react"
import 'swiper/css'
import 'swiper/css/pagination'
import {Navigation,Pagination,Autoplay} from "swiper/modules"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AiOutlineLike , AiFillLike } from "react-icons/ai";

const Home = () => {
const [blogs, setBlogs] = useState([])
const [allliked, setAllLiked] = useState([])
  const currentuserid = localStorage.getItem("id");
const usertoken = localStorage.getItem("token");

  
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
       

    useEffect(()=>{
      getData()
      getLike()
    
    },[])

     const scrollToSection2 = () => {
    const section = document.getElementById("section2");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <section className='w-full h-[91vh]  relative ' >
        <div className=' absolute inset-0 z-50 text-white flex flex-col gap-0 justify-center items-center'>
      <h1 className="text-8xl font-bold ">
  Explore the world 
</h1>

<h3 className="text-6xl font-bold ">
  Time to Dive in
</h3> 
<button onClick={scrollToSection2} className='border p-2 rounded-4xl px-5 mt-5'>Dive IN</button>
</div>
<Swiper className='h-full' pagination={true}   autoplay={true} modules={[Pagination,Autoplay]}>
        <SwiperSlide className='h-full'>
          <img 
          className='h-full w-full object-cover '
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
         <SwiperSlide>
          <img className='h-full w-full object-cover ' 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1642&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='h-full w-full object-cover ' 
          src="https://plus.unsplash.com/premium_photo-1664303745597-44572ee427dc?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
         <SwiperSlide>
          <img className='h-full w-full object-cover ' 
          src="https://plus.unsplash.com/premium_photo-1691735665916-cf31006dffe3?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='h-full w-full object-cover ' 
          src="https://media.istockphoto.com/id/1374221694/photo/fulari-gumba-from-drone-point-of-view-nepal.jpg?s=1024x1024&w=is&k=20&c=p9B1WaQRD6QgA9799WN2XkhyK9nmCvafjCo_P8pEw3A=" alt="" />
        </SwiperSlide>
      </Swiper>
      </section>
      <section id="section2" className='h-[100vh] w-full '>
         <h1 className='text-4xl font-bold my-5 text-center'>Our Latest Blogs</h1>
         <h3 className='text-3xl font-bold mt-3 text-center'>Travel, read, explore — the world is yours.</h3>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-5  pt-15 p-20 overflow-y-auto'>
        {blogs.slice(0,3).map((elem,idx)=>{
          const findLiked=allliked.filter((items)=>items.postid===elem._id )
    
        const isLikedByUser=allliked.find((items)=>items.userid===currentuserid && items.postid===elem._id)
        console.log(isLikedByUser)
        return <div key={idx} >
        <div className=' h-[360px]'>
        <img className='h-full w-full object-cover rounded-3xl ' src={elem.image} alt="img" />
        </div>
        <div className='pt-5'>
        <h1 className='capitalize'>{elem.category}<span className='bold text-gray-400 text-sm pl-5'>{elem.createdAt.split("T")[0]}</span></h1>
        <h1 className='font-bold py-5'>{elem.title} </h1>
        
        <p className='font-light text-md text-gray-600 '>{elem.content.split(" ").slice(1,25).join(" ")} .... </p>
        <div className="flex items-center justify-between  mt-5 ">
          <button
        onClick={()=>{
          nav(`/read/${elem._id}`)
        }}
        className='cursor-pointer text-md font-bold text-[#7c4ee4] underline rounded active:scale-95'>Read More...</button>
        
          <div className="flex items-center gap-2 pr-10">
            
            <button 
            className='cursor-pointer'
            onClick={async()=>{
              if(!usertoken) {
                alert("please login to like")
                nav("/login")
                return;
              }
              if(isLikedByUser){
               try {
                const req=await axios.delete(`http://localhost:2000/api/like/delet/${isLikedByUser._id}`)
                console.log(req.data.message)
                getLike()
                
            } catch (error) {
                 console.log(error.response.data.message)
            }
        

              }else{
                try {
                const req=await axios.post("http://localhost:2000/api/like/create",{
                    postid:elem._id,
                    userid:currentuserid
                })
                console.log(req.data.message)
                getLike()
                
            } catch (error) {
                 console.log(error.response.data.message)
            }
              }
            }}>{isLikedByUser? <AiFillLike size={35} color="#3a98f6"/> : <AiOutlineLike size={35}/>}</button>
            <h1 className="text-2xl">{findLiked.length}</h1>
            </div>
        
        
        </div>
        </div>
      </div>

      
        })}
        </div>
      </section>
    </div>
  )
}

export default Home