"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const closeModal = () => {
    setOpen(false);
    setStatus("idle");
    setForm({ firstName: "", lastName: "", email: "", message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <main
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#dbada0",
          overflowY: "auto",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <div
          style={{
            width: "100%",
            paddingLeft: "48px",
            paddingRight: "48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/on-repeat-logo.png"
            alt="On Repeat"
            style={{ width: "100%", maxWidth: "650px", objectFit: "contain" }}
          />
          <img
            src="/on-repeat-splash.jpg"
            alt="On Repeat Splash"
            style={{
              width: "100%",
              maxWidth: "1200px",
              objectFit: "contain",
              borderBottom: "2px solid rgba(255, 255, 255, 0.25)",
            }}
          />
          <h2
            style={{
              marginTop: "48px",
              fontFamily: "sans-serif",
              fontSize: "1.5rem",
              letterSpacing: "0.25em",
              lineHeight: "2",
              color: "#333333",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            CATCHY HAND CREAMS
          </h2>
          <button
            onClick={() => setOpen(true)}
            style={{
              marginTop: "24px",
              backgroundColor: "#333333",
              color: "#dbada0",
              fontFamily: "sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              fontWeight: 600,
              border: "none",
              borderRadius: "999px",
              padding: "14px 32px",
              cursor: "pointer",
            }}
          >
            SIGN UP FOR DROPS
          </button>
        </div>
      </main>

      {open && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "48px",
              width: "100%",
              maxWidth: "520px",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "20px",
                right: "24px",
                background: "none",
                border: "none",
                fontSize: "1.4rem",
                color: "#333",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            {status === "success" ? (
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  color: "#333",
                  padding: "24px 0",
                }}
              >
                <p style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "12px" }}>
                  YOU&apos;RE ON THE LIST
                </p>
                <p style={{ fontSize: "0.95rem", color: "#666" }}>
                  We&apos;ll be in touch when the drop lands.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <p
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    color: "#333",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  SIGN UP FOR DROPS
                </p>

                {/* Full Name */}
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={labelStyle} htmlFor="first_2">First Name *</label>
                    <input
                      id="first_2"
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={labelStyle} htmlFor="last_2">Last Name *</label>
                    <input
                      id="last_2"
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={labelStyle} htmlFor="input_3">Email Address *</label>
                  <input
                    id="input_3"
                    type="email"
                    required
                    placeholder="example@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={labelStyle} htmlFor="input_4">Your Message *</label>
                  <textarea
                    id="input_4"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, height: "120px", resize: "vertical" }}
                  />
                </div>

                {status === "error" && (
                  <p style={{ fontFamily: "sans-serif", fontSize: "0.8rem", color: "#c00" }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    backgroundColor: "#333",
                    color: "#dbada0",
                    fontFamily: "sans-serif",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "999px",
                    padding: "14px 32px",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    opacity: status === "loading" ? 0.6 : 1,
                    alignSelf: "center",
                  }}
                >
                  {status === "loading" ? "SUBMITTING..." : "SUBMIT"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "sans-serif",
  fontSize: "0.75rem",
  letterSpacing: "0.05em",
  color: "#555",
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  fontFamily: "sans-serif",
  fontSize: "0.9rem",
  color: "#333",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px 14px",
  outline: "none",
  width: "100%",
};
