import nodemailer from "nodemailer";

export default async function handler(req,res){

  try{

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: "새 견적 접수",
      text: `내용:\n${req.body.items}\n\n총액:${req.body.total}`
    });

    res.status(200).json({success:true});

  }catch(error){
    console.error(error);
    res.status(500).json({error:error.message});
  }

}
