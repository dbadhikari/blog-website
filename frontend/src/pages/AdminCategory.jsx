import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React from 'react'

const AdminCategory = () => {
  return (
    <div>AdminCategory

        <Formik 
        initialValues={{category:""}}
        onSubmit={async(value)=>{
            console.log(value)
            try {
                const req=await axios.post("http://localhost:2000/api/category/create",value,{withCredentials:true})
                console.log(req.data.message)
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
            
        }
        >
            <Form>
                <Field name="category" type="text" placeholder="write.." className="outline"/>
                <button type='submit' className='bg-green-300 p-2 px-5 active:scale-90'>Add</button>
            </Form>
        </Formik>
    </div>
  )
}

export default AdminCategory