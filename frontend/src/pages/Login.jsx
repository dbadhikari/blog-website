import React from 'react'

import bg_image from "../assets/bg_img.avif"
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/features/userSlice'
const Login = () => {
    const nav=useNavigate()
    const dispatch=useDispatch()
  return (
     <div className='h-screen w-full relative' >
            <img src={bg_image} className='h-fill w-full absolute -z-30 brightness-30' alt="image" />
            <div className='h-full w-full flex justify-center items-center'>
    
            
            <Formik initialValues={{email:"",password:""}}
            onSubmit={async(value)=>{
                console.log(value)
                try {
    
                    const req=await axios.post("http://localhost:2000/api/user/login",value,{withCredentials:true})
                    console.log(req.data.message)
                    dispatch(setUser({
                        user:req.data.user,
                        token:req.data.token
                    }))
                    localStorage.setItem("role",req.data.user.role)
                    localStorage.setItem("id",req.data.user._id)
                    if(req.data.user.role=="admin"){
                        nav("/admin/dashboard")
                    }else{
                       nav("/") 
                    }
                    
                } catch (error) {
                    console.log(error.response.data.message)
                }
            }}>
                <Form className='flex flex-col gap-10 pt-15 w-1/3 border p-5  text-white backdrop-blur-md rounded-2xl'>
                    <Field name="email" type="email" placeholder="email" className="outline h-10 rounded-xl pl-5"/>
                    <Field name="password" type="password" placeholder="****" className="outline h-10 rounded-xl pl-5"/>
                    <button type='submit' className='outline h-10 rounded-xl active:scale-90'>Login</button>
                    <NavLink to='/register' >Don't Have Account ? <span className='text-blue-500'>Click me </span></NavLink>
                </Form>
            </Formik>
            </div>
        </div>
  )
}

export default Login