export default function ContactPage() {
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
                Contact Discreet Vault Logistics
              </p>

              <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Secure logistics support, built for{" "}
                <span className="text-purple-500">fast response.</span>
              </h1>

              <p className="max-w-xl text-lg leading-8 text-slate-300">
                Need shipment support, tracking help, delivery coordination, or
                a custom logistics request? Contact our support team directly
                and we’ll respond as quickly as possible.
              </p>
            </div>

            <div className="relative min-h-[360px] rounded-[2rem] border border-purple-500/20 bg-[#090612] p-8 shadow-2xl shadow-purple-950/40">
              <div className="absolute left-8 top-8 h-4 w-4 rounded-full bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.9)]" />
              <div className="absolute right-10 top-16 h-5 w-5 rounded-full bg-purple-500 shadow-[0_0_35px_rgba(168,85,247,0.9)]" />
              <div className="absolute bottom-16 left-20 h-3 w-3 rounded-full bg-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.9)]" />

              <div className="absolute left-12 top-20 h-[2px] w-72 rotate-12 bg-gradient-to-r from-purple-600 via-purple-400 to-orange-500 opacity-80" />
              <div className="absolute bottom-24 right-12 h-[2px] w-80 -rotate-12 bg-gradient-to-r from-orange-500 via-purple-500 to-purple-700 opacity-80" />

              <div className="absolute bottom-10 right-10 w-72 rounded-3xl border border-purple-500/30 bg-black/40 p-6">
                <div className="mb-4 h-16 rounded-t-2xl border border-purple-500/40 bg-gradient-to-r from-purple-900 to-black" />
                <div className="flex items-end gap-3">
                  <div className="h-20 flex-1 rounded-xl border border-purple-500/40 bg-[#12091f]" />
                  <div className="h-28 flex-[1.4] rounded-xl border border-orange-500/40 bg-[#160b10]" />
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="h-5 w-5 rounded-full bg-purple-500" />
                  <span className="h-5 w-5 rounded-full bg-purple-500" />
                  <span className="h-5 w-5 rounded-full bg-orange-500" />
                </div>
              </div>

              <div className="absolute left-8 bottom-8">
                <p className="text-sm uppercase tracking-[0.25em] text-orange-500">
                  Live Route
                </p>
                <p className="mt-2 text-2xl font-black">
                  Protected delivery network
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-purple-500/25 bg-[#0b0714]/90 p-8 shadow-2xl shadow-purple-950/40">
              <h2 className="mb-8 text-2xl font-bold uppercase">
                Contact Details
              </h2>

              <div className="space-y-8">
                <div className="flex gap-5 border-b border-white/10 pb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-700 text-2xl">
                    ✉
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                      Email
                    </p>
                    <p className="mt-1 text-white">
                      support@discreetvaultlogistics.us
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 border-b border-white/10 pb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-700 text-2xl">
                    ☎
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                      Phone
                    </p>
                    <p className="mt-1 text-white">+1 (305) 928-6753</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-700 text-2xl">
                    ◷
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                      Support
                    </p>
                    <p className="mt-1 text-white">
                      24/7 shipment assistance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-purple-500/25 bg-[#0b0714]/90 p-8 shadow-2xl shadow-purple-950/40">
              <h2 className="mb-4 text-2xl font-bold uppercase">
                Get in Touch
              </h2>

              <p className="mb-8 leading-7 text-slate-300">
                Reach out to our team directly using the options below. We’re
                ready to help.
              </p>

              <div className="space-y-5">
                <a
                  href="mailto:support@discreetvaultlogistics.us"
                  className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-purple-800 to-purple-500 px-6 py-5 font-bold text-white transition hover:scale-[1.01]"
                >
                  <span>
                    <span className="block text-xl uppercase">Email Us</span>
                    <span className="block text-sm font-normal text-purple-100">
                      support@discreetvaultlogistics.us
                    </span>
                  </span>
                  <span className="text-2xl">→</span>
                </a>

                <a
                  href="tel:+13059286753"
                  className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-5 font-bold text-white transition hover:scale-[1.01]"
                >
                  <span>
                    <span className="block text-xl uppercase">Call Us</span>
                    <span className="block text-sm font-normal text-orange-100">
                      +1 (305) 928-6753
                    </span>
                  </span>
                  <span className="text-2xl">→</span>
                </a>
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-black/30 p-6 text-center">
                <div className="mb-3 text-3xl text-purple-400">▣</div>
                <p className="font-bold">Your privacy is our priority.</p>
                <p className="mt-2 text-sm text-slate-400">
                  All communications are handled with care and discretion.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-t border-purple-500/20 pt-8 sm:grid-cols-4">
            <div>
              <p className="font-bold">Secure Handling</p>
              <p className="mt-1 text-sm text-slate-400">
                Your shipments stay protected.
              </p>
            </div>
            <div>
              <p className="font-bold">Global Network</p>
              <p className="mt-1 text-sm text-slate-400">
                Built for modern logistics.
              </p>
            </div>
            <div>
              <p className="font-bold">On-Time Delivery</p>
              <p className="mt-1 text-sm text-slate-400">
                Focused on fast resolution.
              </p>
            </div>
            <div>
              <p className="font-bold">Expert Support</p>
              <p className="mt-1 text-sm text-slate-400">
                Real people. Real help.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
