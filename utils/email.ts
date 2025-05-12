import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Only for testing, remove in production
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const mailOptions = {
    from: `"${process.env.SITE_NAME || "Website"} Contact Form" <${
      process.env.EMAIL_FROM
    }>`,
    to: process.env.EMAIL_TO,
    subject: `[Contact Form] ${subject}`,
    html,
    text: html.replace(/<[^>]*>/g, ""), // Plain text version
    headers: {
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
      Importance: "High",
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
}
