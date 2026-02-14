import express from "express"
import { createLike, deletLike, findLiked } from "../authController/likeAuth.js"

const likeRoute=express.Router()

likeRoute.post("/create",createLike)
likeRoute.get("/find/:postid",findLiked)
likeRoute.delete("/delet/:id",deletLike)
export default likeRoute