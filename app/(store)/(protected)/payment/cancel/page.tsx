"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function CancelPage() {
  useEffect(() => {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

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
        backgroundColor: "#fff5f5",
        color: "#c53030",
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
        Payment Cancelled
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Your payment was cancelled. Please try again if this was a mistake.
      </p>
      <Link
        href="/shopping-cart"
        style={{
          backgroundColor: "#e53e3e",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Return to Cart
      </Link>
    </div>
  );
}
