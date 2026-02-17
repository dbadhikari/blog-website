import axios from 'axios'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'


const ProfileUser = () => {
    const [userData, setUserData] = useState([])
    const [first, setfirst] = useState(false)
    const id=localStorage.getItem("id")
    console.log(id)
    const getData=async()=>{
        try {
            const req=await axios.get(`http://localhost:2000/api/user/findbyid/${id}`)
            console.log(req.data)
            setUserData(req.data)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div className='h-screen w-full flex flex-col items-center pt-15'>
        <img className='h-60 w-60 rounded-full object-cover bg-green-200 ' src={userData.image} alt="img" />
        <button onClick={()=>{
            setfirst(true)
        }}>Edit Profile pic</button>
        <h1 className='mt-10 text-4xl'>{userData.name}</h1>
        <h2 className=''>{userData.email}</h2>
       {first && (<div className='absolute inset-0 flex justify-center items-center'>
         <div className='h-50 w-100 bg-gray-300 flex flex-col items-center relative'>
            <button
            onClick={()=>{
                setfirst(false)
            }}
            className='absolute right-3'>X</button>
            <h1 className='py-5 text-2xl'>Choose the profile pic</h1>
            <Formik initialValues={{image:""}}
            onSubmit={async(value)=>{
                console.log(value)
                try {
                   const  formData=new FormData()
                formData.append("image",value.image)

                const req=await axios.put(`http://localhost:2000/api/user/image/${id}`,formData,{withCredentials:true})
                console.log(req.data.message)
                getData()
                window.location.reload()
                setfirst(false)
                } catch (error) {
                    console.log(error.response.data.message)
                }
                            
            }}
            >
                {({ setFieldValue }) => (
                <Form className=' flex flex-col gap-5'>
               <input name="image" type="file" required className='outline h-8 w-1/2 rounded ' 
               onChange={(e) => setFieldValue("image", e.target.files[0])}
               />
               <button type="submit" className='py-5 bg-amber-600 h-10 flex justify-center items-center active:scale-90 rounded-2xl'>Add Profile</button>
               </Form>)}
            </Formik>
         </div>
       </div>)}
    </div>
  )
}

export default ProfileUser