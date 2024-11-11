import 'dotenv/config'
import sgMail, { MailDataRequired } from "@sendgrid/mail";

const sendgridApiKey = process.env.SENDGRID_API_KEY;
if (!sendgridApiKey)
    throw new Error("Missing Sendgrid API key")

sgMail.setApiKey(sendgridApiKey);

async function sendEmail(email: MailDataRequired){
    await sgMail.send(email);
}

export {
    sendEmail
}