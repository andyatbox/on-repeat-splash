"use client";

import { useState, useEffect, useRef } from "react";

type Status = "idle" | "loading" | "success" | "error";

// ── Scroll-reveal wrapper ──────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { rootMargin: "-10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}s, transform .9s cubic-bezier(.16,1,.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Marquee ingredients ────────────────────────────────────────────────────
const INGREDIENTS: [string, string][] = [
  ["Jojoba Oil + Squalane", "nourish & soften skin"],
  ["Shea Butter", "rich moisture & comfort"],
  ["Glycerin + Panthenol", "attract & retain hydration"],
  ["Ceramides", "strengthen the skin barrier"],
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    }
  };

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav className={`nav${scrolled ? " solid" : ""}`}>
        <img
          src="/images/logotype.png"
          alt="On Repeat"
          className="logo"
          style={{ width: scrolled ? "clamp(130px,16vw,210px)" : "clamp(200px,34vw,500px)" }}
        />
        <a href="#signup" className="pill">Sign up for drops</a>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <header className="hero">
        <div>
          <Reveal className="hero-eyebrow">
            <img src="/images/vinyl.png" className="spin" alt="" aria-hidden="true" />
            <span className="cap">Collectible Hand Cream</span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1>
              The hand cream<br />
              you&apos;ll use<br />
              <em>on repeat.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="hero-lead">
              Like the song you can&apos;t stop playing — the hand cream you&apos;ll reach for again and again.
              Fast-absorbing, rich, and never greasy.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="hero-note">
            <span className="cap">Press play · Reapply · Repeat</span>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="hero-r">
          <div className="prod-stack">
            <img src="/images/prod-hero-1.png" alt="On Repeat hand cream" className="prod-main" />
            <img src="/images/prod-hero-2.png" alt="On Repeat hand cream angled view" className="prod-angle" />
          </div>
        </Reveal>
      </header>

      {/* ── INGREDIENTS TICKER ──────────────────────────────────── */}
      <div className="marquee-section" aria-hidden="true">
        <div className="mq">
          {[...INGREDIENTS, ...INGREDIENTS].map(([name, desc], i) => (
            <span key={i}>
              {name} <i>— {desc}</i>
              <span className="mq-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── LIFESTYLE BANNER ────────────────────────────────────── */}
      <section className="life">
        <img
          src="/images/lifestyle-hero.jpg"
          alt="Golden-hour poolside party, dancing in the sun"
          className="life-img"
        />
        <div className="scrim" />
        <img src="/images/vinyl.png" alt="" aria-hidden="true" className="life-vinyl spin" />
        <div className="life-copy">
          <Reveal>
            <span className="cap">Made for repeated use</span>
            <h2>Made for all your moments.</h2>
          </Reveal>
        </div>
      </section>

      {/* ── STATEMENT ───────────────────────────────────────────── */}
      <section className="stmt">
        <div className="stmt-grid">
          <div>
            <Reveal>
              <h2>Rich, but <span className="u">weightless.</span></h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                It melts in and disappears — silky finish, never greasy. Tossed in a bag or
                left on the nightstand, it&apos;s the one on heavy rotation.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="stmt-r">
            <img src="/images/prod-4.jpg" alt="On Repeat tucked into a bag, in the wild" />
          </Reveal>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────── */}
      <section className="gallery">
        <div className="gal-head">
          <Reveal><h2>In the wild.</h2></Reveal>
          <Reveal delay={0.1}><span className="cap">Palm-sized</span></Reveal>
        </div>
        <div className="gal-grid">
          <Reveal className="g-a">
            <figure><img src="/images/prod-3.jpg" alt="Held in hand against river rocks" /></figure>
          </Reveal>
          <Reveal delay={0.1} className="g-b">
            <figure><img src="/images/prod-1.jpg" alt="On Repeat on a wood board" /></figure>
          </Reveal>
          <Reveal className="g-c">
            <figure><img src="/images/prod-2.jpg" alt="Top view of On Repeat" /></figure>
          </Reveal>
          <Reveal delay={0.1} className="g-d">
            <figure><img src="/images/prod-0.jpg" alt="Held against the sky" /></figure>
          </Reveal>
        </div>
      </section>

      {/* ── FOUR VIBES ──────────────────────────────────────────── */}
      <section className="shades">
        <Reveal><h2>OUR<br /><em>VIBES.</em></h2></Reveal>
        <Reveal delay={0.1}>
          <p className="sub">One little record, four covers. Pick your mood.</p>
        </Reveal>
        <Reveal delay={0.1} className="shades-img">
          <img src="/images/all-products.png" alt="On Repeat in coral, mint, butter and cloud" />
        </Reveal>
        <Reveal delay={0.2} className="shade-names">
          <div><span className="dot" style={{ background: "#F47D6E" }} />Coral</div>
          <div><span className="dot" style={{ background: "#7FD2C4" }} />Mint</div>
          <div><span className="dot" style={{ background: "#EDE08A" }} />Sunset</div>
          <div>
            <span className="dot" style={{ background: "#EDEAE3", outline: "1px solid rgba(33,27,23,.18)" }} />
            Cloud
          </div>
        </Reveal>
      </section>

      {/* ── SIGN UP ─────────────────────────────────────────────── */}
      <section className="signup" id="signup">
        <Reveal>
          <h2>Get on the <em>list.</em></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="sub">Be first to know when On Repeat drops. No spam — just the good stuff.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="su-form" onSubmit={handleSubmit} noValidate>
            <div className="su-row">
              <div className="su-line">
                <input
                  type="text"
                  placeholder="First name"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
              </div>
              <div className="su-line">
                <input
                  type="text"
                  placeholder="Last name"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="su-line">
              <input
                type="email"
                placeholder="Email address"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="su-line">
              <textarea
                placeholder="Your message (optional)"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <div style={{ marginTop: 6, textAlign: "center" }}>
              {status === "success" ? (
                <p className="su-msg">You&apos;re on the list — see you at the drop. ♥</p>
              ) : (
                <>
                  <button type="submit" className="su-submit" disabled={status === "loading"}>
                    {status === "loading" ? "Sending…" : "Notify me"} <span>↗</span>
                  </button>
                  {status === "error" && (
                    <p className="su-msg error">Something went wrong. Please try again.</p>
                  )}
                </>
              )}
            </div>
          </form>
        </Reveal>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="site-footer">
        <img src="/images/vinyl.png" alt="" aria-hidden="true" className="fv spin" />
        <img src="/images/logotype.png" alt="On Repeat" className="fwm" />
        <div className="tag">Hand cream you&apos;ll use on repeat.</div>
        <div className="meta">
          <span>©2026 On Repeat Beauty, Inc. All Rights Reserved.</span>
        </div>
      </footer>
    </>
  );
}
