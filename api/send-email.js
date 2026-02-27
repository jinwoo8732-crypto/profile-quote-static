import nodemailer from "nodemailer";

export default async function handler(req,res){

try{

const transporter=nodemailer.createTransport({
service:"gmail",
auth:{
user:process.env.SMTP_USER,
pass:process.env.SMTP_PASS
}
});

await transporter.sendMail({
from:process.env.SMTP_USER,
to:process.env.SMTP_USER,
subject:"새 견적 접수",
html:`
<h2>새 견적 접수</h2>
<p>이름: ${req.body.name}</p>
<p>전화번호: ${req.body.phone}</p>
<p>이메일: ${req.body.email}</p>
<p>주소: ${req.body.address}</p>
<hr>
<p>${req.body.items}</p>
<p>총액: ${req.body.total} 원</p>
`
});

res.status(200).json({success:true});

}catch(err){
console.error(err);
res.status(500).json({error:err.message});
}
}
