"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
    clearCart();

    return () => {
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0fff4",
        color: "#2f855a",
        textAlign: "center",
        padding: "2rem",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Payment Successful
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Thank you! Your payment has been processed successfully.
      </p>
      <Link
        href="/"
        style={{
          backgroundColor: "#38a169",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Go back to Home
      </Link>
    </div>
  );
}
