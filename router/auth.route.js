import { Router } from 'express';
import { signUp, signIn, signOut } from '../controllers/auth.controller.js';
export const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/signout', signOut);