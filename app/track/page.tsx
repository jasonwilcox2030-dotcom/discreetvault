'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Package, Truck, MapPin, CheckCircle2, FileText, AlertTriangle,
  Search, Radio, Clock, Weight, Shield, Mail, Headphones,
  ArrowDown, Activity, Zap
} from 'lucide-react';

const STAGES = [
  { id: 1, label: 'Created', Icon: FileText },
  { id: 2, label: 'Picked Up', Icon: Package },
  { id: 3, label: 'In Transit', Icon: Truck },
  { id: 4, label: 'Out for Delivery', Icon: MapPin },
  { id: 5, label: 'Delivered', Icon: CheckCircle2 },
];

function getTimeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} minutes ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export default function TrackPage() {
  const [input, setInput] = useState('');
  const [shipment, setShipment] = useState<any>(null);
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);

  const handleTrack = async () => {
    setError('');
    setSearching(true);

    const trimmed = input.trim().replace(/\s/g, '');

    const { data: shipData, error: shipError } = await supabase
      .from('shipments')
      .select('*')
      .eq('tracking_number', trimmed)
      .single();

    if (shipError || !shipData) {
      setShipment(null);
      setError('No shipment found with that tracking number. Please verify your tracking reference and try again.');
      setSearching(false);
      return;
    }

    const { data: events } = await supabase
      .from('shipment_events')
      .select('*')
      .eq('shipment_id', shipData.id)
      .order('created_at', { ascending: false });

    const formatted = {
      trackingNumber: shipData.tracking_number,
      status: shipData.status,
      stage: shipData.stage,
      onHold: shipData.on_hold,
      onHoldReason: shipData.on_hold_reason,
      eta: shipData.eta,
      lastUpdated: getTimeAgo(shipData.updated_at),
      from: { city: shipData.from_city, state: shipData.from_state, zip: shipData.from_zip, x: shipData.from_x, y: shipData.from_y },
      to: { city: shipData.to_city, state: shipData.to_state, zip: shipData.to_zip, x: shipData.to_x, y: shipData.to_y },
      currentLocation: { city: shipData.current_city, x: shipData.current_x, y: shipData.current_y },
      weight: shipData.weight,
      service: shipData.service,
      history: (events || []).map((e: any) => ({
        date: e.event_date,
        time: e.event_time,
        location: e.location,
        status: e.status_text,
        alert: e.is_alert,
      })),
    };

    setShipment(formatted);
    setSearching(false);

    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <main className="min-h-screen overflow-hidden relative" style={{ background: '#050816', color: '#ffffff' }}>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, #0b1730 0%, #050816 60%)' }} />
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(27,111,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(27,111,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>
        <div className="absolute -top-40 left-10 w-[600px] h-[600px] rounded-full blur-[160px] animate-pulse" style={{ background: 'rgba(27,111,255,0.15)' }} />
        <div className="absolute top-1/2 -right-40 w-[700px] h-[700px] rounded-full blur-[180px]" style={{ background: 'rgba(0,95,204,0.12)' }} />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: 'rgba(218,41,28,0.06)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent, #1b6fff, transparent)',
          animation: 'scanX 8s linear infinite',
        }} />
      </div>

      <header className="relative z-50 border-b backdrop-blur-xl" style={{ borderColor: 'rgba(59,130,246,0.18)', background: 'rgba(5,8,22,0.85)' }}>
        <div className="container flex items-center justify-between py-4 px-6 max-w-7xl mx-auto">
          <a href="/" className="flex items-center gap-3 no-underline group">
            <div className="h-11 w-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #005fcc, #DA291C)',
                boxShadow: '0 0 30px rgba(27,111,255,0.5)',
              }}>
              <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white leading-none">Discreet Vault</div>
              <div className="text-[10px] uppercase tracking-[0.28em] font-bold" style={{ color: '#1b6fff' }}>Logistics</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {['Services', 'Security', 'Process', 'Contact'].map((item) => (
              <a key={item} href={`/#${item.toLowerCase()}`} className="text-sm no-underline transition-colors hover:text-white" style={{ color: '#a8b2ba' }}>
                {item}
              </a>
            ))}
          </nav>

          <a href="/quote" className="px-6 py-2.5 rounded-xl text-sm font-bold no-underline transition-all duration-300 hover:scale-105"
            style={{
              background: '#DA291C',
              color: '#fff',
              boxShadow: '0 0 25px rgba(218,41,28,0.4)',
            }}>
            Request Quote
          </a>
        </div>
      </header>

      <section className="relative z-10 py-12 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
            style={{
              background: 'rgba(27,111,255,0.1)',
              border: '1px solid rgba(27,111,255,0.3)',
            }}>
            <Radio className="w-3 h-3 animate-pulse" style={{ color: '#1b6fff' }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#1b6fff' }}>System Online • Live Tracking</span>
          </div>

          <h1 className="font-black mb-6 leading-tight tracking-tight" style={{ fontSize: 'clamp(36px, 7vw, 72px)' }}>
            Track Your <span style={{
              background: 'linear-gradient(135deg, #1b6fff, #005fcc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Secure Shipment</span>
          </h1>

          <p className="text-base md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto" style={{ color: '#a8b2ba' }}>
            Enter your tracking reference to view real-time shipment status, custody chain, and delivery progress.
          </p>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -inset-4 rounded-2xl blur-2xl animate-pulse" style={{ background: 'rgba(27,111,255,0.2)' }} />

            <div className="relative rounded-2xl p-2 backdrop-blur-xl"
              style={{
                background: 'rgba(16,24,39,0.82)',
                border: '1px solid rgba(59,130,246,0.3)',
                boxShadow: '0 0 60px rgba(27,111,255,0.15)',
              }}>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 md:px-6">
                  <Search className="w-5 h-5 flex-shrink-0" style={{ color: '#1b6fff' }} />
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                    placeholder="Enter tracking number..."
                    className="flex-1 bg-transparent py-4 text-sm md:text-lg focus:outline-none w-full"
                    style={{ color: '#ffffff' }}
                  />
                </div>
                <button
                  onClick={handleTrack}
                  disabled={!input.trim() || searching}
                  className="px-6 md:px-8 py-4 rounded-xl font-bold text-sm md:text-base transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
                  style={{
                    background: searching ? '#005fcc' : '#DA291C',
                    color: '#fff',
                    boxShadow: searching ? '0 0 25px rgba(27,111,255,0.4)' : '0 0 25px rgba(218,41,28,0.4)',
                  }}>
                  {searching ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin" />
                      Searching
                    </>
                  ) : (
                    <>
                      Track Package
                      <Zap className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 rounded-xl text-sm flex items-center gap-3" style={{
                background: 'rgba(218,41,28,0.1)',
                border: '1px solid rgba(218,41,28,0.3)',
                color: '#e84a38',
              }}>
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {shipment && (
        <section id="results" className="relative z-10 pb-24 px-6" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
          <div className="max-w-6xl mx-auto space-y-6">

            {shipment.onHold && (
              <div className="relative rounded-2xl p-6 md:p-8 backdrop-blur-xl overflow-hidden"
                style={{
                  background: 'rgba(218,41,28,0.08)',
                  border: '2px solid rgba(218,41,28,0.5)',
                  boxShadow: '0 0 60px rgba(218,41,28,0.25)',
                  animation: 'pulseAlert 2s ease-in-out infinite',
                }}>
                <div className="absolute top-0 left-0 right-0 h-1" style={{
                  background: 'linear-gradient(90deg, transparent, #DA291C, transparent)',
                  animation: 'scanX 3s linear infinite',
                }} />

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                    background: 'rgba(218,41,28,0.2)',
                    border: '1px solid #DA291C',
                  }}>
                    <AlertTriangle className="w-6 h-6" style={{ color: '#DA291C' }} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#DA291C' }}>
                      Shipment Alert
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black mb-2" style={{ color: '#ffffff' }}>
                      Package On Hold
                    </h3>
                    <p style={{ color: '#e8b8b3' }}>{shipment.onHoldReason}</p>
                    <button className="mt-4 px-5 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105 inline-flex items-center gap-2" style={{
                      background: '#DA291C',
                      color: '#fff',
                    }}>
                      <Headphones className="w-4 h-4" />
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="relative rounded-2xl p-6 md:p-8 backdrop-blur-xl overflow-hidden"
              style={{
                background: 'rgba(16,24,39,0.82)',
                border: '1px solid rgba(59,130,246,0.18)',
                boxShadow: '0 0 40px rgba(27,111,255,0.1)',
              }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #1b6fff, transparent)' }} />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#1b6fff' }}>Tracking Number</div>
                  <div className="font-mono text-xs md:text-base mb-4 break-all" style={{ color: '#a8b2ba' }}>{shipment.trackingNumber}</div>
                  <h2 className="text-3xl md:text-5xl font-black mb-2" style={{
                    color: shipment.onHold ? '#DA291C' : shipment.stage === 5 ? '#10b981' : '#ffffff',
                  }}>{shipment.status}</h2>
                  <p style={{ color: '#a8b2ba' }}>
                    {shipment.onHold ? 'Pending Release' : `Expected Delivery: ${shipment.eta}`}
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.3)',
                  }}>
                    <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#10b981' }}>Live</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: '#6d7580' }}>
                    <Clock className="w-3 h-3" />
                    Updated {shipment.lastUpdated}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl p-6 md:p-8 backdrop-blur-xl overflow-hidden"
              style={{ background: 'rgba(16,24,39,0.82)', border: '1px solid rgba(59,130,246,0.18)' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs uppercase tracking-[0.3em] font-bold flex items-center gap-2" style={{ color: '#1b6fff' }}>
                  <MapPin className="w-3 h-3" />
                  Live Route Tracking
                </div>
                <div className="text-xs flex items-center gap-2" style={{ color: '#6d7580' }}>
                  <Activity className="w-3 h-3 animate-pulse" style={{ color: '#1b6fff' }} />
                  Real-time
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden" style={{
                background: 'radial-gradient(ellipse at center, #081120 0%, #050816 100%)',
                border: '1px solid rgba(59,130,246,0.15)',
                minHeight: '320px',
              }}>
                <svg viewBox="0 0 100 70" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <pattern id="mapGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                      <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(27,111,255,0.08)" strokeWidth="0.1" />
                    </pattern>
                    <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1b6fff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#1b6fff" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#005fcc" />
                      <stop offset="50%" stopColor="#1b6fff" />
                      <stop offset="100%" stopColor={shipment.onHold ? '#DA291C' : '#1b6fff'} />
                    </linearGradient>
                  </defs>
                  <rect width="100" height="70" fill="url(#mapGrid)" />
                  <path
                    d="M 8 25 Q 10 20 15 18 L 25 16 L 35 14 L 50 13 L 65 14 L 78 16 L 88 20 L 92 30 L 90 42 L 85 50 L 75 55 L 60 58 L 45 60 L 30 58 L 18 55 L 10 48 L 6 38 Z"
                    fill="rgba(11,23,48,0.6)"
                    stroke="rgba(27,111,255,0.3)"
                    strokeWidth="0.3"
                  />
                  <line
                    x1={shipment.from.x}
                    y1={shipment.from.y}
                    x2={shipment.to.x}
                    y2={shipment.to.y}
                    stroke="url(#routeGradient)"
                    strokeWidth="0.5"
                    strokeDasharray="2 1"
                    style={{ animation: 'dashMove 2s linear infinite' }}
                  />
                  {shipment.stage < 5 && shipment.currentLocation.x && (
                    <circle cx={shipment.currentLocation.x} cy={shipment.currentLocation.y} r="8" fill="url(#glowGradient)" />
                  )}
                  <g>
                    <circle cx={shipment.from.x} cy={shipment.from.y} r="2" fill="#1b6fff" opacity="0.3">
                      <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={shipment.from.x} cy={shipment.from.y} r="1.2" fill="#1b6fff" />
                  </g>
                  <g>
                    <circle cx={shipment.to.x} cy={shipment.to.y} r="2" fill={shipment.stage === 5 ? '#10b981' : '#1b6fff'} opacity="0.3">
                      <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={shipment.to.x} cy={shipment.to.y} r="1.2" fill={shipment.stage === 5 ? '#10b981' : '#1b6fff'} />
                  </g>
                  {shipment.stage < 5 && shipment.currentLocation.x && (
                    <g>
                      <circle cx={shipment.currentLocation.x} cy={shipment.currentLocation.y} r="3" fill={shipment.onHold ? '#DA291C' : '#1b6fff'} opacity="0.4">
                        <animate attributeName="r" values="3;6;3" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={shipment.currentLocation.x} cy={shipment.currentLocation.y} r="1.8" fill={shipment.onHold ? '#DA291C' : '#1b6fff'} />
                      <circle cx={shipment.currentLocation.x} cy={shipment.currentLocation.y} r="0.6" fill="#fff" />
                    </g>
                  )}
                  <text x={shipment.from.x} y={shipment.from.y + 4.5} textAnchor="middle" fill="#a8b2ba" fontSize="2" fontWeight="bold">
                    {shipment.from.city.toUpperCase()}
                  </text>
                  <text x={shipment.to.x} y={shipment.to.y + 4.5} textAnchor="middle" fill="#a8b2ba" fontSize="2" fontWeight="bold">
                    {shipment.to.city.toUpperCase()}
                  </text>
                  {shipment.stage < 5 && shipment.currentLocation.x && shipment.currentLocation.city && (
                    <text x={shipment.currentLocation.x} y={shipment.currentLocation.y - 3} textAnchor="middle" fill={shipment.onHold ? '#DA291C' : '#1b6fff'} fontSize="2.2" fontWeight="bold">
                      {shipment.currentLocation.city.toUpperCase()}
                    </text>
                  )}
                </svg>

                <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 text-xs backdrop-blur-md rounded-lg p-3" style={{
                  background: 'rgba(5,8,22,0.7)',
                  border: '1px solid rgba(59,130,246,0.2)',
                }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#1b6fff' }} />
                    <span style={{ color: '#a8b2ba' }}>Origin</span>
                  </div>
                  {shipment.stage < 5 && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: shipment.onHold ? '#DA291C' : '#1b6fff' }} />
                      <span style={{ color: '#a8b2ba' }}>Current</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: shipment.stage === 5 ? '#10b981' : '#1b6fff' }} />
                    <span style={{ color: '#a8b2ba' }}>Destination</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl p-6 md:p-8 backdrop-blur-xl" style={{ background: 'rgba(16,24,39,0.82)', border: '1px solid rgba(59,130,246,0.18)' }}>
              <div className="text-xs uppercase tracking-[0.3em] font-bold mb-8" style={{ color: '#1b6fff' }}>Shipment Progress</div>

              <div className="relative">
                <div className="absolute top-7 left-7 right-7 h-1 rounded-full" style={{ background: 'rgba(59,130,246,0.15)' }} />
                <div className="absolute top-7 left-7 h-1 rounded-full transition-all duration-1000" style={{
                  width: `calc(${((shipment.stage - 1) / 4) * 100}% - ${(shipment.stage - 1) * 14}px)`,
                  background: shipment.onHold ? 'linear-gradient(90deg, #1b6fff, #DA291C)' : 'linear-gradient(90deg, #005fcc, #1b6fff)',
                  boxShadow: shipment.onHold ? '0 0 20px rgba(218,41,28,0.6)' : '0 0 20px rgba(27,111,255,0.6)',
                }} />

                <div className="relative grid grid-cols-5 gap-1 md:gap-2">
                  {STAGES.map((stage) => {
                    const isActive = stage.id === shipment.stage;
                    const isComplete = stage.id < shipment.stage;
                    const isCurrent = stage.id === shipment.stage;
                    const StageIcon = stage.Icon;

                    return (
                      <div key={stage.id} className="flex flex-col items-center">
                        <div className={`relative h-12 w-12 md:h-14 md:w-14 rounded-full flex items-center justify-center transition-all duration-500 ${isCurrent ? 'scale-110' : ''}`}
                          style={{
                            background: isComplete || isActive
                              ? (shipment.onHold && isActive ? '#DA291C' : '#005fcc')
                              : 'rgba(16,24,39,0.9)',
                            border: isComplete || isActive
                              ? '2px solid ' + (shipment.onHold && isActive ? '#DA291C' : '#1b6fff')
                              : '2px solid rgba(59,130,246,0.2)',
                            boxShadow: isCurrent
                              ? (shipment.onHold ? '0 0 30px rgba(218,41,28,0.6)' : '0 0 30px rgba(27,111,255,0.6)')
                              : 'none',
                          }}>
                          {isCurrent && (
                            <div className="absolute inset-0 rounded-full animate-ping" style={{
                              background: shipment.onHold ? '#DA291C' : '#1b6fff',
                              opacity: 0.4,
                            }} />
                          )}
                          {isComplete ? (
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10" strokeWidth={2.5} />
                          ) : (
                            <StageIcon className={`w-5 h-5 md:w-6 md:h-6 relative z-10`} style={{
                              color: isActive ? '#fff' : '#6d7580'
                            }} strokeWidth={2} />
                          )}
                        </div>
                        <div className="mt-2 md:mt-3 text-center">
                          <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider" style={{
                            color: isComplete || isActive ? '#ffffff' : '#6d7580',
                          }}>{stage.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-[1.5fr_1fr] gap-6">
              <div className="rounded-2xl p-6 md:p-8 backdrop-blur-xl" style={{ background: 'rgba(16,24,39,0.82)', border: '1px solid rgba(59,130,246,0.18)' }}>
                <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2" style={{ color: '#1b6fff' }}>
                  <Clock className="w-3 h-3" />
                  Tracking History
                </div>

                {shipment.history.length === 0 ? (
                  <p className="text-sm" style={{ color: '#6d7580' }}>No tracking events yet.</p>
                ) : (
                  <div className="space-y-1">
                    {shipment.history.map((event: any, i: number) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                          <div className={`h-3 w-3 rounded-full mt-1.5 transition-all`} style={{
                            background: event.alert ? '#DA291C' : i === 0 ? '#1b6fff' : 'rgba(27,111,255,0.4)',
                            boxShadow: event.alert ? '0 0 12px rgba(218,41,28,0.8)' : i === 0 ? '0 0 12px rgba(27,111,255,0.8)' : 'none',
                          }} />
                          {i < shipment.history.length - 1 && (
                            <div className="w-px flex-1 mt-2" style={{ background: 'rgba(59,130,246,0.15)' }} />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="font-bold text-sm mb-1 flex items-center gap-2" style={{ color: event.alert ? '#DA291C' : '#ffffff' }}>
                            {event.alert && <AlertTriangle className="w-3.5 h-3.5" />}
                            {event.status}
                          </div>
                          <div className="text-xs flex items-center gap-1.5" style={{ color: '#a8b2ba' }}>
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>
                          <div className="text-xs mt-1" style={{ color: '#6d7580' }}>
                            {event.date} • {event.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl p-6 backdrop-blur-xl" style={{ background: 'rgba(16,24,39,0.82)', border: '1px solid rgba(59,130,246,0.18)' }}>
                  <div className="text-xs uppercase tracking-[0.3em] font-bold mb-4 flex items-center gap-2" style={{ color: '#1b6fff' }}>
                    <MapPin className="w-3 h-3" />
                    Route
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#6d7580' }}>From</div>
                      <div className="font-bold text-sm" style={{ color: '#ffffff' }}>{shipment.from.city}, {shipment.from.state}</div>
                      <div className="text-xs" style={{ color: '#a8b2ba' }}>{shipment.from.zip}</div>
                    </div>

                    <div className="flex justify-center py-2">
                      <ArrowDown className="w-5 h-5 animate-pulse" style={{ color: '#1b6fff' }} />
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#6d7580' }}>To</div>
                      <div className="font-bold text-sm" style={{ color: '#ffffff' }}>{shipment.to.city}, {shipment.to.state}</div>
                      <div className="text-xs" style={{ color: '#a8b2ba' }}>{shipment.to.zip}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-6 backdrop-blur-xl" style={{ background: 'rgba(16,24,39,0.82)', border: '1px solid rgba(59,130,246,0.18)' }}>
                  <div className="text-xs uppercase tracking-[0.3em] font-bold mb-4 flex items-center gap-2" style={{ color: '#1b6fff' }}>
                    <Package className="w-3 h-3" />
                    Package Details
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: 'rgba(59,130,246,0.1)' }}>
                      <span className="text-xs uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#6d7580' }}>
                        <Shield className="w-3 h-3" />
                        Service
                      </span>
                      <span className="text-sm font-bold" style={{ color: '#ffffff' }}>{shipment.service}</span>
                    </div>
                    {shipment.weight && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#6d7580' }}>
                          <Weight className="w-3 h-3" />
                          Weight
                        </span>
                        <span className="text-sm font-bold" style={{ color: '#ffffff' }}>{shipment.weight}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl p-8 md:p-10 backdrop-blur-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(16,24,39,0.82), rgba(27,111,255,0.08))',
                border: '1px solid rgba(59,130,246,0.18)',
              }}>
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl" style={{ background: 'rgba(27,111,255,0.15)' }} />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black mb-2" style={{ color: '#ffffff' }}>Need Help With This Shipment?</h3>
                  <p style={{ color: '#a8b2ba' }}>Get email notifications or contact our secure operations team for support.</p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 flex items-center gap-2" style={{
                    background: 'rgba(27,111,255,0.15)',
                    border: '1px solid rgba(27,111,255,0.4)',
                    color: '#1b6fff',
                  }}>
                    <Mail className="w-4 h-4" />
                    Get Email Updates
                  </button>
                  <button className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 flex items-center gap-2" style={{
                    background: '#DA291C',
                    color: '#fff',
                    boxShadow: '0 0 25px rgba(218,41,28,0.3)',
                  }}>
                    <Headphones className="w-4 h-4" />
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="relative z-10 border-t py-8 px-6" style={{ borderColor: 'rgba(59,130,246,0.15)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: '#6d7580' }}>© 2026 Discreet Vault Logistics. Secure private logistics platform.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-sm no-underline hover:text-white" style={{ color: '#6d7580' }}>Privacy</a>
            <a href="/terms" className="text-sm no-underline hover:text-white" style={{ color: '#6d7580' }}>Terms</a>
            <a href="/contact" className="text-sm no-underline hover:text-white" style={{ color: '#6d7580' }}>Contact</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scanX {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseAlert {
          0%, 100% { box-shadow: 0 0 60px rgba(218,41,28,0.25); }
          50% { box-shadow: 0 0 80px rgba(218,41,28,0.4); }
        }
        @keyframes dashMove {
          to { stroke-dashoffset: -10; }
        }
      `}</style>
    </main>
  );
}
