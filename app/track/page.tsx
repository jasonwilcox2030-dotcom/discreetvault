'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Shipment {
  id: string;
  tracking_number: string;
  stage: number;
  sender_name: string;
  sender_email: string;
  sender_phone: string;
  sender_street: string;
  from_city: string;
  from_state: string;
  from_zip: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  to_street: string;
  to_city: string;
  to_state: string;
  to_zip: string;
  current_city: string;
  current_state: string;
  current_x: number;
  current_y: number;
  on_hold: boolean;
  on_hold_reason: string;
  service: string;
  weight: string;
  expected_delivery: string;
  created_at: string;
}

export default function TrackPage() {
  const [tracking, setTracking] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tracking.trim()) return;
    setLoading(true);
    setError('');
    try {
      const { data, error: fetchError } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', tracking.toUpperCase().trim())
        .single();
      if (fetchError || !data) {
        setError('Tracking number not found');
        setShipment(null);
      } else {
        setShipment(data);
      }
    } catch (err) {
      setError('Error fetching shipment');
    } finally {
      setLoading(false);
    }
  };

  // 3-stage mapping from stage 1-5
  const getProgressStage = (stage: number): number => {
    if (stage <= 1) return 1; // Shipped
    if (stage <= 3) return 2; // In Transit
    return 3; // Delivered
  };

  const stageLabels = ['Shipped', 'In Transit', 'Delivered'];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* HEADER */}
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <span className="text-xl">🛡️</span>
            </div>
            <div>
              <p className="font-bold text-lg leading-none">Discreet Vault</p>
              <p className="text-xs text-slate-400 tracking-wider">LOGISTICS</p>
            </div>
          </a>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="/services" className="hover:text-blue-400 transition">Services</a>
            <a href="/security" className="hover:text-blue-400 transition">Security</a>
            <a href="/process" className="hover:text-blue-400 transition">Process</a>
            <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
          </div>
          <a
            href="/quote"
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold text-sm transition"
          >
            Request Quote
          </a>
        </div>
      </nav>

      {/* ON HOLD OVERLAY */}
      {shipment?.on_hold && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-red-950 border-2 border-red-500 rounded-2xl p-8 max-w-md shadow-2xl shadow-red-500/50 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-red-400">🚨 SHIPMENT ON HOLD</h2>
            </div>
            <p className="text-red-200 text-sm mb-2">Reason:</p>
            <p className="text-lg font-semibold text-white mb-4">
              {shipment.on_hold_reason || 'Pending verification'}
            </p>
            <p className="text-red-300 text-sm">Please contact support for more information.</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* HEADER SECTION */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1 mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-300 tracking-widest">SYSTEM ONLINE • LIVE TRACKING</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Track Your{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Secure Shipment
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Enter your tracking reference to view real-time shipment status, custody chain, and delivery progress.
          </p>
        </div>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-2xl"></div>
            <div className="relative flex gap-2 bg-slate-900/80 border border-red-500/30 rounded-xl p-2 shadow-lg shadow-red-500/20">
              <div className="flex items-center pl-3 text-slate-400">🔍</div>
              <input
                type="text"
                placeholder="DV9400000000000000000"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none px-2 py-3 text-white placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                {loading ? 'Searching...' : (
                  <>
                    Track Package <span>⚡</span>
                  </>
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </form>

        {shipment && (
          <div className="space-y-6">
            {/* TRACKING NUMBER CARD */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <p className="text-blue-400 text-xs tracking-widest mb-2">TRACKING NUMBER</p>
                  <p className="text-slate-300 text-sm font-mono mb-4">{shipment.tracking_number}</p>
                  <h2 className="text-3xl font-bold mb-1">
                    {shipment.on_hold ? 'On Hold' : stageLabels[getProgressStage(shipment.stage) - 1]}
                  </h2>
                  {shipment.expected_delivery && (
                    <p className="text-slate-400 text-sm">Expected Delivery: {shipment.expected_delivery}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-300">LIVE</span>
                  </div>
                  <p className="text-xs text-slate-400">Updated 0 minutes ago</p>
                </div>
              </div>
            </div>

            {/* LIVE ROUTE TRACKING MAP */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-blue-400 text-xs tracking-widest">📍 LIVE ROUTE TRACKING</h3>
                <span className="text-xs text-slate-400">⚡ Real-time</span>
              </div>
              <USMap shipment={shipment} />
            </div>

            {/* 3-STAGE PROGRESS BAR */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <p className="text-blue-400 text-xs tracking-widest mb-8">SHIPMENT PROGRESS</p>
              <ProgressBar
                currentStage={getProgressStage(shipment.stage)}
                stageLabels={stageLabels}
              />
            </div>

            {/* SENDER & RECEIVER CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SENDER CARD */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">📤</span>
                  <h3 className="text-blue-400 text-xs tracking-widest">SENDER</h3>
                </div>
                <p className="text-xl font-bold mb-4">{shipment.sender_name}</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">EMAIL</p>
                    <a href={`mailto:${shipment.sender_email}`} className="text-blue-300 hover:text-blue-200">
                      {shipment.sender_email}
                    </a>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">PHONE</p>
                    <a href={`tel:${shipment.sender_phone}`} className="text-blue-300 hover:text-blue-200">
                      {shipment.sender_phone}
                    </a>
                  </div>
                  <div className="pt-3 border-t border-slate-800">
                    <p className="text-slate-400 text-xs mb-1">ADDRESS</p>
                    <p className="text-slate-200">{shipment.sender_street}</p>
                    <p className="text-slate-200">
                      {shipment.from_city}, {shipment.from_state} {shipment.from_zip}
                    </p>
                  </div>
                </div>
              </div>

              {/* RECEIVER CARD */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">📥</span>
                  <h3 className="text-blue-400 text-xs tracking-widest">RECEIVER</h3>
                </div>
                <p className="text-xl font-bold mb-4">{shipment.client_name}</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">EMAIL</p>
                    <a href={`mailto:${shipment.client_email}`} className="text-blue-300 hover:text-blue-200">
                      {shipment.client_email}
                    </a>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">PHONE</p>
                    <a href={`tel:${shipment.client_phone}`} className="text-blue-300 hover:text-blue-200">
                      {shipment.client_phone}
                    </a>
                  </div>
                  <div className="pt-3 border-t border-slate-800">
                    <p className="text-slate-400 text-xs mb-1">ADDRESS</p>
                    <p className="text-slate-200">{shipment.to_street}</p>
                    <p className="text-slate-200">
                      {shipment.to_city}, {shipment.to_state} {shipment.to_zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ROUTE & PACKAGE DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <p className="text-blue-400 text-xs tracking-widest mb-4">📍 ROUTE</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">FROM</p>
                    <p className="font-bold">{shipment.from_city}, {shipment.from_state}</p>
                    <p className="text-slate-400 text-sm">{shipment.from_zip}</p>
                  </div>
                  <div className="text-center text-slate-500">↓</div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">TO</p>
                    <p className="font-bold">{shipment.to_city}, {shipment.to_state}</p>
                    <p className="text-slate-400 text-sm">{shipment.to_zip}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <p className="text-blue-400 text-xs tracking-widest mb-4">📦 PACKAGE DETAILS</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                    <span className="text-slate-400 text-sm">SERVICE</span>
                    <span className="font-semibold">{shipment.service || 'Discreet Vault Same-Day'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">WEIGHT</span>
                    <span className="font-semibold">{shipment.weight || '—'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* HELP CTA */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950/30 border border-slate-800 rounded-2xl p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Need Help With This Shipment?</h3>
                  <p className="text-slate-400 text-sm">
                    Get email notifications or contact our secure operations team for support.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-5 py-3 rounded-lg font-semibold text-sm transition">
                    ✉️ Get Email Updates
                  </button>
                  <a
                    href="/contact"
                    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold text-sm transition"
                  >
                    🎧 Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 mt-16 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between text-sm text-slate-400">
          <p>© 2026 Discreet Vault Logistics. Secure private logistics platform.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/terms" className="hover:text-white">Terms</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* 3-STAGE PROGRESS BAR */
function ProgressBar({ currentStage, stageLabels }: { currentStage: number; stageLabels: string[] }) {
  return (
    <div className="relative">
      {/* Background track */}
      <div className="absolute top-8 left-8 right-8 h-1 bg-slate-700 rounded-full"></div>
      {/* Filled track */}
      <div
        className="absolute top-8 left-8 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(59,130,246,0.7)]"
        style={{
          width: `calc(${((currentStage - 1) / (stageLabels.length - 1)) * 100}% - ${(currentStage - 1) * 16}px)`,
        }}
      ></div>

      {/* Stage circles */}
      <div className="relative flex justify-between">
        {stageLabels.map((label, index) => {
          const stageNum = index + 1;
          const isActive = stageNum <= currentStage;
          const isCurrent = stageNum === currentStage;
          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                  isActive
                    ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.8)]'
                    : 'bg-slate-800 border-2 border-slate-700 text-slate-500'
                }`}
              >
                {isCurrent ? (
                  <span className="animate-bounce">✈️</span>
                ) : isActive ? (
                  <span>✓</span>
                ) : (
                  stageNum
                )}
              </div>
              <p
                className={`mt-3 text-xs tracking-widest font-semibold ${
                  isActive ? 'text-blue-400' : 'text-slate-500'
                }`}
              >
                {label.toUpperCase()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* US MAP COMPONENT - PROPER US SHAPE */
function USMap({ shipment }: { shipment: Shipment }) {
  // US city coordinates on map (SVG viewBox 0 0 1000 600)
  const cityCoords: Record<string, [number, number]> = {
    'NEW YORK,NY': [840, 220],
    'LOS ANGELES,CA': [130, 350],
    'CHICAGO,IL': [600, 240],
    'HOUSTON,TX': [530, 440],
    'PHOENIX,AZ': [240, 380],
    'PHILADELPHIA,PA': [820, 230],
    'SAN ANTONIO,TX': [490, 460],
    'SAN DIEGO,CA': [140, 380],
    'DALLAS,TX': [530, 410],
    'AUSTIN,TX': [510, 450],
    'JACKSONVILLE,FL': [780, 470],
    'COLUMBUS,OH': [700, 260],
    'CHARLOTTE,NC': [750, 320],
    'SEATTLE,WA': [130, 130],
    'DENVER,CO': [370, 290],
    'WASHINGTON,DC': [800, 260],
    'BOSTON,MA': [870, 200],
    'NASHVILLE,TN': [660, 320],
    'DETROIT,MI': [680, 220],
    'OKLAHOMA CITY,OK': [490, 360],
    'MEMPHIS,TN': [610, 340],
    'PORTLAND,OR': [120, 160],
    'ATLANTA,GA': [720, 380],
    'MIAMI,FL': [800, 530],
    'SAN FRANCISCO,CA': [110, 290],
    'SACRAMENTO,CA': [130, 270],
    'KANSAS CITY,MO': [510, 290],
    'BALTIMORE,MD': [810, 250],
    'LAS VEGAS,NV': [220, 320],
  };

  const getCoords = (city: string, state: string): [number, number] => {
    const key = `${(city || '').toUpperCase()},${(state || '').toUpperCase()}`;
    return cityCoords[key] || [500, 300];
  };

  const from = getCoords(shipment.from_city, shipment.from_state);
  const to = getCoords(shipment.to_city, shipment.to_state);

  // Current position - use current_x/current_y if set, otherwise interpolate
  let curr: [number, number];
  if (shipment.current_x && shipment.current_y) {
    curr = [shipment.current_x, shipment.current_y];
  } else {
    const progress = Math.min(shipment.stage / 5, 1);
    curr = [from[0] + (to[0] - from[0]) * progress, from[1] + (to[1] - from[1]) * progress];
  }

  const pinColor = shipment.on_hold ? '#ef4444' : '#3b82f6';

  return (
    <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
      <svg viewBox="0 0 1000 600" className="w-full h-[500px]">
        {/* USA Map outline - simplified continental US shape */}
        <path
          d="M 100 180 
             L 130 130 L 180 110 L 250 100 L 320 95 L 400 90 L 480 85 L 560 88 L 640 92 L 720 98 L 800 110 L 860 130 L 900 160 L 920 200
             L 925 230 L 920 260 L 900 280 L 880 290 L 870 310 L 880 330 L 870 360 L 850 380 L 830 400 L 810 430 L 790 460 L 770 490 L 740 510 L 700 520 L 660 510 L 620 500 L 580 490 L 540 480 L 500 475 L 460 470 L 420 460 L 380 445 L 350 425 L 320 410 L 290 395 L 260 380 L 230 365 L 200 350 L 175 330 L 155 305 L 140 280 L 125 250 L 115 220 L 105 195 Z"
          fill="rgba(30, 41, 59, 0.4)"
          stroke="#3b82f6"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Grid pattern */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="1" />
          </pattern>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <rect width="1000" height="600" fill="url(#grid)" />

        {/* Route line */}
        <line
          x1={from[0]}
          y1={from[1]}
          x2={to[0]}
          y2={to[1]}
          stroke="url(#routeGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          opacity="0.7"
        />

        {/* From pin */}
        <g>
          <circle cx={from[0]} cy={from[1]} r="20" fill="#3b82f6" opacity="0.2" />
          <circle cx={from[0]} cy={from[1]} r="10" fill="#3b82f6" opacity="0.4" />
          <circle cx={from[0]} cy={from[1]} r="5" fill="#60a5fa" />
          <text
            x={from[0]}
            y={from[1] + 35}
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize="14"
            fontWeight="bold"
            letterSpacing="2"
          >
            {(shipment.from_city || '').toUpperCase()}
          </text>
        </g>

        {/* To pin */}
        <g>
          <circle cx={to[0]} cy={to[1]} r="20" fill="#3b82f6" opacity="0.2" />
          <circle cx={to[0]} cy={to[1]} r="10" fill="#3b82f6" opacity="0.4" />
          <circle cx={to[0]} cy={to[1]} r="5" fill="#60a5fa" />
          <text
            x={to[0]}
            y={to[1] - 20}
            textAnchor="middle"
            fill="#60a5fa"
            fontSize="14"
            fontWeight="bold"
            letterSpacing="2"
          >
            {(shipment.to_city || '').toUpperCase()}
          </text>
        </g>

        {/* Current location - animated/pulsing */}
        <g>
          <circle cx={curr[0]} cy={curr[1]} r="25" fill={pinColor} opacity="0.15">
            <animate attributeName="r" values="20;35;20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={curr[0]} cy={curr[1]} r="12" fill={pinColor} opacity="0.4" />
          <circle cx={curr[0]} cy={curr[1]} r="6" fill={pinColor} />
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg p-3 text-xs space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <span className="text-slate-300">Origin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${shipment.on_hold ? 'bg-red-500' : 'bg-blue-400'}`}></div>
          <span className="text-slate-300">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <span className="text-slate-300">Destination</span>
        </div>
      </div>
    </div>
  );
}
