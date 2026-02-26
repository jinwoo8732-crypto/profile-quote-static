import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
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
      to: process.env.SMTP_USER,   // 관리자에게 발송
      subject: `📩 새 견적 접수 - ${orderNo}`,
      html: `
        <h2>새 견적이 접수되었습니다</h2>
        <p><strong>주문번호:</strong> ${orderNo}</p>
        <p><strong>고객명:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>총 금액:</strong> ${total.toLocaleString()} 원</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("메일 오류:", error);
    return res.status(500).json({ error: error.message });
  }
}
