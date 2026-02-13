import { configureStore } from "@reduxjs/toolkit";
import users from "./features/userSlice"

const Store=configureStore({
    reducer:{
        Auth:users
    }
})
export default Store