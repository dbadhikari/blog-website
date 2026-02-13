import express from "express"
import userRoute from "./userRoute.js"
import blogRoute from "./blogRoute.js"
import likeRoute from "./likeRoute.js"

const Routes=express.Router()

Routes.use("/user",userRoute)
Routes.use("/blog",blogRoute)
Routes.use("/like",likeRoute)

export default Routes