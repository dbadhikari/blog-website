import jwt from "jsonwebtoken"

const generateToken=(user_id)=>{
  return jwt.sign({id:user_id},process.env.Secret_key,{expiresIn:"7d"})
}
export default generateToken