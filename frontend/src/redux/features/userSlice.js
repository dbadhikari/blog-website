import { createSlice } from "@reduxjs/toolkit";


const User=createSlice({
    name:"userdata",
    initialState:{
        user:null,
        token:localStorage.getItem("token") || null
    },
    reducers:{
        setUser:(state,action)=>{
            console.log(action.payload.user)
            state.user=action.payload.user
            state.token=action.payload.token
            localStorage.setItem("token",action.payload.token)
        },
        setlogout:(state)=>{
            state.user=null
            state.token=null
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            localStorage.removeItem("id")
            localStorage.removeItem("username")
            localStorage.removeItem("image")
        }

    }
})
export const {setUser,setlogout}=User.actions

export default User.reducer