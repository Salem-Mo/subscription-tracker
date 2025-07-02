// import dayjs from "dayjs";
// import {emailTemplates} from "./mail.templete.js";
// import { SERVER_URL ,SMTP_USER} from "../config/env.js";
// import transporter from "../config/nodemailer.js";
// export const sendReminderEmail = async (to, type, subscription) => {
//   try {
//     const template = emailTemplates.find(
//       (template) => template.label === subscription.type
//     );
//     if (!template) {
//       throw new Error("Email template not found");
//     }

//     const mailInfo = {
//       userName: subscription.user.name,
//       subscriptionName: subscription.name,
//       renewalDate: dayjs(subscription.renewalDate).format("YYYY-MM-DD"),
//       planName: subscription.category,
//       price: `${subscription.plan.price} ${subscription.currency} / ${subscription.frequency}`,
//       paymentMethod: subscription.paymentMethod,
//       accountSettingsLink: `${SERVER_URL}/account/settings`,
//       supportLink: `${SERVER_URL}/support`,
//     };

//     const message = template.generateBody(mailInfo);
//     const subject = template.generateSubject(mailInfo);
//     const mailOptions = {
//       from: SMTP_USER,
//       to: to,
//       subject: subject,
//       html: message,
//     };
//     await transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return console.error("Error sending email:", error);
//       }
//       console.log("Message sent: %s", info.messageId);
//     });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return;
    
//   }
// };
import dayjs from "dayjs";
import { emailTemplates } from "./mail.templete.js";
import { SERVER_URL, SMTP_USER } from "../config/env.js";
import transporter from "../config/nodemailer.js";

export const sendReminderEmail = async (to, type, subscription) => {
  try {
    const template = emailTemplates.find(
      (template) => template.label === type
    );
    if (!template) {
      throw new Error("Email template not found");
    }

    const mailInfo = {
      userName: subscription.user.name,
      subscriptionName: subscription.name,
      renewalDate: dayjs(subscription.renewalDate).format("YYYY-MM-DD"),
      planName: subscription.category,
      price: `${subscription.price} ${subscription.currency} / ${subscription.frequency}`,
      paymentMethod: subscription.paymentMethod,
      accountSettingsLink: `${SERVER_URL}/account/settings`,
      supportLink: `${SERVER_URL}/support`,
    };

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);
    const mailOptions = {
      from: SMTP_USER,
      to: to,
      subject: subject,
      html: message,
    };

    console.log(`Sending reminder email to: ${to}`);
    console.log(`Email subject: ${subject}`);
    console.log(`Email body: ${message}`);

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error("Error sending email:", error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return;
  }
};