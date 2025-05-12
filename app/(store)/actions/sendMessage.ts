"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});

export async function sendMessage(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = formSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Organi Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.TO_EMAIL,
    subject: `Message from ${parsed.data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f8f8;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <h2 style="color: #4CAF50; text-align: center;">New Message from Organi Contact Form</h2>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p><strong>Name:</strong> ${parsed.data.name}</p>
          <p><strong>Email:</strong> ${parsed.data.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f1f1f1; padding: 15px; border-radius: 5px; white-space: pre-wrap; margin-top: 10px;">
            ${parsed.data.message}
          </div>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          <p style="font-size: 12px; color: #888888; text-align: center;">This message was sent via the contact form on your Organi website.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to send email" };
  }
}
