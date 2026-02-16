import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [first, setfirst] = useState("")
    const nav=useNavigate()
  return (
    <div className='h-screen w-full relative' >
        <div className='h-full w-full flex justify-center items-center'>

        
        <Formik initialValues={{name:"",email:"",password:"",image:null,role:"user"}}
        onSubmit={async(value)=>{
            console.log(value)
            try {
                const fromData=new FormData()
                fromData.append("name",value.name)
                fromData.append("email",value.email)
                fromData.append("password",value.password)
                fromData.append("image",value.image)
                fromData.append("role",value.role)

                const req=await axios.post("http://localhost:2000/api/user/create",fromData,{withCredentials:true})
                console.log(req.data.message)
                
               
                
               
            } catch (error) {
                console.log(error.response.data.message)
                setfirst(error.response.data.message)
               
            }
        }}>
            <Form className='flex flex-col gap-10 py-15 w-1/3 border p-5  text-white backdrop-blur-md rounded-2xl'>
                <Field name="name" type="text" placeholder="Full Name" className="outline h-10 rounded-xl pl-5"/>
                <Field name="email" type="email" placeholder="email" className="outline h-10 rounded-xl pl-5"/>
                <Field name="password" type="password" placeholder="****" className="outline h-10 rounded-xl pl-5"/>
                <button type='submit' className='outline h-10 rounded-xl active:scale-90'>Create</button>
                {first && <h1>{first}</h1>}
            </Form>
        </Formik>
        </div>
    </div>
  )
}

export default Register