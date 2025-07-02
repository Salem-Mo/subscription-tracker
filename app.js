import express from 'express';
import mongoose from 'mongoose';
import {PORT , DB_URI} from './config/env.js';
import {authRouter} from './router/auth.route.js';
import {userRouter} from './router/user.route.js';
import workflowRouter from './router/workflow.route.js';
import {subscriptionRouter} from './router/subscribtion.route.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import {arcjetMiddleware} from './middleware/arcjet.middleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users',  userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflow', workflowRouter);

app.use(errorMiddleware)














mongoose.connect(DB_URI)
.then(()=>{console.log('Connected to MongoDB')})
.catch((err)=>{console.error(err.message)});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
export default app;