const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      secureConnection: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      }
    });
    await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text,
    });

    console.log({msg: "email sent"});

  } catch (error) {
    console.log("Error sending email", error);
  }
};
