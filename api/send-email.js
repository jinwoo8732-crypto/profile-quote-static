import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, phone, email, total, orderNo } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"프로파일커머스" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `새 견적 접수 - ${orderNo}`,
      html: `
        <h3>새 견적이 접수되었습니다</h3>
        고객명: ${name}<br/>
        연락처: ${phone}<br/>
        이메일: ${email}<br/>
        금액: ${total.toLocaleString()} 원
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error });
  }
}
