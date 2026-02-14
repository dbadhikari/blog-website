import liked from "../model/likeSchema.js"


export const createLike=async(req,res)=>{
    try {
      
      console.log("this is frontend data :",req.body)
        const data=await liked.create(req.body)
        console.log(data)
        res.status(201).json({message:"liked saved"})
    } catch (error) {
        res.status(400).json({message:"error saving liked post "})
    }
}
export const findLiked = async (req, res) => {
  try {
    console.log(req.params)
    const { postid } = req.params;
    const data = await liked.find({ postid});  
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error finding liked posts" });
  }
};
export const deletLike=async(req,res)=>{
  try {
    console.log(req.params)
    const {id}=req.params
    const data=await liked.findByIdAndDelete(id)
    res.status(201).json({message:"liked deleted"})
  } catch (error) {
    res.status(400).json({ message: "errordeletingliked posts" });
  }
}
