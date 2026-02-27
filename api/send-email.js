import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {

    const { items, total } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // 본인에게 받기
      subject: "📩 새 견적 접수",
      html: `
        <h2>새 견적이 접수되었습니다</h2>
        <p><strong>내용:</strong></p>
        <p>${items}</p>
        <p><strong>총액:</strong> ${total} 원</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("메일 오류:", error);
    return res.status(500).json({ error: error.message });
  }
}
