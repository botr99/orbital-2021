import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// use mailtrap for testing purposes only.
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // allow to send from localhost
  },
});

const sendEmail = (email, content, subject) => {
  const mailOptions = {
    from: "randomAdminEmailTest@ccsgp.com", // fake email
    to: email,
    subject: subject,
    html: content,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    console.log(info.envelope);
    console.log(info.messageId);
  });
};

export const sendPostJobConfirmationEmail = (email, content) =>
  sendEmail(email, content, "Job successfully created");

export const sendApproveJobEmail = (email, content) =>
  sendEmail(email, content, "Job is now public");

export const sendRejectJobEmail = (email, content) =>
  sendEmail(email, content, "Job is taken down");

export const sendRegisterConfirmationEmail = (email, content) =>
  sendEmail(email, content, "Registered interest for a job");

export const sendUnregisterConfirmationEmail = (email, content) =>
  sendEmail(email, content, "Unregistered interest for a job");
