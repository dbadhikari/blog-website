import express from "express"
import dotenv from "dotenv"
import connectdb from "./config/db.js"
import Routes from "./routes/mainRoute.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import Upload from "./middleware/uploadImage.js"
dotenv.config()

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectdb()
const frontend={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cookieParser())
app.use(cors(frontend))
app.use("/api",Routes)
app.use("/upload",express.static("upload"))
app.get("/",(req,res)=>{
    res.send("This is Backend")
})


app.listen(2000,()=>{
    console.log("Server Started...")
})