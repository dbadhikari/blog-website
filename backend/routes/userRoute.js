import express from "express"
import { createUser, loginUser, logoutUser, updateImage, userFind, userFindbyid } from "../authController/userAuth.js"
import Upload from "../middleware/uploadImage.js"

const userRoute=express.Router()

userRoute.post("/create", Upload.single("image") ,createUser)
userRoute.post("/login",loginUser)
userRoute.post("/logout",logoutUser)
userRoute.get("/find",userFind)
userRoute.get("/findbyid/:id",userFindbyid)
userRoute.put("/image/:id",Upload.single("image"),updateImage)

export default userRoute