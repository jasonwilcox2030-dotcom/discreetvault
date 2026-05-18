export default function QuotePage() {
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
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-orange-500">
                Instant Shipping Quote
              </p>

              <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Request a secure logistics quote in{" "}
                <span className="text-purple-500">minutes.</span>
              </h1>

              <p className="max-w-xl text-lg leading-8 text-slate-300">
                Fast pricing for discreet delivery, protected cargo transport,
                and premium shipment coordination worldwide.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-purple-500/30 bg-white/5 p-5">
                  <div className="mb-3 text-3xl text-purple-400">▣</div>
                  <h3 className="font-bold uppercase">Secure</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Protected shipment handling
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-500/30 bg-white/5 p-5">
                  <div className="mb-3 text-3xl text-purple-400">◷</div>
                  <h3 className="font-bold uppercase">Fast Quotes</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Rapid response times
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-500/30 bg-white/5 p-5">
                  <div className="mb-3 text-3xl text-purple-400">◇</div>
                  <h3 className="font-bold uppercase">Global</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Worldwide logistics network
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-purple-500/20 bg-[#090612] p-8 shadow-2xl shadow-purple-950/40">
              <h2 className="mb-6 text-3xl font-black uppercase">
                Quote Request
              </h2>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-purple-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-purple-500"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-purple-500"
                />

                <input
                  type="text"
                  placeholder="Pickup Location"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-purple-500"
                />

                <input
                  type="text"
                  placeholder="Destination"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-purple-500"
                />

                <select className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-purple-500">
                  <option>Shipment Type</option>
                  <option>Standard Delivery</option>
                  <option>Express Delivery</option>
                  <option>Secure Freight</option>
                  <option>International Cargo</option>
                </select>

                <textarea
                  placeholder="Shipment Details"
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-purple-500"
                />

                <button className="w-full rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-5 text-lg font-black uppercase tracking-wide transition hover:scale-[1.01]">
                  Request Quote
                </button>

                <p className="text-center text-sm text-slate-400">
                  A logistics specialist will contact you shortly.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 border-t border-purple-500/20 pt-8 sm:grid-cols-4">
            <div>
              <p className="font-bold">Secure Handling</p>
              <p className="mt-1 text-sm text-slate-400">
                Protected logistics operations
              </p>
            </div>

            <div>
              <p className="font-bold">Global Network</p>
              <p className="mt-1 text-sm text-slate-400">
                Connected shipping routes
              </p>
            </div>

            <div>
              <p className="font-bold">Fast Response</p>
              <p className="mt-1 text-sm text-slate-400">
                Quick quote turnaround
              </p>
            </div>

            <div>
              <p className="font-bold">Expert Support</p>
              <p className="mt-1 text-sm text-slate-400">
                Dedicated logistics specialists
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
