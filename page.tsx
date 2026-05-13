"use client";

import { useState } from "react";

const SC: Record<string, { stage: number; emoji: string; desc: string; label: string }> = {
  "Booked": { stage: 0, emoji: "📋", desc: "Vault booked & sealed", label: "Booked" },
  "Picked Up": { stage: 1, emoji: "📦", desc: "Picked up by verified operator", label: "Picked up" },
  "In Transit": { stage: 2, emoji: "🚚", desc: "In transit — sealed and tracked", label: "In transit" },
  "On Hold": { stage: 3, emoji: "⏸️", desc: "Held for verification", label: "On hold" },
  "Out for Delivery": { stage: 4, emoji: "🏃", desc: "Out for final delivery", label: "Out for delivery" },
  "Delivered": { stage: 5, emoji: "✅", desc: "Delivered to vault — biometric handoff complete", label: "Delivered" },
};

const DEMO_DATA: Record<string, any> = {
  "VLT-7281-A4F9": {
    status: "In Transit",
    from: "New York, NY",
    to: "Los Angeles, CA",
    service: "Premium Vault",
    sender: "Confidential",
    receiver: "Authorized recipient",
    weight: "2.5 kg",
    eta: "May 12, 2026",
    tracking: "VLT-7281-A4F9",
    sha: "a4f9...82c1",
    history: [
      { status: "Booked", loc: "New York", time: "May 8, 9:15 AM", desc: "Sealed at origin" },
      { status: "Picked Up", loc: "New York", time: "May 8, 2:30 PM", desc: "Operator verified" },
      { status: "In Transit", loc: "Chicago hub", time: "May 11, 8:00 AM", desc: "Live signal · sealed" },
    ],
  },
  "VLT-9912-04B7": {
    status: "On Hold",
    from: "London, UK",
    to: "Frankfurt, DE",
    service: "Premium Vault",
    sender: "Confidential",
    receiver: "Authorized recipient",
    weight: "1.8 kg",
    eta: "May 14, 2026",
    tracking: "VLT-9912-04B7",
    sha: "9b3d...41a7",
    history: [
      { status: "Booked", loc: "London", time: "May 10, 11:00 AM", desc: "" },
      { status: "Picked Up", loc: "London", time: "May 10, 3:45 PM", desc: "" },
      { status: "In Transit", loc: "EU corridor", time: "May 11, 7:00 AM", desc: "" },
      { status: "On Hold", loc: "Frankfurt vault facility", time: "2 hr ago", desc: "Recipient verification required" },
    ],
  },
  "VLT-5503-D8E2": {
    status: "Delivered",
    from: "Geneva, CH",
    to: "Zurich, CH",
    service: "Black Vault",
    sender: "Confidential",
    receiver: "Authorized recipient",
    weight: "0.6 kg",
    eta: "May 7, 2026",
    tracking: "VLT-5503-D8E2",
    sha: "d8e2...f01c",
    history: [
      { status: "Booked", loc: "Geneva", time: "May 6, 7:00 AM", desc: "" },
      { status: "Picked Up", loc: "Geneva", time: "May 6, 9:30 AM", desc: "" },
      { status: "In Transit", loc: "Alpine corridor", time: "May 6, 1:00 PM", desc: "" },
      { status: "Out for Delivery", loc: "Zurich", time: "May 7, 8:00 AM", desc: "" },
      { status: "Delivered", loc: "Zurich vault", time: "May 7, 11:30 AM", desc: "Biometric handoff complete" },
    ],
  },
};

export default function Home() {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState<any>(null);
  const [error, setError] = useState(false);

  const handleTrack = () => {
    setError(false);
    const id = trackingId.trim().toUpperCase();
    if (!id) return;
    if (DEMO_DATA[id]) {
      setShipment(DEMO_DATA[id]);
      window.scrollTo({ top: document.getElementById("dashboard")?.offsetTop || 0, behavior: "smooth" });
    } else {
      setError(true);
      setShipment(null);
    }
  };

  const tryExample = (id: string) => {
    setTrackingId(id);
    setTimeout(() => {
      setShipment(DEMO_DATA[id]);
      setError(false);
      window.scrollTo({ top: document.getElementById("dashboard")?.offsetTop || 0, behavior: "smooth" });
    }, 50);
  };

  const currentStage = shipment ? SC[shipment.status]?.stage ?? 0 : 2;

  return (
    <main>
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
            </div>
            <span className="logo-name">Discreet Vault</span>
          </div>
          <nav className="nav">
            <a href="#services">Services</a>
            <a href="#security">Security</a>
            <a href="#dashboard">Track</a>
            <a href="#pricing">Pricing</a>
            <a href="#clients">Clients</a>
          </nav>
        </div>
        <div className="header-right">
          <div className="encrypted-badge">
            <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Encrypted</span>
          </div>
          <button className="btn btn-ghost">Sign in</button>
          <button className="btn btn-primary">Request quote →</button>
        </div>
      </header>

      {/* TRACK BAR */}
      <div className="track-bar">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          className="track-input"
          type="text"
          placeholder="Track your shipment — vault ID or reference number"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTrack()}
        />
        <span className="track-status">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          End-to-end encrypted
        </span>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          SOC 2 certified · Chain of custody verified
        </div>
        <h1>Secure. Silent.<br /><span className="accent">Delivered.</span></h1>
        <p>Premium logistics for high-value cargo and confidential shipments. Discretion at every checkpoint, visibility only for you.</p>
        <div className="hero-cta">
          <button className="btn-lg btn-primary" onClick={() => tryExample("VLT-7281-A4F9")}>Request a vault →</button>
          <button className="btn-lg btn-outline">How it works</button>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="trusted" id="clients">
        <div className="trusted-label">Trusted by discreet operators worldwide</div>
        <div className="trusted-logos">
          <span className="trusted-logo">Aurum & Co.</span>
          <span className="trusted-logo">Helix Holdings</span>
          <span className="trusted-logo">Meridian Trust</span>
          <span className="trusted-logo">Onyx Group</span>
          <span className="trusted-logo">Sterling House</span>
          <span className="trusted-logo">Vanguard Estates</span>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="section" id="dashboard">
        <div className="section-header">
          <div className="section-eyebrow">Vault tracking</div>
          <h2>Real-time visibility, total discretion.</h2>
          <p>Every shipment, every checkpoint, every signal — encrypted and visible only to you.</p>
        </div>

        {error && (
          <div style={{ textAlign: "center", padding: "16px", background: "#fee2e2", color: "#b91c1c", borderRadius: 10, marginBottom: 20, fontSize: 13 }}>
            ❌ Vault ID not found. Try one of the demo IDs below.
          </div>
        )}

        {!shipment && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            <button className="btn btn-outline" onClick={() => tryExample("VLT-7281-A4F9")}>Try VLT-7281-A4F9</button>
            <button className="btn btn-outline" onClick={() => tryExample("VLT-9912-04B7")}>Try VLT-9912-04B7 (On Hold)</button>
            <button className="btn btn-outline" onClick={() => tryExample("VLT-5503-D8E2")}>Try VLT-5503-D8E2 (Delivered)</button>
          </div>
        )}

        <div className="dashboard">
          <div className="kpi-grid">
            <div className="kpi"><div className="kpi-label">Active vaults</div><div className="kpi-value">247</div></div>
            <div className="kpi"><div className="kpi-label">On time</div><div className="kpi-value success">99.4%</div></div>
            <div className="kpi"><div className="kpi-label">On hold</div><div className="kpi-value warning">5</div></div>
            <div className="kpi"><div className="kpi-label">Sealed</div><div className="kpi-value">98</div></div>
            <div className="kpi"><div className="kpi-label">Delivered</div><div className="kpi-value">1,842</div></div>
          </div>

          <div className="tracking-grid">
            <div className="card">
              <div className="card-header">
                <span className="card-title">{shipment?.tracking || "VLT-7281-A4F9"}</span>
                <span className="card-status">Live · Sealed</span>
              </div>
              <svg className="route-map" viewBox="0 0 380 180">
                <rect width="380" height="180" fill="#EEF2F7" rx="4"/>
                <path d="M 0 50 Q 80 30 160 60 T 380 40" stroke="#C5D5E5" strokeWidth="0.5" fill="none"/>
                <path d="M 0 100 Q 100 80 200 110 T 380 90" stroke="#C5D5E5" strokeWidth="0.5" fill="none"/>
                <path d="M 50 150 Q 130 80 210 120 T 330 50" stroke="#004B87" strokeWidth="2" fill="none" strokeDasharray="4 3"/>
                <circle cx="50" cy="150" r="5" fill="#047857"/>
                <text x="60" y="154" fontSize="10" fill="#0A1F3D" fontWeight="500">Origin</text>
                <circle cx="210" cy="120" r="6" fill="#DA291C"/>
                <circle cx="210" cy="120" r="11" fill="#DA291C" opacity="0.2">
                  <animate attributeName="r" values="9;15;9" dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <text x="222" y="124" fontSize="10" fill="#0A1F3D" fontWeight="500">Sealed · In transit</text>
                <circle cx="330" cy="50" r="5" fill="#7A8AA0"/>
                <text x="280" y="40" fontSize="10" fill="#0A1F3D" fontWeight="500">Destination</text>
              </svg>
              <div className="encryption-note">SHA: {shipment?.sha || "a4f9...82c1"} · Encrypted</div>
            </div>

            <div className="card">
              <div className="timeline-title">Custody chain</div>
              {[
                { label: "Booked & sealed", meta: shipment?.history?.find((h:any) => h.status === "Booked")?.time || "May 8, 9:15 AM" },
                { label: "Picked up", meta: shipment?.history?.find((h:any) => h.status === "Picked Up")?.time || "May 8, 2:30 PM" },
                { label: "In transit", meta: shipment?.history?.find((h:any) => h.status === "In Transit")?.loc || "Live · sealed" },
                { label: "On hold", meta: shipment?.history?.find((h:any) => h.status === "On Hold")?.desc || "If verification needed", isHold: true },
                { label: "Out for delivery", meta: shipment?.history?.find((h:any) => h.status === "Out for Delivery")?.time || "Pending" },
                { label: "Delivered", meta: shipment?.history?.find((h:any) => h.status === "Delivered")?.desc || "Biometric handoff" },
              ].map((step, i) => {
                const isDone = i < currentStage;
                const isActive = i === currentStage;
                const isLast = i === 5;
                let dotClass = "pending";
                if (isDone) dotClass = "done";
                else if (isActive && step.isHold) dotClass = "hold";
                else if (isActive) dotClass = "active";

                return (
                  <div key={i} className="timeline-item">
                    <div className="timeline-marker">
                      <div className={`timeline-dot ${dotClass}`}>
                        {isDone && <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
                        {isActive && !step.isHold && <svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>}
                        {isActive && step.isHold && <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>}
                      </div>
                      {!isLast && <div className="timeline-line"></div>}
                    </div>
                    <div className="timeline-content">
                      <div className={`timeline-status ${isActive && step.isHold ? "warn" : ""} ${!isDone && !isActive ? "muted" : ""}`}>{step.label}</div>
                      <div className="timeline-meta">{step.meta}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ON HOLD ALERT */}
          <div className="alert-card">
            <div className="alert-header">
              <div className="alert-title">
                <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>VLT-9912-04B7 · On hold</span>
                <span className="alert-tag">Customs</span>
              </div>
              <span className="alert-time">2 hr ago</span>
            </div>
            <div className="alert-desc">Recipient verification required at Frankfurt vault facility.</div>
            <div className="alert-actions">
              <button className="btn-sm btn-primary">Authorize release</button>
              <button className="btn-sm btn-outline">Secure message</button>
            </div>
          </div>

          <div className="custody-bar">
            <div className="custody-bar-left">
              <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <span>Chain of custody · 247 vaults verified</span>
            </div>
            <span className="custody-bar-link">View ledger →</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="security">
        <div className="section-header">
          <h2>Built for what you can&apos;t afford to lose.</h2>
        </div>
        <div className="features">
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3>Sealed vault transport</h3>
            <p>Tamper-evident containers with biometric access logs and 24/7 GPS lockdown.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
            </div>
            <h3>Total discretion</h3>
            <p>No external markings. No public manifests. Tracking visible only to authorized parties.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <h3>Verified chain of custody</h3>
            <p>Cryptographic handoff logs from origin to vault. Immutable, audit-ready.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial-section">
        <div className="testimonial">
          <svg className="quote-icon" viewBox="0 0 24 24"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
          <blockquote>&ldquo;We&apos;ve moved high-value assets across 14 countries with Discreet Vault. Zero leaks, zero losses, zero noise.&rdquo;</blockquote>
          <div className="testimonial-author">
            <div className="author-avatar">MR</div>
            <div className="author-info">
              <div className="author-name">M. Rosenthal</div>
              <div className="author-role">Head of Asset Security · Sterling House</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing">
        <div className="section-header">
          <h2>Service tiers.</h2>
          <p>Every tier ships with end-to-end encryption.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-name">Standard Vault</div>
            <div className="pricing-amount">$299<span className="small">/shipment</span></div>
            <div className="pricing-desc">Sealed transport · 48hr delivery</div>
            <button className="pricing-btn btn-outline">Request quote</button>
          </div>
          <div className="pricing-card featured">
            <div className="pricing-badge">Most requested</div>
            <div className="pricing-name">Premium Vault</div>
            <div className="pricing-amount">$799<span className="small">/shipment</span></div>
            <div className="pricing-desc">24hr · Armed escort · Insured to $1M</div>
            <button className="pricing-btn btn-primary">Request quote</button>
          </div>
          <div className="pricing-card">
            <div className="pricing-name">Black Vault</div>
            <div className="pricing-amount">By invitation</div>
            <div className="pricing-desc">Custom · Diplomatic-tier handling</div>
            <button className="pricing-btn btn-outline">Apply</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>When it has to arrive — <span className="accent">and stay quiet.</span></h2>
        <p>Vetted operators. Sealed routes. Total visibility for you, none for anyone else.</p>
        <div className="cta-buttons">
          <button className="btn-lg btn-light">Request a vault →</button>
          <button className="btn-lg btn-dark-outline">Speak to security</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
              </div>
              <span className="logo-name">Discreet Vault</span>
            </div>
            <p className="footer-brand-tag">Premium logistics for cargo that demands silence and certainty.</p>
            <div className="footer-social">
              <svg viewBox="0 0 24 24"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>Standard Vault</li><li>Premium Vault</li><li>Black Vault</li><li>International</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Security</h4>
            <ul>
              <li>Encryption</li><li>Compliance</li><li>SOC 2 report</li><li>Custody ledger</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>About</li><li>Operators</li><li>Press</li><li>Contact</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li>Privacy</li><li>Terms</li><li>NDA framework</li><li>DPA</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Discreet Vault Logistics. All rights reserved.</div>
          <div className="footer-status">
            <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Encrypted · SOC 2 verified
          </div>
        </div>
      </footer>
    </main>
  );
}
