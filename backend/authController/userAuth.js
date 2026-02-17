import generateToken from "../config/token.js"
import User from "../model/userSchema.js"
import bcrypt from "bcrypt"


export const createUser=async(req,res)=>{
    try {
        const{name,email,password,role}=req.body
        if(!name||!email||!password){
            return res.status(400).json({message:"enter all details"})
        }
        const isExist=await User.findOne({email})
        if(isExist){
            return res.status(400).json({message:"email already used"})
        }
        const hashPassword=await bcrypt.hash(password,10)
        
        const newUser=new User({
            name:name,
            email:email,
            password:hashPassword,
            role:role,
            image:req.file? `${process.env.backend_url}/upload/${req.file.filename}` : null,

        })

        await newUser.save()
        res.status(201).json({message:"user created sucessfully" })
    } catch (error) {
       
    res.status(400).json({message:"error creating user" })
    }
}
export const userFind=async(req,res)=>{
    try {
        const data=await User.find()
        res.status(200).json(data)
    } catch (error) {
         res.status(400).json({message:"error finding user" })
    }
}
export const userFindbyid=async(req,res)=>{
    try {
        const {id}=req.params
        const data=await User.findById(id)
        res.status(200).json(data)
    } catch (error) {
         res.status(400).json({message:"error finding user by id" })
    }
}

export const loginUser=async(req,res)=>{
   try {
    const{email,password}=req.body
        if(!email||!password){
            return res.status(400).json({message:"enter all details"})
        }
        const isExist=await User.findOne({email})
        if(!isExist){
            return res.status(400).json({message:"User Not Exist"})
        }
        const isMatched=await bcrypt.compare(password,isExist.password)
        if(!isMatched){
            return res.status(400).json({message:"Password Wrong"})
        }
        const Token=generateToken(isExist._id)
        
        res.cookie("token", Token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
        })
        res.status(200).json({message:"Login success" , token:Token,user:isExist})
   } catch (error) {
    
   }
}
export const logoutUser=(req,res)=>{
    try {
         res.clearCookie("token",{
     httpOnly:true,
        secure:false,
        sameSite:"lax",
        
 })
  res.status(200).json({message:"Logout success" })
    } catch (error) {
        console.log(error)
    }

}

export const updateImage=async(req,res)=>{
    try {
        console.log(req.params,req.file.filename)
        const{id}=req.params
       const data=await User.findByIdAndUpdate(id,{image:`${process.env.backend_url}/upload/${req.file.filename}`},{new:true})
       res.status(201).json({message:"image updated"})
    } catch (error) {
        res.status(400).json({message:"update image error "})
    }
}