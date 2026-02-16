import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddBlogForm = () => {
    const nav=useNavigate()
    const userName=localStorage.getItem("username")
  return (
    <div className='h-screen w-full flex flex-col gap-10 justify-center items-center'>

        <Formik 
        initialValues={{image:"",title:"",content:"",category:"",author:`${userName}`}}
        onSubmit={async(value)=>{
           console.log(value)
           try {
              const formData=new FormData()
               formData.append("title",value.title)
               formData.append("content",value.content)
               formData.append("category",value.category)
               formData.append("author",value.author)
               formData.append("image",value.image)
               
               const req=await axios.post("http://localhost:2000/api/blog/create",formData,{
                withCredentials:true
               })
               console.log(req.data.message)
            alert(req.data.message)
            nav(-1)

           } catch (error) {
            console.log(error.response.data.message)
           }
        }}
        >
            {({setFieldValue})=>(
            <Form className='flex flex-col gap-10 w-1/3'>
                <Field name="title" type="text" placeholder="Title" className="outline h-12 rounded pl-5 text-2xl" />
                <Field name="content" as="textarea" placeholder="Content" className="outline h-50 rounded pl-5 text-2xl" />
                <Field name="category" type="text" placeholder="Category" className="outline h-12 rounded pl-5 text-2xl" />
                <input
                name="image"
                type="file"
                className="outline w-50 rounded"
                onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
            />
                <button type="submit" className='outline h-12 rounded active:scale-90 text-2xl'>Add</button>
            </Form>
            )}
        </Formik>
    </div>
  )
}

export default AddBlogForm