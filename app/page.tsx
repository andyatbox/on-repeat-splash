export default function Home() {
  return (
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
          style={{ width: "100%", maxWidth: "1200px", objectFit: "contain", borderBottom: "2px solid rgba(255, 255, 255, 0.25)" }}
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
  );
}
