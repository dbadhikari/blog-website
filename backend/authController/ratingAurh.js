import Rating from "../model/ratingSchema"



export const createRating=async(req,res)=>{
    try {
        const data=await Rating.create(req.body)
        es.status(200).json({message:"rating creating sucess"})
    } catch (error) {
        res.status(400).json({message:"error creating rating"})
    }
}
