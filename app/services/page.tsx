export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#05030b] text-white">
      <section className="relative overflow-hidden px-6 py-8 md:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(124,58,237,0.35),transparent_35%),radial-gradient(circle_at_85%_55%,rgba(249,115,22,0.22),transparent_30%)]" />

        <div className="relative z-10 mx-auto mb-12 flex max-w-6xl items-center justify-between">
          <a href="/" className="text-lg font-black tracking-wide text-white">
            Discreet Vault Logistics
          </a>

          <a
            href="/"
            className="rounded-full border border-orange-500/60 px-5 py-2 text-sm font-bold text-orange-400 transition hover:bg-orange-500 hover:text-white"
          >
            ← Back Home
          </a>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-orange-500">
            Logistics Services
          </p>

          <h1 className="mb-6 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Secure delivery services built for{" "}
            <span className="text-purple-500">speed, privacy, and control.</span>
          </h1>

          <p className="mb-14 max-w-2xl text-lg leading-8 text-slate-300">
            Discreet Vault Logistics provides protected shipment coordination,
            tracking visibility, express delivery support, and secure handling
            for clients who need reliability without unnecessary exposure.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Express Delivery", "Fast shipment movement with priority coordination and responsive support."],
              ["Secure Handling", "Private logistics workflows designed to protect sensitive shipment details."],
              ["Live Tracking", "Real-time status visibility with tracking updates from pickup to delivery."],
              ["Client Support", "Direct assistance for delivery questions, shipment holds, and routing updates."],
              ["Route Coordination", "Organized pickup, transit, and delivery planning for smoother movement."],
              ["Custom Logistics", "Flexible support for unique shipment requests and specialized delivery needs."],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-purple-500/25 bg-[#0b0714]/90 p-8 shadow-2xl shadow-purple-950/30"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-700 to-orange-500 text-2xl">
                  ◈
                </div>
                <h2 className="mb-3 text-2xl font-bold">{title}</h2>
                <p className="leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-orange-500/25 bg-gradient-to-r from-purple-950/60 to-orange-950/40 p-8 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-black">
                  Need a custom logistics plan?
                </h2>
                <p className="text-slate-300">
                  Request a quote and our support team will help coordinate the
                  right delivery solution.
                </p>
              </div>

              <div className="flex gap-4 md:justify-end">
                <a
                  href="/quote"
                  className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400"
                >
                  Get Quote
                </a>
                <a
                  href="/contact"
                  className="rounded-full border border-purple-500/60 px-6 py-3 font-bold text-purple-300 transition hover:bg-purple-600 hover:text-white"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
