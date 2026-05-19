'use client';

import { useState } from 'react';

export default function Home() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[var(--dark-bg)] text-[var(--text-primary)] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(77,20,140,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(77,20,140,0.14)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
        <div className="absolute -top-40 left-20 w-[500px] h-[500px] rounded-full bg-[var(--navy)]/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--red)]/14 blur-[140px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--dark-bg)]/90 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-3 no-underline group">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[var(--navy)] to-[var(--red)] flex items-center justify-center shadow-[0_0_30px_rgba(255,102,0,0.25)]">
              <span className="text-white font-black text-xl">◆</span>
            </div>
            <div>
              <div className="font-display text-xl font-extrabold text-white leading-none">
                Discreet Vault
              </div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--red)] font-bold">
                Logistics
              </div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {[
              ['About Us', '/about'],
              ['Services', '/services'],
              ['Security', '/security'],
              ['Process', '/process'],
              ['Payment', '/payment'],
              ['Contact', '/contact'],
            ].map(([item, href]) => (
              <a
                key={item}
                href={href}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--red)] no-underline transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--red)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="/track" className="btn btn-secondary hidden sm:inline-flex no-underline">
              Track Package
            </a>
            <a href="/quote" className="btn btn-primary no-underline">
              Request Quote
            </a>
          </div>
        </div>
      </header>

      <section className="relative min-h-[92vh] flex items-center py-24 lg:py-32">
        <div className="container relative z-10 w-full">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-20 items-center">
            <div className="space-y-10">
              <div className="badge badge-navy inline-block">
                Private Tracking • Secure Custody • Verified Delivery
              </div>

              <div className="space-y-6">
                <h1 className="max-w-5xl leading-[1.15] tracking-tight">
                  Secure logistics for
                  <br />
                  high-value deliveries.
                  <br />
                  <span className="bg-gradient-to-r from-[var(--red)] via-[var(--red-light)] to-[var(--red)] bg-clip-text text-transparent">
                    Built for discretion.
                  </span>
                </h1>

                <p className="text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed">
                  Discreet Vault Logistics gives clients a private, professional way
                  to monitor sensitive shipments, verify custody milestones, and
                  request secure delivery support with complete peace of mind.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="/track" className="btn btn-primary no-underline text-lg px-9 py-4">
                  Track Package Now →
                </a>
                <a href="/quote" className="btn btn-outline no-underline text-lg px-9 py-4">
                  Request Secure Quote
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl">
                {[
                  { value: '24/7', label: 'Visibility', icon: '👁️' },
                  { value: '100%', label: 'Custody Logs', icon: '🔐' },
                  { value: 'Secure', label: 'Workflow', icon: '✓' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)]/50 backdrop-blur p-4 hover:border-[var(--red)] transition-all duration-300"
                  >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="font-display text-xl font-extrabold text-white">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[32px] bg-gradient-to-br from-[var(--navy)]/30 via-transparent to-[var(--red)]/20 blur-3xl" />

              <div className="relative rounded-[28px] border border-[var(--border)] bg-[rgba(15,20,25,0.95)] backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-[var(--navy)] via-[var(--red)] to-[var(--navy)]" />

                <div className="relative p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-2">Secure Tracking Console</h3>
                      <p className="text-sm text-[var(--text-muted)]">Shipment DV-9042-LA</p>
                    </div>
                    <span className="badge badge-success text-xs">Live</span>
                  </div>

                  <div className="space-y-5">
                    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--black)]/40">
                      <img
                        src="/discreet-vault-truck-premium-purple-orange.png"
                        alt="Premium Discreet Vault Logistics delivery truck"
                        className="h-auto w-full object-cover"
                      />
                    </div>

                    <HeroLogisticsVisual />
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--black)]/40 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-muted)] font-medium">Current Status</span>
                      <span className="badge badge-red text-xs font-bold">In Secure Transit</span>
                    </div>

                    <div className="space-y-2">
                      <div className="h-2.5 rounded-full bg-[var(--border)] overflow-hidden">
                        <div className="h-full w-[68%] bg-gradient-to-r from-[var(--navy)] via-[var(--red)] to-[var(--red-light)]" />
                      </div>
                      <div className="flex justify-between text-xs text-[var(--text-muted)]">
                        <span>Origin</span>
                        <span>Destination</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {[
                        { label: 'ETA', value: 'Today' },
                        { label: 'Route', value: 'LA' },
                        { label: 'Alerts', value: '0' },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl bg-[var(--dark-bg)]/60 border border-[var(--border)] p-3">
                          <div className="text-xs text-[var(--text-muted)] mb-1">{item.label}</div>
                          <div className="font-bold text-white text-sm">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-[var(--border)] pt-6">
                    {[
                      ['Shipment created', 'Verified by operations'],
                      ['Custody accepted', 'Secure handling confirmed'],
                      ['In transit', 'Live route visibility active'],
                    ].map(([title, text], i) => (
                      <div key={title} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-3.5 w-3.5 rounded-full border-2 bg-[var(--red)] border-[var(--red)] shadow-[0_0_18px_rgba(255,102,0,0.65)]" />
                          {i < 2 && <div className="h-10 w-px bg-[var(--border)] mt-2" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{title}</div>
                          <div className="text-xs text-[var(--text-muted)]">{text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-20 rounded-[28px] border border-[var(--red)]/40 bg-gradient-to-r from-[var(--card-bg)]/60 via-[var(--card-bg)]/40 to-[rgba(255,102,0,0.10)] p-8 md:p-12 shadow-[0_0_60px_rgba(255,102,0,0.12)] overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div className="space-y-4">
                <div className="text-sm uppercase tracking-[0.22em] text-[var(--red-light)] font-bold">
                  Looking for a shipment?
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black leading-tight">
                  Track your package in the secure portal.
                </h2>
                <p className="text-[var(--text-secondary)] mb-0 text-lg">
                  Use your tracking reference to view shipment status, custody updates,
                  delivery progress, and important alerts instantly.
                </p>
              </div>

              <a href="/track" className="btn btn-primary no-underline text-lg px-10 py-5 whitespace-nowrap">
                Open Portal →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-gradient-to-r from-[var(--navy)]/8 via-transparent to-[var(--red)]/8">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ['Encrypted', 'Client Access', '🔒'],
              ['Verified', 'Custody Chain', '✓'],
              ['Secure', 'Delivery Workflow', '🛡️'],
              ['Private', 'Status Updates', '📧'],
            ].map(([label, value, icon]) => (
              <div key={label} className="text-center space-y-3">
                <div className="text-4xl">{icon}</div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-[var(--red)]">{label}</div>
                  <div className="text-sm text-[var(--text-secondary)]">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <div className="badge badge-red mb-4">Core Services</div>
            <h2 className="text-5xl md:text-6xl mb-6">
              Built for sensitive, private, high-value logistics.
            </h2>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              A clean logistics experience for clients who need clear tracking,
              professional handling, and verified shipment milestones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['01', 'Secure Package Tracking', 'A dedicated tracking portal for shipment status, custody events, and delivery progress.', '📦'],
              ['02', 'Discreet Delivery Support', 'Professional logistics workflow focused on privacy, reliability, and controlled communication.', '🤝'],
              ['03', 'Verified Custody Updates', 'Milestone-based shipment records that help clients see where the delivery stands.', '✓'],
            ].map(([num, title, text, icon], i) => (
              <div
                key={title}
                className="group relative"
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {hoveredService === i && (
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[var(--red)]/20 to-transparent blur-2xl" />
                )}

                <div className="relative card border-[var(--border)] hover:border-[var(--red)]/60 transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl font-display font-black bg-gradient-to-br from-[var(--red)] to-[var(--red-light)] bg-clip-text text-transparent">
                      {num}
                    </div>
                    <div className="text-4xl">{icon}</div>
                  </div>
                  <h4 className="font-display text-2xl font-bold mb-3 text-white">
                    {title}
                  </h4>
                  <p className="text-[var(--text-secondary)] mb-0 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="section bg-gradient-to-b from-[var(--black)]/20 to-transparent border-y border-[var(--border)]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="badge badge-navy">Security First</div>
              <h2 className="text-5xl md:text-6xl font-display font-black leading-tight">
                Private shipment visibility without unnecessary exposure.
              </h2>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                Discreet Vault keeps the client experience simple: request service,
                receive a tracking reference, and monitor key delivery milestones
                from a dedicated tracking page.
              </p>
            </div>

            <div className="card border-[var(--navy)]/50 bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/50">
              {[
                ['Clear client tracking entry point', '🔑'],
                ['Status-first shipment layout', '📊'],
                ['Custody chain presentation', '⛓️'],
                ['Alert-ready delivery interface', '🚨'],
              ].map(([item, icon]) => (
                <div key={item} className="flex items-center gap-4 py-5 border-b border-[var(--border)] last:border-b-0">
                  <span className="text-2xl">{icon}</span>
                  <span className="font-semibold text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="badge badge-red mb-4">Simple Process</div>
            <h2 className="text-5xl md:text-6xl mb-6">Request. Verify. Track.</h2>
            <p className="text-xl text-[var(--text-secondary)]">
              The tracking system gets its own dedicated portal so clients can
              find shipment updates instantly with complete clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              ['01', 'Request Service', 'Submit shipment details through the quote page with full info.', '📝'],
              ['02', 'Receive Tracking', 'A private tracking reference is assigned immediately.', '🎟️'],
              ['03', 'Monitor Delivery', 'Client opens the tracking portal for live updates.', '👁️'],
            ].map(([num, title, text, icon]) => (
              <div key={title} className="relative card text-center border-[var(--border)]">
                <div className="text-6xl font-display font-black bg-gradient-to-br from-[var(--red)] to-[var(--red-light)] bg-clip-text text-transparent mb-4">
                  {num}
                </div>
                <div className="text-3xl mb-4">{icon}</div>
                <h4 className="font-display text-2xl font-bold mb-3 text-white">{title}</h4>
                <p className="text-[var(--text-secondary)] mb-0 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="relative rounded-[32px] border border-[var(--border)] bg-gradient-to-br from-[var(--card-bg)] via-[var(--card-bg)]/80 to-[rgba(77,20,140,0.20)] p-12 md:p-16 text-center overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl mb-6">
                Ready to move with confidence?
              </h2>
              <p className="text-xl text-[var(--text-secondary)] mb-10">
                Track an existing package or request secure logistics support.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <a href="/track" className="btn btn-primary no-underline text-lg px-10 py-5">
                  Track Package →
                </a>
                <a href="/quote" className="btn btn-outline no-underline text-lg px-10 py-5">
                  Request Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-12 bg-gradient-to-b from-transparent to-[var(--black)]/40">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[var(--text-muted)] mb-0">
            © 2026 Discreet Vault Logistics. Secure private logistics platform.
          </p>

          <div className="flex gap-8">
            {[
              ['Privacy', '/privacy'],
              ['Terms', '/terms'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <a key={label} href={href} className="text-sm text-[var(--text-muted)] hover:text-[var(--red)] no-underline transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --navy: #4d148c;
          --red: #ff6600;
          --red-light: #ff8c42;
        }
      `}</style>
    </main>
  );
}

function HeroLogisticsVisual() {
  return (
    <div className="relative h-64 rounded-2xl border border-[var(--border)] bg-[#070711] overflow-hidden">
      <svg viewBox="0 0 600 260" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0%" stopColor="#4d148c" />
            <stop offset="55%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ff6600" />
          </linearGradient>
        </defs>

        <path d="M40 190 C150 80, 260 220, 370 110 S520 70, 560 165" fill="none" stroke="url(#route)" strokeWidth="5" strokeLinecap="round" />
        <circle cx="40" cy="190" r="8" fill="#ff6600" />
        <circle cx="300" cy="155" r="8" fill="#8b5cf6" />
        <circle cx="560" cy="165" r="8" fill="#ff6600" />

        <path d="M105 82 L225 52 L205 78 L255 96 L240 110 L190 95 L160 122 L140 116 L165 90 Z" fill="#ffffff" opacity="0.9" />
        <path d="M105 82 L225 52 L205 78 L255 96 L240 110 L190 95 L160 122 L140 116 L165 90 Z" fill="#4d148c" opacity="0.35" />

        <rect x="330" y="150" width="150" height="58" rx="10" fill="#111827" stroke="#8b5cf6" strokeWidth="2" />
        <rect x="470" y="165" width="55" height="43" rx="8" fill="#1f1025" stroke="#ff6600" strokeWidth="2" />
        <rect x="486" y="174" width="24" height="16" rx="3" fill="#4d148c" opacity="0.75" />
        <rect x="352" y="177" width="100" height="5" rx="2" fill="#ff6600" />
        <circle cx="360" cy="218" r="14" fill="#05030b" stroke="#8b5cf6" strokeWidth="5" />
        <circle cx="490" cy="218" r="14" fill="#05030b" stroke="#8b5cf6" strokeWidth="5" />

        <text x="350" y="170" fill="#ffffff" fontSize="16" fontWeight="800">DVL</text>
      </svg>
    </div>
  );
}
