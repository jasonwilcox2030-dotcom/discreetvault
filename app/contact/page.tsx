export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#020604] text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Contact Discreet Vault Logistics
          </p>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            Secure logistics support, built for fast response.
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Need shipment support, tracking help, delivery coordination, or a custom logistics request?
            Contact our support team and we’ll respond as quickly as possible.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-500/20 bg-[#07110d] p-8 shadow-2xl shadow-emerald-950/40">
            <h2 className="mb-6 text-2xl font-semibold">Contact Details</h2>

            <div className="space-y-5 text-slate-300">
              <div>
                <p className="text-sm uppercase tracking-widest text-emerald-400">Email</p>
                <p className="mt-1 text-lg text-white">support@discreetvaultlogistics.us</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-emerald-400">Phone</p>
                <p className="mt-1 text-lg text-white">+1 (305) 928-6753</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-emerald-400">Support</p>
                <p className="mt-1 text-lg text-white">24/7 shipment assistance</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#07110d] p-8">
            <h2 className="mb-6 text-2xl font-semibold">Send a Request</h2>

            <form className="space-y-4">
              <input className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-emerald-400" placeholder="Full name" />
              <input className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-emerald-400" placeholder="Email address" />
              <input className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-emerald-400" placeholder="Phone number" />
              <input className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-emerald-400" placeholder="Shipment reference number" />
              <textarea className="min-h-36 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-emerald-400" placeholder="How can we help?" />

              <button
                type="button"
                className="w-full rounded-xl bg-emerald-400 px-6 py-4 font-bold text-black transition hover:bg-emerald-300"
              >
                Submit Request
              </button>

              <p className="text-sm text-slate-400">
                Form connection will be activated in the next step.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
