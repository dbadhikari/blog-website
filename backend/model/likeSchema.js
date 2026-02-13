import mongoose from "mongoose"

const likeSchema=new mongoose.Schema({
    postid:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    }
})
const liked=mongoose.model("liked",likeSchema)
export default liked