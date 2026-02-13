import liked from "../model/likeSchema.js"


export const createLike=async(req,res)=>{
    try {
        const data=await liked.create(req.body)
        res.status(201).json({message:"liked saved"})
    } catch (error) {
        res.status(400).json({message:"error saving liked post "})
    }
}
export const findLiked = async (req, res) => {
  try {
    const { userid } = req.body;
    const data = await liked.find({ userid });  
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error finding liked posts" });
  }
};
