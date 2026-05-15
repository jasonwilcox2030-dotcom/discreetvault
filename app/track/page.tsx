'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

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

interface StatusLog {
  id: string;
  shipment_id: string;
  status: string;
  location: string;
  notes: string;
  created_at: string;
}

export default function TrackPage() {
  const [tracking, setTracking] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [logs, setLogs] = useState<StatusLog[]>([]);
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
        setLogs([]);
      } else {
        setShipment(data);
        const { data: logsData } = await supabase
          .from('shipment_status_logs')
          .select('*')
          .eq('shipment_id', data.id)
          .order('created_at', { ascending: false });
        setLogs(logsData || []);
      }
    } catch (err) {
      setError('Error fetching shipment');
    } finally {
      setLoading(false);
    }
  };

  const getProgressStage = (stage: number): number => {
    if (stage <= 1) return 1;
    if (stage <= 3) return 2;
    return 3;
  };

  const stageLabels = ['Shipped', 'In Transit', 'Delivered'];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
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
          <a href="/quote" className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold text-sm transition">
            Request Quote
          </a>
        </div>
      </nav>

      {shipment?.on_hold && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-red-950 border-2 border-red-500 rounded-2xl p-8 max-w-md shadow-2xl shadow-red-500/50 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-red-400">🚨 SHIPMENT ON HOLD</h2>
            </div>
            <p className="text-red-200 text-sm mb-2">Reason:</p>
            <p className="text-lg font-semibold text-white mb-4">{shipment.on_hold_reason || 'Pending verification'}</p>
            <p className="text-red-300 text-sm">Please contact support for more information.</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1 mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-300 tracking-widest">SYSTEM ONLINE • LIVE TRACKING</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Track Your{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Secure Shipment</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Enter your tracking reference to view real-time shipment status, custody chain, and delivery progress.
          </p>
        </div>

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
              <button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                {loading ? 'Searching...' : (<>Track Package <span>⚡</span></>)}
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </form>

        {shipment && (
          <div className="space-y-6">
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

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-blue-400 text-xs tracking-widest">📍 LIVE ROUTE TRACKING</h3>
                <span className="text-xs text-slate-400">⚡ Real-time</span>
              </div>
              <MapboxMap shipment={shipment} />
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <p className="text-blue-400 text-xs tracking-widest mb-8">SHIPMENT PROGRESS</p>
              <USPSProgressBar currentStage={getProgressStage(shipment.stage)} stageLabels={stageLabels} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">📤</span>
                  <h3 className="text-blue-400 text-xs tracking-widest">SENDER</h3>
                </div>
                <p className="text-xl font-bold mb-4">{shipment.sender_name}</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">EMAIL</p>
                    <a href={`mailto:${shipment.sender_email}`} className="text-blue-300 hover:text-blue-200">{shipment.sender_email}</a>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">PHONE</p>
                    <a href={`tel:${shipment.sender_phone}`} className="text-blue-300 hover:text-blue-200">{shipment.sender_phone}</a>
                  </div>
                  <div className="pt-3 border-t border-slate-800">
                    <p className="text-slate-400 text-xs mb-1">ADDRESS</p>
                    <p className="text-slate-200">{shipment.sender_street}</p>
                    <p className="text-slate-200">{shipment.from_city}, {shipment.from_state} {shipment.from_zip}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">📥</span>
                  <h3 className="text-blue-400 text-xs tracking-widest">RECEIVER</h3>
                </div>
                <p className="text-xl font-bold mb-4">{shipment.client_name}</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">EMAIL</p>
                    <a href={`mailto:${shipment.client_email}`} className="text-blue-300 hover:text-blue-200">{shipment.client_email}</a>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">PHONE</p>
                    <a href={`tel:${shipment.client_phone}`} className="text-blue-300 hover:text-blue-200">{shipment.client_phone}</a>
                  </div>
                  <div className="pt-3 border-t border-slate-800">
                    <p className="text-slate-400 text-xs mb-1">ADDRESS</p>
                    <p className="text-slate-200">{shipment.to_street}</p>
                    <p className="text-slate-200">{shipment.to_city}, {shipment.to_state} {shipment.to_zip}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <p className="text-blue-400 text-xs tracking-widest mb-6">🕐 TRACKING HISTORY</p>
              {logs.length > 0 ? (
                <div className="space-y-4">
                  {logs.map((log, index) => (
                    <div key={log.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-400 ring-4 ring-blue-400/20' : 'bg-slate-600'}`}></div>
                        {index < logs.length - 1 && <div className="w-px flex-1 bg-slate-700 mt-1"></div>}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-semibold text-white">{log.status}</p>
                        {log.location && (
                          <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">📍 {log.location}</p>
                        )}
                        {log.notes && <p className="text-slate-300 text-sm mt-1">{log.notes}</p>}
                        <p className="text-slate-500 text-xs mt-1">
                          {new Date(log.created_at).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400 ring-4 ring-blue-400/20"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">Shipment Created — Awaiting Pickup</p>
                    <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                      📍 {shipment.from_city}, {shipment.from_state} {shipment.from_zip}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      {new Date(shipment.created_at).toLocaleString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>

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

            <div className="bg-gradient-to-r from-slate-900 to-blue-950/30 border border-slate-800 rounded-2xl p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Need Help With This Shipment?</h3>
                  <p className="text-slate-400 text-sm">Get email notifications or contact our secure operations team for support.</p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-5 py-3 rounded-lg font-semibold text-sm transition">✉️ Get Email Updates</button>
                  <a href="/contact" className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold text-sm transition">🎧 Contact Support</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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

function USPSProgressBar({ currentStage, stageLabels }: { currentStage: number; stageLabels: string[] }) {
  const fillPercent = ((currentStage - 1) / (stageLabels.length - 1)) * 100;
  return (
    <div className="w-full">
      <div className="relative mb-6">
        <div className="h-6 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-all duration-1000 shadow-[0_0_30px_rgba(59,130,246,0.8)]"
            style={{ width: `${fillPercent}%`, backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}
          ></div>
        </div>
        <div className="absolute inset-0 flex justify-between items-center px-3">
          {stageLabels.map((_, index) => {
            const stageNum = index + 1;
            const isActive = stageNum <= currentStage;
            const isCurrent = stageNum === currentStage;
            return (
              <div key={index} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-500 ${isActive ? 'bg-blue-500 border-white shadow-[0_0_20px_rgba(59,130,246,1)]' : 'bg-slate-700 border-slate-600 text-slate-400'}`}>
                {isCurrent ? <span className="text-xl animate-bounce">✈️</span> : isActive ? '✓' : stageNum}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between">
        {stageLabels.map((label, index) => {
          const stageNum = index + 1;
          const isActive = stageNum <= currentStage;
          return (
            <div key={index} className="text-center flex-1">
              <p className={`text-xs tracking-widest font-bold ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>{label.toUpperCase()}</p>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

/* MAPBOX REAL GPS MAP - DARK THEME */
function MapboxMap({ shipment }: { shipment: Shipment }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // US city coordinates [lng, lat]
  const cityCoords: Record<string, [number, number]> = {
    'NEW YORK,NY': [-74.0060, 40.7128],
    'LOS ANGELES,CA': [-118.2437, 34.0522],
    'CHICAGO,IL': [-87.6298, 41.8781],
    'HOUSTON,TX': [-95.3698, 29.7604],
    'PHOENIX,AZ': [-112.0740, 33.4484],
    'PHILADELPHIA,PA': [-75.1652, 39.9526],
    'SAN ANTONIO,TX': [-98.4936, 29.4241],
    'SAN DIEGO,CA': [-117.1611, 32.7157],
    'DALLAS,TX': [-96.7970, 32.7767],
    'AUSTIN,TX': [-97.7431, 30.2672],
    'JACKSONVILLE,FL': [-81.6557, 30.3322],
    'COLUMBUS,OH': [-82.9988, 39.9612],
    'CHARLOTTE,NC': [-80.8431, 35.2271],
    'SEATTLE,WA': [-122.3321, 47.6062],
    'DENVER,CO': [-104.9903, 39.7392],
    'WASHINGTON,DC': [-77.0369, 38.9072],
    'BOSTON,MA': [-71.0589, 42.3601],
    'NASHVILLE,TN': [-86.7816, 36.1627],
    'DETROIT,MI': [-83.0458, 42.3314],
    'OKLAHOMA CITY,OK': [-97.5164, 35.4676],
    'MEMPHIS,TN': [-90.0490, 35.1495],
    'PORTLAND,OR': [-122.6587, 45.5152],
    'ATLANTA,GA': [-84.3880, 33.7490],
    'MIAMI,FL': [-80.1918, 25.7617],
    'SAN FRANCISCO,CA': [-122.4194, 37.7749],
    'SACRAMENTO,CA': [-121.4944, 38.5816],
    'KANSAS CITY,MO': [-94.5786, 39.0997],
    'BALTIMORE,MD': [-76.6122, 39.2904],
    'LAS VEGAS,NV': [-115.1398, 36.1699],
    'EL PASO,TX': [-106.4850, 31.7619],
    'MILWAUKEE,WI': [-87.9065, 43.0389],
    'ALBUQUERQUE,NM': [-106.6504, 35.0844],
    'TUCSON,AZ': [-110.9265, 32.2226],
    'FRESNO,CA': [-119.7871, 36.7378],
    'MESA,AZ': [-111.8315, 33.4152],
    'INDIANAPOLIS,IN': [-86.1581, 39.7684],
    'LOUISVILLE,KY': [-85.7585, 38.2527],
    'RICHMOND,VA': [-77.4360, 37.5407],
    'CLEVELAND,OH': [-81.6944, 41.4993],
    'NEW ORLEANS,LA': [-90.0715, 29.9511],
    'TAMPA,FL': [-82.4572, 27.9506],
    'ORLANDO,FL': [-81.3792, 28.5383],
    'PITTSBURGH,PA': [-79.9959, 40.4406],
    'CINCINNATI,OH': [-84.5120, 39.1031],
    'MINNEAPOLIS,MN': [-93.2650, 44.9778],
    'ST. LOUIS,MO': [-90.1994, 38.6270],
    'SALT LAKE CITY,UT': [-111.8910, 40.7608],
    'OMAHA,NE': [-95.9345, 41.2565],
    'RALEIGH,NC': [-78.6382, 35.7796],
    'VIRGINIA BEACH,VA': [-75.9780, 36.8529],
  };

  const getCoords = (city: string, state: string): [number, number] => {
    const key = `${(city || '').toUpperCase()},${(state || '').toUpperCase()}`;
    return cityCoords[key] || [-95.7129, 37.0902]; // Center of US default
  };

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    const from = getCoords(shipment.from_city, shipment.from_state);
    const to = getCoords(shipment.to_city, shipment.to_state);

    // Current location
    let curr: [number, number];
    if (shipment.current_city && shipment.current_state) {
      curr = getCoords(shipment.current_city, shipment.current_state);
    } else {
      const progress = Math.min(shipment.stage / 5, 1);
      curr = [from[0] + (to[0] - from[0]) * progress, from[1] + (to[1] - from[1]) * progress];
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2],
      zoom: 3.5,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      // Add route line
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: [from, to] },
        },
      });

      map.current.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 3,
          'line-dasharray': [2, 2],
        },
      });

      // FROM marker (green pin)
      const fromEl = document.createElement('div');
      fromEl.innerHTML = `<div style="
        width: 24px; height: 24px; border-radius: 50%;
        background: #22c55e; border: 3px solid white;
        box-shadow: 0 0 20px rgba(34,197,94,0.8);
      "></div>`;
      new mapboxgl.Marker(fromEl)
        .setLngLat(from)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong>FROM:</strong><br>${shipment.from_city}, ${shipment.from_state}`))
        .addTo(map.current);

      // TO marker (blue pin)
      const toEl = document.createElement('div');
      toEl.innerHTML = `<div style="
        width: 24px; height: 24px; border-radius: 50%;
        background: #3b82f6; border: 3px solid white;
        box-shadow: 0 0 20px rgba(59,130,246,0.8);
      "></div>`;
      new mapboxgl.Marker(toEl)
        .setLngLat(to)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong>TO:</strong><br>${shipment.to_city}, ${shipment.to_state}`))
        .addTo(map.current);

      // CURRENT marker (pulsing - red if on hold, cyan otherwise)
      const currColor = shipment.on_hold ? '#ef4444' : '#06b6d4';
      const currGlow = shipment.on_hold ? 'rgba(239,68,68,0.8)' : 'rgba(6,182,212,0.8)';
      const currEl = document.createElement('div');
      currEl.innerHTML = `
        <div style="position: relative; width: 30px; height: 30px;">
          <div style="
            position: absolute; top: 0; left: 0;
            width: 30px; height: 30px; border-radius: 50%;
            background: ${currColor}; opacity: 0.3;
            animation: pulse 2s infinite;
          "></div>
          <div style="
            position: absolute; top: 7px; left: 7px;
            width: 16px; height: 16px; border-radius: 50%;
            background: ${currColor}; border: 2px solid white;
            box-shadow: 0 0 25px ${currGlow};
          "></div>
        </div>
        <style>
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(2.5); opacity: 0; }
          }
        </style>
      `;
      new mapboxgl.Marker(currEl)
        .setLngLat(curr)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong>${shipment.on_hold ? '🚨 ON HOLD' : '📍 CURRENT'}</strong><br>${shipment.current_city || 'In Transit'}, ${shipment.current_state || ''}`))
        .addTo(map.current);

      // Fit bounds to show all points
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(from);
      bounds.extend(to);
      bounds.extend(curr);
      map.current.fitBounds(bounds, { padding: 80, maxZoom: 7 });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [shipment]);

  return (
    <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
      <div ref={mapContainer} className="w-full h-[500px]" />
      <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg p-3 text-xs space-y-1 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-slate-300">Origin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${shipment.on_hold ? 'bg-red-500' : 'bg-cyan-400'}`}></div>
          <span className="text-slate-300">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-slate-300">Destination</span>
        </div>
      </div>
    </div>
  );
}
