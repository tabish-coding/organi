"use client";

import { sendMessage } from "@/app/(store)/actions/sendMessage";
import { useActionState } from "react";

export default function ContactForm() {
  const [state, formAction] = useActionState(sendMessage, {
    success: false,
    errors: {
      name: undefined,
      email: undefined,
      message: undefined,
    },
    error: undefined,
  });

  return (
    <div className="contact-form spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="contact__form__title">
              <h2>Leave Message</h2>
            </div>
          </div>
        </div>
        <form action={formAction}>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <input type="text" name="name" placeholder="Your name" />
              {state?.errors?.name && (
                <p style={{ color: "red" }}>{state.errors.name}</p>
              )}
            </div>
            <div className="col-lg-6 col-md-6">
              <input type="text" name="email" placeholder="Your Email" />
              {state?.errors?.email && (
                <p style={{ color: "red" }}>{state.errors.email}</p>
              )}
            </div>
            <div className="col-lg-12 text-center">
              <textarea name="message" placeholder="Your message"></textarea>
              {state?.errors?.message && (
                <p style={{ color: "red" }}>{state.errors.message}</p>
              )}
              <button type="submit" className="site-btn">
                SEND MESSAGE
              </button>
              {state.success && (
                <p style={{ color: "green" }}>Message sent successfully!</p>
              )}
              {state.error && <p style={{ color: "red" }}>{state.error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
