
import nodemailer from "nodemailer";

export default async function handler(req,res){
  const {name,phone,email,total,orderNo}=req.body;

  const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
      user:process.env.SMTP_USER,
      pass:process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from:`"프로파일커머스" <${process.env.SMTP_USER}>`,
    to:process.env.SMTP_USER,
    subject:`새 견적 접수 - ${orderNo}`,
    html:`이름:${name}<br>연락처:${phone}<br>이메일:${email}<br>금액:${total}`
  });

  res.status(200).json({success:true});
}
