import { Router } from "express";
import { getAllSubscriptions,getSubscriptionById,getSubscriptionByUserId,cancelSubscription,renewUpcomingSubscriptions,createSubscription,updateSubscription,deleteSubscription } from "../controllers/subscription.controller.js";
import { authorize } from "../middleware/auth.middleware.js";
export const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscriptions);
subscriptionRouter.get("/:id",authorize, getSubscriptionById);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put('/:id', authorize, updateSubscription);
subscriptionRouter.delete('/:id', authorize, deleteSubscription);
subscriptionRouter.get('/user/:id', authorize, getSubscriptionByUserId);
subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);
subscriptionRouter.get('/upcoming-renew', authorize, renewUpcomingSubscriptions);