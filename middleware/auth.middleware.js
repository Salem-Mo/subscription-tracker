import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

export const authorize=async (req,res,next)=>{
    try {
        let token
        if(req.headers.authorization &&req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        const decode =jwt.verify(token,JWT_SECRET)
        const user=await User.findById(decode.userId)
        if(!user){
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user=user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Unauthorized" });
        
    }
}