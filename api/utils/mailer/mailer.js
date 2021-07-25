import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const ADMIN_EMAIL = "ccsgptest@gmail.com";

// // use mailtrap for testing purposes only.
// const transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: process.env.MAILTRAP_USER,
//     pass: process.env.MAILTRAP_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false, // allow to send from localhost
//   },
// });
let transporter;
// Sends actual email to the email address provided to login and the email address listed in the create-job-form,
// so a PERSONAL email address should be used
if (process.env.NODE_ENV === "production") {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // allow to send from localhost
    },
  });
} else {
  // Use mailtrap
  transporter = nodemailer.createTransport({
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
}

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
