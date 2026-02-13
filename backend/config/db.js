import mongoose from "mongoose";

const connectdb=async()=>{
    try {
        const data=await mongoose.connect(process.env.Mongoose_key)
        console.log("db Connected...")
    } catch (error) {
        console.log(error)
    }
}
export default connectdb