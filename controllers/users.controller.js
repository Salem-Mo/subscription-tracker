import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password -__v -createdAt -updatedAt');
        res.send({
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const getUserById=async (req, res) => {
    try {
        const userId =req.params.id;
        const user =await User.findById(userId, '-password -__v');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const createUser=async(req,res)=>{
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const updateUser=async(req,res)=>{
    try {
        const userId=req.params.id;
        const updatedUser= await User.findByIdAndUpdate(userId,req.body,{ new: true })
        if(!updatedUser){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const deleteUser=async(req,res)=>{
    try {
        const userId=req.params.id;
        const deletedUser=await User.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}