export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #06070a, #0f1720, #140b1f)",
        color: "white",
        padding: "60px 24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <a
          href="/"
          style={{
            display: "inline-block",
            marginBottom: "40px",
            color: "#ff8a00",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          ← Back to Home
        </a>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#9b5cff",
                textTransform: "uppercase",
                letterSpacing: "3px",
                fontSize: "13px",
                marginBottom: "18px",
                fontWeight: "bold",
              }}
            >
              About Discreet Vault Logistics
            </p>

            <h1
              style={{
                fontSize: "64px",
                lineHeight: "1",
                marginBottom: "24px",
                fontWeight: "bold",
              }}
            >
              Secure transport built for modern logistics.
            </h1>

            <p
              style={{
                color: "#b6bec9",
                fontSize: "18px",
                lineHeight: "1.8",
                marginBottom: "40px",
              }}
            >
              Discreet Vault Logistics provides secure shipment coordination,
              private transportation support, real-time package visibility,
              and enterprise-grade delivery operations across major routes.
              Our platform combines live tracking technology with modern
              logistics infrastructure to deliver fast, secure, and reliable
              shipment experiences.
            </p>

            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="/quote"
                style={{
                  background: "#ff8a00",
                  color: "black",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Request Quote
              </a>

              <a
                href="/contact"
                style={{
                  border: "1px solid #9b5cff",
                  color: "white",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Contact Team
              </a>
            </div>
          </div>

          <div>
            <div
              style={{
                background:
                  "linear-gradient(145deg, rgba(155,92,255,0.15), rgba(255,138,0,0.12))",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "28px",
                padding: "40px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "260px",
                  borderRadius: "20px",
                  background:
                    "linear-gradient(to right, #1f2937, #111827)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "220px",
                    height: "80px",
                    background: "#121826",
                    borderRadius: "16px",
                    bottom: "40px",
                    left: "80px",
                    boxShadow: "0 0 40px rgba(155,92,255,0.25)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    width: "120px",
                    height: "60px",
                    background: "#ff8a00",
                    borderRadius: "12px",
                    bottom: "60px",
                    left: "220px",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    width: "48px",
                    height: "48px",
                    background: "#0a0a0a",
                    borderRadius: "50%",
                    bottom: "18px",
                    left: "120px",
                    border: "4px solid #2f3542",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    width: "48px",
                    height: "48px",
                    background: "#0a0a0a",
                    borderRadius: "50%",
                    bottom: "18px",
                    left: "280px",
                    border: "4px solid #2f3542",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    color: "#9b5cff",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  DISCREET VAULT
                </div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at center, rgba(155,92,255,0.15), transparent 60%)",
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: "30px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    padding: "20px",
                    borderRadius: "18px",
                  }}
                >
                  <h3
                    style={{
                      color: "#ff8a00",
                      marginBottom: "10px",
                    }}
                  >
                    Real-Time Tracking
                  </h3>

                  <p
                    style={{
                      color: "#c5cdd8",
                      lineHeight: "1.7",
                    }}
                  >
                    Advanced shipment visibility with live status updates.
                  </p>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    padding: "20px",
                    borderRadius: "18px",
                  }}
                >
                  <h3
                    style={{
                      color: "#9b5cff",
                      marginBottom: "10px",
                    }}
                  >
                    Secure Operations
                  </h3>

                  <p
                    style={{
                      color: "#c5cdd8",
                      lineHeight: "1.7",
                    }}
                  >
                    Enterprise-grade logistics workflow and transport security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
