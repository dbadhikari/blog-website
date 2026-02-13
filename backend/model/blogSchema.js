import mongoose from "mongoose"

const blogSchema=new mongoose.Schema({
    image:{
        type:String
    },
     title:{
        type:String,
        required: true
    },
     content:{
        type:String,
        required: true
    },
     category:{
        type:String,
        required: true
    },
   author:{
      type:String,
        required: true
   }
},{timestamps:true})

const blog=mongoose.model("blogs",blogSchema)
export default blog
