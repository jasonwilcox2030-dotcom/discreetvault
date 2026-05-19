export default function PaymentPage() {
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
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-orange-500">
            Secure Payment Options
          </p>

          <h1 className="mb-6 max-w-5xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Flexible payment methods for{" "}
            <span className="text-purple-500">secure logistics services.</span>
          </h1>

          <p className="mb-14 max-w-3xl text-lg leading-8 text-slate-300">
            Discreet Vault Logistics accepts multiple payment options for
            shipment services. Contact our payment support team before sending
            any payment so your order can be verified correctly.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Bitcoin / Crypto", "Request the correct wallet details before sending payment."],
              ["Chime", "Fast digital payment support for approved shipment invoices."],
              ["Western Union", "Available for supported transfer-based logistics payments."],
              ["MoneyGram", "Available for approved payment instructions and shipment processing."],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-purple-500/25 bg-[#0b0714]/90 p-7 shadow-2xl shadow-purple-950/20"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-700 to-orange-500 text-2xl">
                  ◈
                </div>

                <h2 className="mb-3 text-xl font-black">{title}</h2>
                <p className="leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-r from-purple-950/50 to-orange-950/30 p-8 md:p-10">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
                Important Payment Notice
              </p>

              <h2 className="mb-5 text-3xl font-black">
                Always confirm payment details first.
              </h2>

              <p className="leading-8 text-slate-300">
                For security, payment instructions may vary depending on the
                shipment type, destination, and invoice status. Please call or
                email our support team before making payment.
              </p>
            </div>

            <div className="rounded-3xl border border-purple-500/25 bg-[#0b0714]/90 p-8 shadow-2xl shadow-purple-950/20">
              <h2 className="mb-4 text-2xl font-black uppercase">
                Contact Payment Support
              </h2>

              <p className="mb-8 leading-7 text-slate-300">
                Use the official contact options below for payment confirmation
                and shipment invoice assistance.
              </p>

              <div className="space-y-5">
                <a
                  href="tel:+13059286753"
                  className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-5 font-bold text-white transition hover:scale-[1.01]"
                >
                  <span>
                    <span className="block text-xl uppercase">Call Support</span>
                    <span className="block text-sm font-normal text-orange-100">
                      +1 (305) 928-6753
                    </span>
                  </span>
                  <span className="text-2xl">→</span>
                </a>

                <a
                  href="mailto:support@discreetvaultlogistics.us"
                  className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-purple-800 to-purple-500 px-6 py-5 font-bold text-white transition hover:scale-[1.01]"
                >
                  <span>
                    <span className="block text-xl uppercase">Email Support</span>
                    <span className="block text-sm font-normal text-purple-100">
                      support@discreetvaultlogistics.us
                    </span>
                  </span>
                  <span className="text-2xl">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-purple-500/20 pt-8">
            <div className="grid gap-6 md:grid-cols-4">
              <div>
                <p className="text-2xl font-black text-orange-400">Verify</p>
                <p className="mt-2 text-slate-400">Confirm payment details first</p>
              </div>

              <div>
                <p className="text-2xl font-black text-orange-400">Pay</p>
                <p className="mt-2 text-slate-400">Use approved instructions only</p>
              </div>

              <div>
                <p className="text-2xl font-black text-orange-400">Confirm</p>
                <p className="mt-2 text-slate-400">Send payment confirmation</p>
              </div>

              <div>
                <p className="text-2xl font-black text-orange-400">Process</p>
                <p className="mt-2 text-slate-400">Shipment moves after verification</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
