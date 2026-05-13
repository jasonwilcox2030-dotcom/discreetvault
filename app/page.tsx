'use client';

import { useState } from 'react';

export default function Home() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  return (
    <main className="min-h-screen bg-[var(--dark-bg)] text-[var(--text-primary)] overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════════════════
          ANIMATED BACKGROUND LAYERS
          ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,75,135,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,75,135,0.12)_1px,transparent_1px)] bg-[size:48px_48px] animate-[slide-grid_20s_linear_infinite]" />
        </div>
        
        {/* Floating orbs */}
        <div className="absolute -top-40 left-20 w-[500px] h-[500px] rounded-full bg-[var(--navy)]/15 blur-[120px] animate-[float-slow_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--red)]/10 blur-[140px] animate-[float-reverse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] rounded-full bg-[var(--navy)]/8 blur-[100px]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--dark-bg)]/85 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-3 no-underline group">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[var(--navy)] to-[var(--red)] flex items-center justify-center shadow-[0_0_30px_rgba(0,75,135,0.35)] group-hover:shadow-[0_0_50px_rgba(218,41,28,0.4)] transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-black text-xl group-hover:rotate-12 transition-transform">◆</span>
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

          <nav className="hidden md:flex items-center gap-8">
            {['Services', 'Security', 'Process', 'Contact'].map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--red)] no-underline transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--red)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="/track" className="btn btn-secondary hidden sm:inline-flex no-underline hover:shadow-[0_0_30px_rgba(0,75,135,0.35)]">
              Track Package
            </a>
            <a href="/quote" className="btn btn-primary no-underline hover:shadow-[0_0_30px_rgba(218,41,28,0.4)]">
              Request Quote
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center py-24 lg:py-32">
        <div className="container relative z-10 w-full">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-20 items-center">
            {/* LEFT: Content with breathing room */}
            <div className="space-y-10 animate-fade-in-up">
              <div className="badge badge-navy inline-block animate-slide-in-right" style={{ animationDelay: '100ms' }}>
                Private Tracking • Secure Custody • Verified Delivery
              </div>

              <div className="space-y-6">
                <h1 className="max-w-5xl leading-[1.15] tracking-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  Secure logistics for
                  <br />
                  high-value deliveries.
                  <br />
                  <span className="bg-gradient-to-r from-[var(--red)] via-[var(--red-light)] to-[var(--red)] bg-clip-text text-transparent inline-block animate-pulse">
                    Built for discretion.
                  </span>
                </h1>

                <p className="text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  Discreet Vault Logistics gives clients a private, professional way
                  to monitor sensitive shipments, verify custody milestones, and
                  request secure delivery support with complete peace of mind.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <a href="/track" className="btn btn-primary no-underline text-lg px-9 py-4 hover:shadow-[0_0_40px_rgba(218,41,28,0.5)] hover:scale-105 transition-all duration-300">
                  Track Package Now →
                </a>
                <a href="/quote" className="btn btn-outline no-underline text-lg px-9 py-4 hover:bg-[var(--red)]/20 transition-all duration-300">
                  Request Secure Quote
                </a>
              </div>

              {/* Stats with better visual hierarchy */}
              <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                {[
                  { value: '24/7', label: 'Visibility', icon: '👁️' },
                  { value: '100%', label: 'Custody Logs', icon: '🔐' },
                  { value: 'Secure', label: 'Workflow', icon: '✓' },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="group rounded-xl border border-[var(--border)] bg-[var(--card-bg)]/50 backdrop-blur p-4 hover:border-[var(--red)] hover:bg-[var(--card-bg)]/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(218,41,28,0.15)]"
                    style={{ animationDelay: `${600 + i * 100}ms` }}
                  >
                    <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">{stat.icon}</div>
                    <div className="font-display text-xl font-extrabold text-white group-hover:text-[var(--red)] transition-colors">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Enhanced tracking preview */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="absolute -inset-8 rounded-[32px] bg-gradient-to-br from-[var(--navy)]/30 via-transparent to-[var(--red)]/15 blur-3xl animate-pulse" />

              <div className="relative rounded-[28px] border border-[var(--border)] bg-[rgba(15,20,25,0.95)] backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden hover:border-[var(--red)]/50 transition-all duration-500 group">
                {/* Animated top accent */}
                <div className="h-1.5 bg-gradient-to-r from-transparent via-[var(--red)] to-transparent animate-[pulse_3s_ease-in-out_infinite]" />

                {/* Top right glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[var(--red)]/20 blur-2xl group-hover:bg-[var(--red)]/30 transition-all duration-500" />

                <div className="relative p-8 space-y-8">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-2">Secure Tracking Console</h3>
                      <p className="text-sm text-[var(--text-muted)]">Shipment DV-9042-LA</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="badge badge-success text-xs">Live</span>
                      <div className="h-3 w-3 rounded-full bg-[var(--success)] shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse" />
                    </div>
                  </div>

                  {/* Progress section with enhanced visuals */}
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--black)]/40 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-muted)] font-medium">Current Status</span>
                      <span className="badge badge-red text-xs font-bold">In Secure Transit</span>
                    </div>

                    <div className="space-y-2">
                      <div className="h-2.5 rounded-full bg-[var(--border)] overflow-hidden">
                        <div className="h-full w-[68%] bg-gradient-to-r from-[var(--navy)] via-[var(--red)] to-[var(--red-light)] shadow-[0_0_20px_rgba(218,41,28,0.4)] animate-[slide-progress_3s_ease-in-out_infinite]" />
                      </div>
                      <div className="flex justify-between text-xs text-[var(--text-muted)]">
                        <span>Origin</span>
                        <span>Destination</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {[
                        { label: 'ETA', value: 'Today', icon: '⏱️' },
                        { label: 'Route', value: 'LA', icon: '📍' },
                        { label: 'Alerts', value: '0', icon: '🔔' },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl bg-[var(--dark-bg)]/60 border border-[var(--border)] p-3 hover:border-[var(--red)]/30 transition-colors">
                          <div className="text-lg mb-1">{item.icon}</div>
                          <div className="text-xs text-[var(--text-muted)] mb-1">{item.label}</div>
                          <div className="font-bold text-white text-sm">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline with enhanced visuals */}
                  <div className="space-y-4 border-t border-[var(--border)] pt-6">
                    {[
                      { title: 'Shipment created', text: 'Verified by operations', done: true },
                      { title: 'Custody accepted', text: 'Secure handling confirmed', done: true },
                      { title: 'In transit', text: 'Live route visibility active', done: true },
                    ].map(({ title, text, done }, i) => (
                      <div key={title} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                          <div className={`h-3.5 w-3.5 rounded-full border-2 transition-all ${
                            done
                              ? 'bg-[var(--red)] border-[var(--red)] shadow-[0_0_18px_rgba(218,41,28,0.6)]'
                              : 'border-[var(--border)]'
                          }`} />
                          {i < 2 && <div className="h-10 w-px bg-[var(--border)] mt-2 group-hover:bg-[var(--red)]/30 transition-colors" />}
                        </div>
                        <div className="py-0.5">
                          <div className="text-sm font-bold text-white group-hover:text-[var(--red)] transition-colors">{title}</div>
                          <div className="text-xs text-[var(--text-muted)]">{text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BIG TRACK BAR - Enhanced */}
          <div className="relative mt-20 rounded-[28px] border border-[var(--red)]/40 bg-gradient-to-r from-[var(--card-bg)]/60 via-[var(--card-bg)]/40 to-[rgba(218,41,28,0.1)] p-8 md:p-12 shadow-[0_0_60px_rgba(218,41,28,0.15)] hover:shadow-[0_0_80px_rgba(218,41,28,0.25)] transition-all duration-500 overflow-hidden group animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            {/* Glow effect */}
            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[var(--red)]/15 blur-3xl group-hover:bg-[var(--red)]/25 transition-all duration-500" />

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

              <a href="/track" className="btn btn-primary no-underline text-lg px-10 py-5 whitespace-nowrap hover:shadow-[0_0_40px_rgba(218,41,28,0.5)] hover:scale-110 transition-all duration-300">
                Open Portal →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR - Enhanced */}
      <section className="border-y border-[var(--border)] bg-gradient-to-r from-[var(--navy)]/5 via-transparent to-[var(--red)]/5">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Encrypted', value: 'Client Access', icon: '🔒' },
              { label: 'Verified', value: 'Custody Chain', icon: '✓' },
              { label: 'Secure', value: 'Delivery Workflow', icon: '🛡️' },
              { label: 'Private', value: 'Status Updates', icon: '📧' },
            ].map((item) => (
              <div key={item.label} className="group text-center space-y-3 hover:scale-110 transition-transform duration-300">
                <div className="text-4xl group-hover:scale-150 transition-transform duration-300">{item.icon}</div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-[var(--red)] group-hover:text-[var(--red-light)]">{item.label}</div>
                  <div className="text-sm text-[var(--text-secondary)]">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - Major upgrade */}
      <section id="services" className="section">
        <div className="container">
          <div className="max-w-3xl mb-16 animate-fade-in-up">
            <div className="badge badge-red mb-4">Core Services</div>
            <h2 className="text-5xl md:text-6xl mb-6">Built for sensitive, private, high-value logistics.</h2>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              A clean logistics experience for clients who need clear tracking,
              professional handling, and verified shipment milestones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Secure Package Tracking',
                text: 'A dedicated tracking portal for shipment status, custody events, and delivery progress.',
                icon: '📦',
                color: 'from-[var(--navy)]',
              },
              {
                num: '02',
                title: 'Discreet Delivery Support',
                text: 'Professional logistics workflow focused on privacy, reliability, and controlled communication.',
                icon: '🤝',
                color: 'from-[var(--red)]',
              },
              {
                num: '03',
                title: 'Verified Custody Updates',
                text: 'Milestone-based shipment records that help clients see where the delivery stands.',
                icon: '✓',
                color: 'from-[var(--navy)]',
              },
            ].map((service, i) => (
              <div
                key={service.title}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Hover glow */}
                {hoveredService === i && (
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[var(--red)]/20 to-transparent blur-2xl" />
                )}

                <div className="relative card border-[var(--border)] hover:border-[var(--red)]/60 hover:shadow-[0_20px_60px_rgba(218,41,28,0.2)] transition-all duration-500 group-hover:translate-y-[-8px]">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl font-display font-black bg-gradient-to-br from-[var(--red)]/80 to-[var(--red-light)] bg-clip-text text-transparent group-hover:from-[var(--red)] group-hover:to-[var(--red-light)] transition-all">
                      {service.num}
                    </div>
                    <div className="text-4xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{service.icon}</div>
                  </div>
                  <h4 className="font-display text-2xl font-bold mb-3 text-white group-hover:text-[var(--red)] transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-[var(--text-secondary)] mb-0 leading-relaxed">{service.text}</p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[var(--red)] to-[var(--red-light)] w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section id="security" className="section bg-gradient-to-b from-[var(--black)]/20 to-transparent border-y border-[var(--border)]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div className="space-y-6">
              <div className="badge badge-navy">Security First</div>
              <h2 className="text-5xl md:text-6xl font-display font-black leading-tight">
                Private shipment visibility without unnecessary exposure.
              </h2>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                Discreet Vault keeps the client experience simple: request service,
                receive a tracking reference, and monitor key delivery milestones
                from a dedicated tracking page with peace of mind.
              </p>
            </div>

            <div className="card border-[var(--navy)]/50 bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/50">
              {[
                { item: 'Clear client tracking entry point', icon: '🔑' },
                { item: 'Status-first shipment layout', icon: '📊' },
                { item: 'Custody chain presentation', icon: '⛓️' },
                { item: 'Alert-ready delivery interface', icon: '🚨' },
              ].map(({ item, icon }) => (
                <div key={item} className="flex items-center gap-4 py-5 border-b border-[var(--border)] last:border-b-0 group hover:bg-[var(--navy)]/10 px-4 mx-[-1.25rem] px-[1.25rem] transition-colors rounded">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{icon}</span>
                  <span className="font-semibold text-white group-hover:text-[var(--red)] transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS - Enhanced with visual connectors */}
      <section id="process" className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
            <div className="badge badge-red mb-4">Simple Process</div>
            <h2 className="text-5xl md:text-6xl mb-6">Request. Verify. Track.</h2>
            <p className="text-xl text-[var(--text-secondary)]">
              The homepage stays clean. The tracking system gets its own dedicated
              portal so clients can find it instantly with complete clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines - desktop only */}
            <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-1 bg-gradient-to-r from-transparent via-[var(--red)]/30 to-transparent" />

            {[
              { num: '01', title: 'Request Service', text: 'Submit shipment details through the quote page with full info.', icon: '📝' },
              { num: '02', title: 'Receive Tracking', text: 'A private tracking reference is assigned immediately.', icon: '🎟️' },
              { num: '03', title: 'Monitor Delivery', text: 'Client opens the tracking portal for live updates.', icon: '👁️' },
            ].map(({ num, title, text, icon }, i) => (
              <div
                key={title}
                className="relative animate-fade-in-up group"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Card glow */}
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[var(--red)]/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative card text-center border-[var(--border)] hover:border-[var(--red)]/60 transition-all duration-500 group-hover:translate-y-[-8px]">
                  {/* Top accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-gradient-to-r from-[var(--red)] to-[var(--red-light)] group-hover:w-full transition-all duration-500" />

                  <div className="text-6xl font-display font-black bg-gradient-to-br from-[var(--red)] to-[var(--red-light)] bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                    {num}
                  </div>

                  <div className="text-3xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all">{icon}</div>

                  <h4 className="font-display text-2xl font-bold mb-3 text-white group-hover:text-[var(--red)] transition-colors">
                    {title}
                  </h4>
                  <p className="text-[var(--text-secondary)] mb-0 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - Maximum impact */}
      <section id="contact" className="section">
        <div className="container">
          <div className="relative rounded-[32px] border border-[var(--border)] bg-gradient-to-br from-[var(--card-bg)] via-[var(--card-bg)]/80 to-[rgba(0,75,135,0.2)] p-12 md:p-16 text-center overflow-hidden group animate-fade-in-up hover:border-[var(--red)]/60 transition-all duration-500">
            {/* Multiple glow layers */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-[var(--red)]/20 blur-3xl group-hover:bg-[var(--red)]/30 transition-all duration-500" />
            <div className="absolute -bottom-40 right-10 h-60 w-60 rounded-full bg-[var(--navy)]/15 blur-3xl group-hover:bg-[var(--navy)]/25 transition-all duration-500" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl mb-6 group-hover:text-[var(--red)] transition-colors">
                Ready to move with confidence?
              </h2>
              <p className="text-xl text-[var(--text-secondary)] mb-10">
                Track an existing package or request secure logistics support.
                Everything you need to manage high-value deliveries.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <a
                  href="/track"
                  className="btn btn-primary no-underline text-lg px-10 py-5 hover:shadow-[0_0_50px_rgba(218,41,28,0.5)] hover:scale-110 transition-all duration-300"
                >
                  Track Package →
                </a>
                <a
                  href="/quote"
                  className="btn btn-outline no-underline text-lg px-10 py-5 hover:bg-[var(--red)]/20 hover:border-[var(--red)] transition-all duration-300"
                >
                  Request Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] py-12 bg-gradient-to-b from-transparent to-[var(--black)]/40">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[var(--text-muted)] mb-0">
            © 2026 Discreet Vault Logistics. Secure private logistics platform.
          </p>

          <div className="flex gap-8">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--red)] no-underline transition-colors relative group"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--red)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes slide-grid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(48px, 48px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(60px); }
        }

        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-40px); }
        }

        @keyframes slide-progress {
          0%, 100% { width: 68%; }
          50% { width: 75%; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }

        .animate-slide-grid {
          animation: slide-grid 20s linear infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
