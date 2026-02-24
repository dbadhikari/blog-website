import express from "express"
import userRoute from "./userRoute.js"
import blogRoute from "./blogRoute.js"
import likeRoute from "./likeRoute.js"
import categoryRote from "./categoryRoute.js"
import ratingRoute from "./ratingRoute.js"

const Routes=express.Router()

Routes.use("/user",userRoute)
Routes.use("/blog",blogRoute)
Routes.use("/like",likeRoute)
Routes.use("/category",categoryRote)
Routes.use("/rating",ratingRoute)
export default Routes