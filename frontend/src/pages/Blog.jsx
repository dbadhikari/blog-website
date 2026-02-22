import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLike , AiFillLike } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { Field, Form, Formik } from 'formik';


const Blog = () => {
   const [blogs, setBlogs] = useState([])
   const [allliked, setAllLiked] = useState([])
   const [searchtern, setSearchTern] = useState("")
   const currentuserid=localStorage.getItem("id")
   const searchblog=blogs.filter(blogs=>
    blogs.title.toLowerCase().includes(searchtern.toLocaleLowerCase()) || 
    blogs.category.toLowerCase().includes(searchtern.toLocaleLowerCase())
  )

   console.log("user:",currentuserid)
   const usertoken=localStorage.getItem("token")

  
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
  return (
    <div className='h-screen w-full '>
      <div className='w-full flex flex-col items-center'>
        <h4 className='text-sm text-gray-500 my-2'>OUR BLOGS</h4>
        <h1 className='text-4xl my-2'>Find Our All Blogs From Here</h1>
        <p className='max-w-3xl text-center text-md text-gray-600 my-2'>our blogs are written from very research research and well known writers writers so that  we can provide you the best blogs and articles articles for you to read them all along</p>
      </div>
      <div className='w-full  flex justify-center mt-5'>
        <Formik initialValues={{name:""}}
        onSubmit={(value)=>{
          console.log(value)
        }}>
          {({setFieldValue})=>(
        <Form className='flex  items-center gap-2 relative h-10 w-1/3 '>
          <Field name="name" type="text" value={searchtern} placeholder="Search..."
          onChange={(e)=>{setFieldValue("name",e.target.value);
            setSearchTern(e.target.value)
          }}
          className="outline h-full w-full rounded-2xl pl-5"/>
          <button className='absolute right-2 h-10 w-10 flex justify-center items-center'><FaSearch size={25} /></button>
        </Form>
)}
        </Formik>
       
      </div >
      <div className='grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-5  pt-15 p-20 overflow-y-auto'>
      {searchblog.length > 0? ( searchblog.map((elem,idx)=>{
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

      }) ):(<h1 className="text-center text-gray-500 text-2xl mt-10 relative left-80">
    No blogs available
  </h1> )}
     
      </div>
      </div>
  )
}

export default Blog