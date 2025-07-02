import { Router } from "express";
import { getAllUsers,getUserById,createUser,updateUser ,deleteUser } from "../controllers/users.controller.js";
export const userRouter = Router();
import { authorize } from "../middleware/auth.middleware.js";

userRouter.get("/", getAllUsers);
userRouter.get("/:id", authorize, getUserById);
userRouter.post("/", createUser);

userRouter.put('/:id', authorize, updateUser);
userRouter.delete('/:id', authorize, deleteUser);