// import Subscription from '../models/subscription.model.js';
// import {upstashClient} from '../config/upstash.js';
// import { SERVER_URL } from '../config/env.js';
// export const getAllSubscriptions = async(req, res, next) => {
//     try {
//         const subscriptions = await Subscription.find();
//         if (subscriptions.length === 0) {
//             return res.status(404).json({ message: 'No subscriptions found' });
//         }
//         res.status(200).json(subscriptions);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
//     }
// };
// export const getSubscriptionById = async(req, res, next) => {
//     try {
//         const subscriptionId = req.params.id;
//         const subscription=await Subscription.findById(subscriptionId);
//         if (!subscription) {
//             return res.status(404).json({ message: 'Subscription not found' });
//         }
//         res.status(200).json(subscription);

//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching subscription', error: error.message });
        
//     }
// }
// export const createSubscription = async(req, res, next) => {
//     try {
//         const { name, frequency, price, paymentMethod, currency, category, status } = req.body;
//         const currentUser = req.user._id;
//         const renewalInterval = frequency === 'monthly' ? new Date(new Date().setMonth(new Date().getMonth() + 1)) : frequency === 'weekly' ? new Date(new Date().setDate(new Date().getDate() + 7)) : frequency === 'daily' ? new Date(new Date().setDate(new Date().getDate() + 1)) : null;
//         const newSubscription = new Subscription({
//             name,
//             frequency,
//             price,
//             paymentMethod,
//             status,
//             currency,
//             category,
//             renewalDate: renewalInterval,
//             user: currentUser
//         });
//         await newSubscription.save();
//         console.log(`Sent subscription: ${newSubscription._id}`);
//     const { workflowRunId } = await upstashClient.trigger({
//       url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
//       body: {
//         subscriptionId: newSubscription.id,
//       },
//       headers: {
//         'content-type': 'application/json',
//       },
//       retries: 0,
//     })

//     res.status(201).json({ success: true, data: { newSubscription, workflowRunId } });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating subscription', error: error.message });
        
//     }
// };
// export const updateSubscription = async (req, res, next) => {
//     try {
//         const subscriptionId =req.params.id;
//         const subscription = await Subscription.findAndUpdate(subscriptionId,req.body,{new:true});
//         if (!subscription) {
//             return res.status(404).json({ message: 'Subscription not found' });
//         }
//         res.status(200).json({
//             message: 'Subscription updated successfully',
//             subscription
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating subscription', error: error.message });
        
//     }
// };
// export const deleteSubscription = async(req, res, next) => {
//     const subscriptionId = req.params.id;
//     const subscription =Subscription.findByIdAndDelete(subscriptionId);
//     if (!subscription) {
//         return res.status(404).json({ message: 'Subscription not found' });
//     }
//     res.status(200).json({
//         message: 'Subscription deleted successfully',
//         subscription
//     });
// };
// export const getSubscriptionByUserId = async (req, res, next) => {
//     try {
//         const userId =req.params.id;
//         const subscribtions=await Subscription.find({user: userId});
//         if (subscribtions.length === 0) {
//             return res.status(404).json({ message: 'No subscriptions found for this user' });
//         }
//         res.status(200).json(subscribtions);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching subscription by user ID', error: error.message });
        
//     }
// }
// export const cancelSubscription = async (req,res,next) => {
//     try {
//         const subscriptionId = req.params.id;
//         const subscription = await Subscription.findAndUpdate(subscriptionId,{status: 'cancelled'}, {new: true});
//         if (!subscription) {
//             return res.status(404).json({ message: 'Subscription not found' });
//         }
//         res.status(200).json({
//             message: 'Subscription cancelled successfully',
//             subscription: subscription
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error cancelling subscription', error: error.message });
        
//     }
// }
// export const renewupcomingSubscriptions = async (req, res, next) => {
//     try {
//         const userId = req.params.id;
//         const today = new Date();
//         const weekFromNow = new Date();
//         weekFromNow.setDate(today.getDate()+7);
//         const subscriptions = await Subscription.find({user:userId , renewalDate: { $gte: today ,$lte:weekFromNow }, status: 'active' });
//         if (subscriptions.length === 0) {
//             return res.status(404).json({ message: 'No upcoming subscriptions found for renewal' });
//         }

//         return res.status(200).json({
//             message: 'Upcoming subscriptions found for renewal',
//             subscriptions: subscriptions.map(sub => ({
//                 id: sub._id,
//                 name: sub.name,
//                 frequency: sub.frequency,
//                 amount: sub.amount,
//                 renewalDate: sub.renewalDate,
//                 status: sub.status
//             }))
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error finding renewing upcoming subscriptions', error: error.message });

//     }
// }
import Subscription from '../models/subscription.model.js';
import { upstashClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        if (subscriptions.length === 0) {
            return res.status(404).json({ message: 'No subscriptions found' });
        }
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
    }
};

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscriptionId = req.params.id;
        const subscription = await Subscription.findById(subscriptionId);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json(subscription);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscription', error: error.message });
    }
};

export const createSubscription = async (req, res, next) => {
    try {
        const { name, frequency, price, paymentMethod, currency, category, status } = req.body;
        const currentUser = req.user._id;
        const renewalInterval = frequency === 'monthly' ? new Date(new Date().setMonth(new Date().getMonth() + 1)) : frequency === 'weekly' ? new Date(new Date().setDate(new Date().getDate() + 7)) : frequency === 'daily' ? new Date(new Date().setDate(new Date().getDate() + 1)) : null;
        const newSubscription = new Subscription({
            name,
            frequency,
            price,
            paymentMethod,
            status,
            currency,
            category,
            renewalDate: renewalInterval,
            user: currentUser
        });
        await newSubscription.save();
        console.log(`Sent subscription: ${newSubscription._id}`);

        const { workflowRunId } = await upstashClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: newSubscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        });

        res.status(201).json({ success: true, data: { newSubscription, workflowRunId } });
    } catch (error) {
        res.status(500).json({ message: 'Error creating subscription', error: error.message });
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const subscriptionId = req.params.id;
        const subscription = await Subscription.findByIdAndUpdate(subscriptionId, req.body, { new: true });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({
            message: 'Subscription updated successfully',
            subscription
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating subscription', error: error.message });
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscriptionId = req.params.id;
        const subscription = await Subscription.findByIdAndDelete(subscriptionId);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({
            message: 'Subscription deleted successfully',
            subscription
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subscription', error: error.message });
    }
};

export const getSubscriptionByUserId = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const subscriptions = await Subscription.find({ user: userId });
        if (subscriptions.length === 0) {
            return res.status(404).json({ message: 'No subscriptions found for this user' });
        }
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscription by user ID', error: error.message });
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscriptionId = req.params.id;
        const subscription = await Subscription.findByIdAndUpdate(subscriptionId, { status: 'cancelled' }, { new: true });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({
            message: 'Subscription cancelled successfully',
            subscription
        });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling subscription', error: error.message });
    }
};

export const renewUpcomingSubscriptions = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const today = new Date();
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        const subscriptions = await Subscription.find({ user: userId, renewalDate: { $gte: today, $lte: weekFromNow }, status: 'active' });
        if (subscriptions.length === 0) {
            return res.status(404).json({ message: 'No upcoming subscriptions found for renewal' });
        }

        return res.status(200).json({
            message: 'Upcoming subscriptions found for renewal',
            subscriptions: subscriptions.map(sub => ({
                id: sub._id,
                name: sub.name,
                frequency: sub.frequency,
                amount: sub.price,
                renewalDate: sub.renewalDate,
                status: sub.status
            }))
        });
    } catch (error) {
        res.status(500).json({ message: 'Error finding renewing upcoming subscriptions', error: error.message });
    }
};