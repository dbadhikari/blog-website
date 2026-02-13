import blog from "../model/blogSchema.js";

export const createBlog=async(req,res)=>{
    try {
        const {title,content,category,author}=req.body
        if(!title || !content  || !category || !author){
            return  res.status(400).json({message:"enter all details"})
        }
        const newblog=new blog({
         image:req.file ? `${process.env.backend_url}/upload/${req.file.filename}`:null,
         title,
         content,
         category,
         author
        })
      await newblog.save()
      res.status(201).json({message:"Blog Created Sucessfully"})
    } catch (error) {
        res.status(400).json({message:"error occure while creating blog"})
    }
} 

export const blogFind=async(req,res)=>{
    try {
        const data=await blog.find().sort({createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message:"error occure while finding blog"})
    }
}
export const blogFindbyid=async(req,res)=>{
    try {
        const {id}=req.params
        const data=await blog.findById(id)
        res.status(200).json(data)
    } catch (error) {
         res.status(400).json({message:"error finding blogs by id" })
    }
}