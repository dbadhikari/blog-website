import express from "express"
import { blogFind, blogFindbyid, createBlog } from "../authController/blogAuth.js"
import Upload from "../middleware/uploadImage.js"

const blogRoute=express.Router()

blogRoute.post("/create",Upload.single("image") ,createBlog)
blogRoute.get("/find",blogFind)
blogRoute.get("/findbyid/:id",blogFindbyid)

export default blogRoute