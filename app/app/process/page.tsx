export default function ProcessPage() {
  const steps = [
    ["01", "Request Quote", "Submit shipment details so our team can review pickup, destination, timing, and handling needs."],
    ["02", "Confirm Details", "We verify the route, service level, delivery window, and any special shipment requirements."],
    ["03", "Secure Pickup", "Your shipment is coordinated for pickup with careful handling and status visibility."],
    ["04", "In Transit", "Track movement updates while the shipment moves through the delivery process."],
    ["05", "Final Delivery", "Delivery is completed with confirmation and support available if follow-up is needed."],
  ];

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
                Our Process
              </p>

              <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">
                A secure delivery process built for{" "}
                <span className="text-purple-500">clarity and control.</span>
              </h1>

              <p className="max-w-xl text-lg leading-8 text-slate-300">
                From quote request to final delivery, our process keeps shipment
                support simple, private, and easy to follow.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/quote"
                  className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400"
                >
                  Get a Quote
                </a>

                <a
                  href="/track"
                  className="rounded-full border border-purple-500/60 px-6 py-3 font-bold text-purple-300 transition hover:bg-purple-600 hover:text-white"
                >
                  Track Shipment
                </a>
              </div>
            </div>

            <div className="relative min-h-[340px] rounded-[2rem] border border-purple-500/20 bg-[#090612] p-8 shadow-2xl shadow-purple-950/40">
              <div className="absolute left-8 top-8 h-4 w-4 rounded-full bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.9)]" />
              <div className="absolute right-12 top-16 h-5 w-5 rounded-full bg-purple-500 shadow-[0_0_35px_rgba(168,85,247,0.9)]" />
              <div className="absolute bottom-24 left-16 h-3 w-3 rounded-full bg-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.9)]" />

              <div className="absolute left-12 top-24 h-[2px] w-72 rotate-12 bg-gradient-to-r from-purple-600 via-purple-400 to-orange-500 opacity-80" />
              <div className="absolute bottom-28 right-12 h-[2px] w-80 -rotate-12 bg-gradient-to-r from-orange-500 via-purple-500 to-purple-700 opacity-80" />

              <div className="absolute bottom-12 right-8 w-72">
                <div className="relative h-40">
                  <div className="absolute bottom-10 left-8 h-20 w-44 rounded-xl border border-purple-500/50 bg-[#111827] shadow-[0_0_35px_rgba(124,58,237,0.35)]" />
                  <div className="absolute bottom-10 left-44 h-16 w-20 rounded-r-2xl border border-orange-500/50 bg-[#1b1020]" />
                  <div className="absolute bottom-20 left-52 h-8 w-10 rounded-md bg-purple-500/30" />
                  <div className="absolute bottom-16 left-14 h-2 w-36 rounded-full bg-orange-500" />
                  <div className="absolute bottom-4 left-16 h-12 w-12 rounded-full border-4 border-purple-500 bg-black" />
                  <div className="absolute bottom-4 left-48 h-12 w-12 rounded-full border-4 border-purple-500 bg-black" />
                  <div className="absolute bottom-8 left-20 h-4 w-4 rounded-full bg-orange-500" />
                  <div className="absolute bottom-8 left-52 h-4 w-4 rounded-full bg-orange-500" />
                </div>
              </div>

              <div className="absolute left-8 bottom-8">
                <p className="text-sm uppercase tracking-[0.25em] text-orange-500">
                  Secure Route
                </p>
                <p className="mt-2 text-2xl font-black">
                  Pickup → Transit → Delivery
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-5">
            {steps.map(([num, title, text]) => (
              <div
                key={num}
                className="grid gap-5 rounded-3xl border border-purple-500/20 bg-[#0b0714]/90 p-6 shadow-2xl shadow-purple-950/20 md:grid-cols-[90px_1fr]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-700 to-orange-500 text-xl font-black">
                  {num}
                </div>

                <div>
                  <h2 className="mb-2 text-2xl font-black">{title}</h2>
                  <p className="leading-7 text-slate-300">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-orange-500/25 bg-gradient-to-r from-purple-950/60 to-orange-950/40 p-8 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-black">
                  Ready to start a shipment?
                </h2>
                <p className="text-slate-300">
                  Request a quote or contact support to begin your delivery
                  coordination.
                </p>
              </div>

              <div className="flex gap-4 md:justify-end">
                <a
                  href="/quote"
                  className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400"
                >
                  Request Quote
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
        </div>
      </section>
    </main>
  );
}
