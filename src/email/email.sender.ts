import * as nodemailer from "nodemailer";
import * as dotenv from 'dotenv'
import emailMessage from '../types/emailMessage'
dotenv.load()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export function sendEmail(data: emailMessage) {
  transporter.sendMail(data, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
    })
}