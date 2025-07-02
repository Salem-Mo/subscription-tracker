// import dayjs from "dayjs";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const { serve } = require("@upstash/workflow/express");
// import { sendReminderEmail } from "../utils/sendMail.js";
// import Subscription from "../models/subscription.model.js";
// const REMINDER = [7, 3, 1];

// export const sendReminder = serve(async (context) => {
//     const subscriptionId = context.requestPayload;
//     console.log(`Received Context:`, context.requestPayload);

//     const subscription = await fetchSubscription(context, subscriptionId);
//     console.log("Processing subscription reminder for:", subscriptionId);

//     if (!subscription || subscription.status !== "active") return;

//     const renewalDate = dayjs(subscription.renewalDate);

//     if (renewalDate.isBefore(dayjs())) {
//         console.log(
//             "Renewal date has passed for subscription:",
//             subscriptionId
//         );
//         return;
//     }

//     for (const daysBefore of REMINDER) {
//         const reminderDate = renewalDate.subtract(daysBefore, "day");

//         if (reminderDate.isAfter(dayjs())) {
//             await sleepUntilReminder(
//                 context,
//                 `Reminder ${daysBefore} days before`,
//                 reminderDate
//             );
//             console.log(
//                 `Sleeping until ${daysBefore} days before renewal at ${reminderDate}`
//             );
//             await triggerReminder(
//                 context,
//                 `${daysBefore} days before reminder`,
//                 subscription
//             );
//         }
//     }
// });

// const fetchSubscription = async (context, subscriptionId) => {
//     return await context.run("getSubscription", async () => {
//         const subscription = await Subscription.findById(
//             subscriptionId
//         ).populate("user", "name email");
//         return subscription;
//     });
// };

// const sleepUntilReminder = async (context, label, date) => {
//     console.log(`Sleeping until ${label} reminder at ${date}`);
//     await context.sleepUntil(label, date.toDate());
// };

// const triggerReminder = async (context, label, subscription) => {
//     return await context.run(label, async () => {
//         await sendReminderEmail({
//             to: subscription.user.email,
//             type: label,
//             subscription,
//         });
//     });
// };
import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import { sendReminderEmail } from "../utils/sendMail.js";
import Subscription from "../models/subscription.model.js";
const REMINDER = [7, 3, 1];

export const sendReminder = serve(async (context) => {
    const subscriptionId = context.requestPayload;
    console.log(`Received Context:`, context.requestPayload);

    const subscription = await fetchSubscription(context, subscriptionId);
    console.log("Processing subscription reminder for:", subscriptionId);

    if (!subscription || subscription.status !== "active") {
        console.log("Subscription is not active or not found:", subscriptionId);
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log("Renewal date has passed for subscription:", subscriptionId);
        return;
    }

    for (const daysBefore of REMINDER) {
        const reminderDate = renewalDate.subtract(daysBefore, "day");

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(
                context,
                `Reminder ${daysBefore} days before`,
                reminderDate
            );
            console.log(
                `Sleeping until ${daysBefore} days before renewal at ${reminderDate}`
            );
            await triggerReminder(
                context,
                `${daysBefore} days before reminder`,
                subscription
            );
        }
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("getSubscription", async () => {
        const subscription = await Subscription.findById(
            subscriptionId
        ).populate("user", "name email");
        return subscription;
    });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription,
        });
    });
};