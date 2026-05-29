"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

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
      await emailjs.send(
        "service_xqz8z2d",
        "template_9kwne0t",
        {
          from_name: `${form.firstName} ${form.lastName}`,
          from_email: form.email,
          message: form.message,
        },
        "h_9HXkvVv0HUqhAaz"
      );
      setStatus("success");
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
            src="/On-Repeat_Splash-Logo.svg"
            alt="On Repeat"
            style={{ width: "100%", maxWidth: "525px", objectFit: "contain" }}
          />
          <img
            src="/on-repeat-splash-2.jpg"
            alt="On Repeat Splash"
            style={{
              width: "100%",
              maxWidth: "900px",
              objectFit: "contain",
              borderBottom: "2px solid rgba(255, 255, 255, 0.25)",
            }}
          />
          <h2
            style={{
              marginTop: "48px",
              fontFamily: "inherit",
              fontSize: "1.5rem",
              letterSpacing: "0.25em",
              lineHeight: "1.2",
              color: "#333333",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            COLLECTIBLE HAND CREAMS
          </h2>
          <button
            onClick={() => setOpen(true)}
            style={{
              marginTop: "24px",
              backgroundColor: "#333333",
              color: "#dbada0",
              fontFamily: "inherit",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              fontWeight: 500,
              border: "none",
              borderRadius: "999px",
              padding: "14px 32px",
              cursor: "pointer",
            }}
          >
            SIGN UP FOR DROPS
          </button>

          {/* Product description */}
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              marginTop: "64px",
            }}
          >
            <h1
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 500,
                lineHeight: 1.2,
                color: "#333333",
                marginBottom: "32px",
                letterSpacing: "-0.01em",
              }}
            >
              Meet the hand cream you&apos;ll actually want to use on repeat
            </h1>

            <p style={bodyTextStyle}>
              ON REPEAT Hand Cream is a fast-absorbing, deeply nourishing formula designed to soften, smooth, and restore dry hands without ever feeling greasy. Powered by a skin-loving blend of jojoba oil, squalane, shea butter, glycerin, panthenol, and ceramides, it delivers long-lasting hydration while helping support the skin barrier for healthier-looking hands over time.
            </p>

            <p style={bodyTextStyle}>
              The texture is rich but weightless — melting seamlessly into skin for a silky, velvety finish that leaves hands feeling moisturized, not sticky. Whether tossed in your bag, kept on your nightstand, or used between meetings, workouts, flights, and coffee runs, ON REPEAT is made for everyday rituals and constant reapplication.
            </p>

            <p style={bodyTextStyle}>
              Thoughtfully formulated with effective, barrier-supporting ingredients and without the heavy feel of traditional hand creams, it&apos;s luxury hand care reimagined for modern life.
            </p>

            <h3 style={subheadStyle}>
              Hydrating. Smoothing. Addictive in the best way.
            </h3>

            <div style={{ marginBottom: "40px" }}>
              <p
                style={{
                  fontFamily: "inherit",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  color: "#333333",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                }}
              >
                Key Ingredients
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "Jojoba Oil + Squalane — help nourish and soften skin",
                  "Shea Butter — delivers rich moisture and comfort",
                  "Glycerin + Panthenol — attract and retain hydration",
                  "Ceramides — help support and strengthen the skin barrier",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "inherit",
                      fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                      lineHeight: 1.6,
                      color: "#333333",
                      paddingLeft: "20px",
                      position: "relative",
                    }}
                  >
                    <span style={{ position: "absolute", left: 0 }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <h3 style={subheadStyle}>
              For hands that deserve better than basic.
            </h3>
          </div>
        </div>
      </main>

      {open && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "transparent",
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
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              borderRadius: "16px",
              padding: "48px",
              width: "100%",
              maxWidth: "520px",
              position: "relative",
            }}
          >
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
                  fontFamily: "inherit",
                  color: "#333",
                  padding: "24px 0",
                }}
              >
                <p style={{ fontSize: "1.5rem", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "12px" }}>
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
                    fontFamily: "inherit",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    color: "#333",
                    fontWeight: 500,
                    marginBottom: "8px",
                  }}
                >
                  SIGN UP FOR DROPS
                </p>

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
                  <p style={{ fontFamily: "inherit", fontSize: "0.8rem", color: "#c00" }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    backgroundColor: "#333",
                    color: "#dbada0",
                    fontFamily: "inherit",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    fontWeight: 500,
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

      <footer
        style={{
          width: "100%",
          padding: "24px 48px",
          textAlign: "center",
          backgroundColor: "#dbada0",
        }}
      >
        <p
          style={{
            fontFamily: "inherit",
            fontSize: "0.7rem",
            letterSpacing: "0.08em",
            color: "#333333",
            opacity: 0.6,
          }}
        >
          &copy;2026 On Repeat Beauty, Inc. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "inherit",
  fontSize: "0.75rem",
  letterSpacing: "0.05em",
  color: "#555",
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  fontFamily: "inherit",
  fontSize: "0.9rem",
  color: "#333",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px 14px",
  outline: "none",
  width: "100%",
};

const bodyTextStyle: React.CSSProperties = {
  fontFamily: "inherit",
  fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
  lineHeight: 1.75,
  color: "#333333",
  marginBottom: "24px",
};

const subheadStyle: React.CSSProperties = {
  fontFamily: "inherit",
  fontSize: "clamp(1rem, 2vw, 1.2rem)",
  fontWeight: 500,
  color: "#333333",
  marginBottom: "32px",
  marginTop: "8px",
  letterSpacing: "0.02em",
};
