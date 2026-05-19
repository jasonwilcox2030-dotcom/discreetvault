export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#05030b] text-white">
      <section className="relative overflow-hidden px-6 py-8 md:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.30),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(249,115,22,0.22),transparent_30%)]" />

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
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-orange-500">
                About Discreet Vault Logistics
              </p>

              <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Secure logistics built for{" "}
                <span className="text-purple-500">privacy, speed, and control.</span>
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Discreet Vault Logistics provides secure shipment coordination,
                protected delivery support, real-time tracking visibility, and
                professional logistics assistance for clients who need reliable
                movement with discretion.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/quote"
                  className="rounded-full bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-400"
                >
                  Request Quote
                </a>

                <a
                  href="/contact"
                  className="rounded-full border border-purple-500/60 px-7 py-4 font-bold text-purple-300 transition hover:bg-purple-600 hover:text-white"
                >
                  Contact Team
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-purple-500/25 bg-[#0b0714]/90 p-4 shadow-2xl shadow-purple-950/40">
              <img
                src="/discreet-vault-truck-premium-purple-orange.png"
                alt="Premium Discreet Vault Logistics delivery truck"
                className="h-auto w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              [
                "Our Mission",
                "To provide secure, reliable, and discreet logistics support with clear communication and tracking visibility.",
              ],
              [
                "Our Process",
                "Every shipment is handled through structured coordination, tracking updates, and verified delivery workflows.",
              ],
              [
                "Our Promise",
                "We focus on privacy, responsiveness, and dependable shipment support from pickup to final delivery.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-purple-500/25 bg-[#0b0714]/90 p-8 shadow-2xl shadow-purple-950/20"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-700 to-orange-500 text-2xl">
                  ◈
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
                  Built for modern secure delivery
                </p>

                <h2 className="mb-4 text-3xl font-black">
                  A private logistics experience with professional support.
                </h2>

                <p className="text-slate-300">
                  Our platform helps clients request quotes, track packages,
                  confirm payment instructions, and contact support from one
                  streamlined logistics website.
                </p>
              </div>

              <div className="flex gap-4 md:justify-end">
                <a
                  href="/track"
                  className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400"
                >
                  Track Package
                </a>

                <a
                  href="/payment"
                  className="rounded-full border border-purple-500/60 px-6 py-3 font-bold text-purple-300 transition hover:bg-purple-600 hover:text-white"
                >
                  Payment Options
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
