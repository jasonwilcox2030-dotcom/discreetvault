export default function ProcessPage() {
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
            Shipment Process
          </p>

          <h1 className="mb-6 max-w-5xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            A streamlined logistics process built for{" "}
            <span className="text-purple-500">
              speed, security, and visibility.
            </span>
          </h1>

          <p className="mb-14 max-w-3xl text-lg leading-8 text-slate-300">
            From quote requests to final delivery confirmation, our logistics
            workflow is structured to keep shipments moving securely and
            efficiently at every stage.
          </p>

          <div className="relative mb-20 overflow-hidden rounded-[2rem] border border-purple-500/20 bg-[#0b0714]/90 p-10 shadow-2xl shadow-purple-950/30">
            <div className="absolute right-[-80px] top-10 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
            <div className="absolute bottom-[-100px] left-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-10 flex items-center justify-between">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-500 to-purple-500" />
              </div>

              <div className="grid gap-8 md:grid-cols-5">
                {[
                  [
                    "1",
                    "Quote Request",
                    "Client submits shipment request and delivery details.",
                  ],
                  [
                    "2",
                    "Pickup Coordination",
                    "Pickup scheduling and route planning are confirmed.",
                  ],
                  [
                    "3",
                    "Secure Transit",
                    "Shipment moves through protected logistics channels.",
                  ],
                  [
                    "4",
                    "Live Tracking",
                    "Real-time updates and shipment visibility are maintained.",
                  ],
                  [
                    "5",
                    "Final Delivery",
                    "Shipment arrives and delivery confirmation is completed.",
                  ],
                ].map(([step, title, text]) => (
                  <div key={step} className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-purple-600 text-xl font-black shadow-lg shadow-purple-900/40">
                      {step}
                    </div>

                    <h2 className="mb-3 text-xl font-black">{title}</h2>

                    <p className="leading-7 text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-purple-500/20 bg-[#0b0714]/90 p-8 shadow-2xl shadow-purple-950/20">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
                Operational Workflow
              </p>

              <h2 className="mb-5 text-3xl font-black">
                Logistics coordination with real-time visibility.
              </h2>

              <p className="mb-8 leading-8 text-slate-300">
                Every shipment is monitored through a structured logistics
                workflow designed for secure handling, route visibility, and
                efficient delivery coordination.
              </p>

              <div className="space-y-4">
                {[
                  "Protected shipment handling",
                  "Real-time delivery visibility",
                  "Dedicated logistics support",
                  "Reliable routing coordination",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-black">
                      ✓
                    </div>

                    <p className="text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-purple-500/20 bg-[#0b0714]/90 p-10 shadow-2xl shadow-purple-950/30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,58,237,0.20),transparent_40%)]" />

              <div className="relative flex h-[360px] items-center justify-center">
                <div className="absolute bottom-20 left-10 h-[6px] w-[80%] rounded-full bg-gradient-to-r from-orange-500 to-purple-500 opacity-70" />

                <div className="absolute bottom-28 left-16 h-28 w-64 rounded-3xl border border-purple-500/30 bg-[#121826] shadow-[0_0_50px_rgba(124,58,237,0.25)]" />

                <div className="absolute bottom-36 left-52 h-20 w-32 rounded-2xl border border-orange-500/30 bg-[#ff8a00]" />

                <div className="absolute bottom-16 left-24 h-14 w-14 rounded-full border-[5px] border-[#2d3748] bg-black" />

                <div className="absolute bottom-16 left-64 h-14 w-14 rounded-full border-[5px] border-[#2d3748] bg-black" />

                <div className="absolute top-10 left-10 rounded-full border border-purple-500/20 bg-black/30 px-5 py-3 text-sm uppercase tracking-[0.2em] text-purple-300">
                  Live Transit
                </div>

                <div className="absolute right-8 top-20 rounded-2xl border border-orange-500/20 bg-black/30 px-6 py-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-orange-400">
                    Shipment Status
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    In Transit
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-orange-500/20 bg-gradient-to-r from-purple-950/50 to-orange-950/30 p-8 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-black">
                  Ready to move your shipment?
                </h2>

                <p className="text-slate-300">
                  Request a quote or contact our logistics support team for
                  shipment coordination assistance.
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
                  Contact Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
