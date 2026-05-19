export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#05030b] text-white">
      <section className="relative overflow-hidden px-6 py-8 md:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.30),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(249,115,22,0.20),transparent_30%)]" />

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
            Security & Protection
          </p>

          <h1 className="mb-6 max-w-5xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Logistics security designed for{" "}
            <span className="text-purple-500">
              protected shipment movement.
            </span>
          </h1>

          <p className="mb-14 max-w-3xl text-lg leading-8 text-slate-300">
            Our operations prioritize controlled handling, tracking visibility,
            shipment integrity, and secure coordination throughout every stage
            of transit.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              [
                "Real-Time Monitoring",
                "Shipments are actively monitored throughout transit with live status visibility and route tracking.",
              ],
              [
                "Protected Handling",
                "Sensitive shipments are processed using controlled handling procedures and secure routing workflows.",
              ],
              [
                "Verified Delivery",
                "Delivery confirmation systems help ensure shipments arrive at the correct destination safely.",
              ],
              [
                "Encrypted Systems",
                "Operational systems and logistics data are managed through protected digital infrastructure.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-purple-500/20 bg-[#0b0714]/90 p-8 shadow-2xl shadow-purple-950/20"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-700 to-orange-500 text-2xl">
                  🔒
                </div>

                <h2 className="mb-3 text-2xl font-black">{title}</h2>

                <p className="leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-orange-500/20 bg-gradient-to-r from-purple-950/50 to-orange-950/30 p-8 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
                  Trusted Logistics Infrastructure
                </p>

                <h2 className="mb-4 text-3xl font-black">
                  Shipment security remains our operational priority.
                </h2>

                <p className="text-slate-300">
                  From pickup coordination to delivery confirmation, our
                  logistics workflow is structured for reliability and shipment
                  protection.
                </p>
              </div>

              <div className="flex gap-4 md:justify-end">
                <a
                  href="/track"
                  className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400"
                >
                  Track Shipment
                </a>

                <a
                  href="/contact"
                  className="rounded-full border border-purple-500/60 px-6 py-3 font-bold text-purple-300 transition hover:bg-purple-600 hover:text-white"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <div className="grid gap-6 md:grid-cols-4">
              <div>
                <p className="text-3xl font-black text-orange-400">24/7</p>
                <p className="mt-2 text-slate-400">Shipment monitoring</p>
              </div>

              <div>
                <p className="text-3xl font-black text-orange-400">100%</p>
                <p className="mt-2 text-slate-400">Secure handling workflow</p>
              </div>

              <div>
                <p className="text-3xl font-black text-orange-400">Global</p>
                <p className="mt-2 text-slate-400">Protected routing network</p>
              </div>

              <div>
                <p className="text-3xl font-black text-orange-400">Live</p>
                <p className="mt-2 text-slate-400">Tracking visibility</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
