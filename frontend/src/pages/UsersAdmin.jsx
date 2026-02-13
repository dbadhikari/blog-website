import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const UsersAdmin = () => {
  const [users, setUsers] = useState([])

  const getData=async()=>{
    try {
      const req=await axios.get("http://localhost:2000/api/user/find")
      console.log(req.data)
      setUsers(req.data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  useEffect(()=>{
    getData()
  },[])
  return (
   <div className='h-full w-full  p-10'>
     <table className='w-full'>
      <thead className='border' >
        <tr className='' >
          <th className='w-1/6'>Image</th>
          <th className='w-1/6'>Name</th>
          <th className=''>Email</th>
          <th className=''>Role</th>
         
          <th className=''>Controler</th>
        </tr>
      </thead>
      <tbody >
         {users.map((elem,idx)=>{
       return  <tr key={idx} className={`${elem.role==="admin" ? "bg-red-200" : "" }`} >
          <td className='h-30'> <img className='h-25 w-25' src={elem.image} alt="img" /> </td>
          <td>{elem.name}</td>
          <td>{elem.email}</td>
          <td className="uppercase">{elem.role}</td>
          <td><button>Edit</button><button>Delet</button></td>
        </tr>
      })}
       
      </tbody>
     </table>
    </div>
  )
}

export default UsersAdmin