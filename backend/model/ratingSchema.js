import mongoose from "mongoose";

const ratingSchema=new mongoose.Schema({
    postid:{
        type:String,
    },
    userid:{
      type:String,
    },
    rate:{
        type:Number
    },
    message:{
       type:String,
    }

})
const Rating=mongoose.model("rating",ratingSchema)

export default Rating