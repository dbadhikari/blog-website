import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

const AdminCategory = () => {
          const [categorydata, setCategoryData] = useState([])
    const getData=async()=>{
        try {
            const req=await axios.get("http://localhost:2000/api/category/find")
            setCategoryData(req.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <div className='h-screen w-full '>AdminCategory
        <div>
        <Formik 
        initialValues={{category:""}}
        onSubmit={async(value)=>{
            console.log(value)
            try {
                const req=await axios.post("http://localhost:2000/api/category/create",value,{withCredentials:true})
                console.log(req.data.message)
                getData()
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
        <div>
            <table className='border w-[30vh]'>
                <thead className='border-b'>
                    <tr>
                        <th>SN</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {categorydata?.map((elem,idx)=>{
                    return  <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>{elem.category}</td>
                        <td><button>Delet</button></td>
                    </tr>
                   })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminCategory