import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const sender = process.env.NODEMAILER_USER;
const pass = process.env.NODEMAILER_PASS;

export const transport = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 465,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const mailOptions = {
  from: email,
};
