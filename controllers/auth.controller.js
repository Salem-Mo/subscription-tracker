import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { JWT_SECRET, JWT_EXPIRATION } from "../config/env.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    const session= await mongoose.startSession();
    session.startTransaction();
    try {
        const existingUser=await User.findOne({email})
        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }
        // Hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create([{
            name,
            email,
            password: hashedPassword,
        }], { session });

        const token = jwt.sign(
            { id: user[0]._id }, 
            JWT_SECRET, 
            {
                expiresIn: JWT_EXPIRATION
            }
        );
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            message: 'User created successfully',
            data: {
                user: {
                    id: user[0]._id,
                    name: user[0].name,
                    email: user[0].email,
                },
                token
            }
        });
    } catch (error) {
        await session.abortTransaction();
        const err = new Error(`Failed to create user: ${error.message}`);
        err.statusCode = 500;
        throw err;
    }
}

export const signIn =async(req,res,next)=>{
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({userId:user._id},JWT_SECRET,{
            expiresIn: JWT_EXPIRATION
        });
        res.status(200).json({
            message: 'User signed in successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token
            }
        });

    } catch (error) {
        const err = new Error(`Failed to sign in: ${error.message}`);
        throw err;
        
    }
}
export const signOut =(req,res,next)=>{
    
}