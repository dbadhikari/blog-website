import express from "express"
import { createLike, deletLike, findAllLiked, findLiked } from "../authController/likeAuth.js"

const likeRoute=express.Router()

likeRoute.post("/create",createLike)
likeRoute.get("/find/:postid",findLiked)
likeRoute.delete("/delet/:id",deletLike)
likeRoute.get("/findall",findAllLiked)
export default likeRoute