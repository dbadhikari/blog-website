import blog from "../model/blogSchema.js";

export const createBlog=async(req,res)=>{
    try {
        console.log("this is frontend data ",req.body)
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
export const blogFind = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    // Get search term from query (optional)
    const searchTerm = req.query.search || "";

    // Build search filter
    // Search in title or category (case-insensitive)
    const filter = searchTerm
      ? {
          $or: [
            { title: { $regex: searchTerm, $options: "i" } },
            { category: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    // Get total count for pagination (after search filter)
    const total = await blog.countDocuments(filter);

    // Get paginated data
    const data = await blog
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      data,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred while finding blogs" });
  }
};


export const blogFindbyid=async(req,res)=>{
    try {
        const {id}=req.params
        const data=await blog.findById(id)
        res.status(200).json(data)
    } catch (error) {
         res.status(400).json({message:"error finding blogs by id" })
    }
}

// export const searchBlog=async(req,res)=>{
//     try {
//         console.log(req.body)
//         const search=req.body.search
        
//         const data=await blog.find({
//             $or:[
//                 {title:{$regex:search,$options:"i"}},
//                 {category:{$regex:search,$options:"i"}}
//             ]
//         })
//         res.status(200).json(data)
//     } catch (error) {
//         res.status(400).json({message:"error searching blogs" })
//     }
// }