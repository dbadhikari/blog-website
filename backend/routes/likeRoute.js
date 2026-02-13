import express from "express"
import { createLike, findLiked } from "../authController/likeAuth.js"

const likeRoute=express.Router()

likeRoute.post("/create",createLike)
likeRoute.get("/find/:userid",findLiked)
export default likeRoute