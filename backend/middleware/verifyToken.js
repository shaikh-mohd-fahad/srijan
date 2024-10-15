// import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken"
// const secretKey=process.env.SECRET_KEY;
const secretKey=process.env.SECRET_KEY || "mohdfahad";
export const verifyToken=(req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1];
if(!token){
    return res.json({success: false,message:"Login again... token not found"})
}
jwt.verify(token,secretKey,(err,decode)=>{
    if(err){
        return res.json({success:false,message:"Invalid Token"})
    }
    req.user=decode;
    console.log("req.user", req.user)
    next();
})
}