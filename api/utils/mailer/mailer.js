import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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

export const ADMIN_EMAIL = "randomAdminEmailTest@ccsgp.com"; // fake email

export const sendEmail = async (from, to, subject, mailContent) => {
  const mailOptions = {
    from,
    to,
    subject,
    html: mailContent,
  };

  // transporter.sendMail(mailOptions, (err, info) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   // console.log(info.envelope);
  //   // console.log(info.messageId);
  // });

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};
