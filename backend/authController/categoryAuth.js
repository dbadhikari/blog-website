import Category from "../model/categorySchema.js"

export const createCategory=async(req,res)=>{
    try {
        const{category}=req.body
        if(!category){
            return res.status(400).json({message:"enter category"})
        }
        const data=await Category.create(req.body)
         res.status(201).json({message:"category added"})
    } catch (error) {
          res.status(400).json({message:"error in category"})
    }
}

export const findCategory=async(req,res)=>{
    try {
        const data=await Category.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message:"error finding category"})
    }
}