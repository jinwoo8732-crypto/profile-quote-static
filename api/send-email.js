import nodemailer from "nodemailer";

export default async function handler(req,res){

const transporter=nodemailer.createTransport({
host:"smtp.gmail.com",
port:587,
secure:false,
auth:{
user:process.env.SMTP_USER,
pass:process.env.SMTP_PASS
}
});

await transporter.sendMail({
from:process.env.SMTP_USER,
to:"받을메일주소",
subject:"새 견적 접수",
text:`${req.body.items}\n총액:${req.body.total}`
});

res.status(200).json({success:true});
}
