'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

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
  current_x: number;
  current_y: number;
  on_hold: boolean;
  on_hold_reason: string;
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
        .eq('tracking_number', tracking.toUpperCase())
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

  const stageLabels = ['Shipped', 'In Transit', 'Delivered'];

  const getStagePercentage = (currentStage: number) => {
    return ((currentStage - 1) / (stageLabels.length - 1)) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Track Your Shipment
          </h1>
          <p className="text-slate-300 text-lg">Enter your tracking number below</p>
          <Link href="/" className="text-blue-400 hover:text-cyan-300 mt-4 inline-block text-sm">
            ← Back Home
          </Link>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter tracking number (e.g., VLT-001)"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              className="flex-1 px-6 py-4 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>

        {shipment && (
          <div className="space-y-8 relative">
            {/* ON HOLD OVERLAY */}
            {shipment.on_hold && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none">
                <div className="bg-red-950 border-2 border-red-500 rounded-xl p-8 text-center max-w-md shadow-2xl shadow-red-500/50 animate-pulse">
                  <div className="text-6xl mb-4">🚨</div>
                  <h3 className="text-2xl font-bold text-red-400 mb-2">SHIPMENT ON HOLD</h3>
                  <p className="text-red-300 mb-4">{shipment.on_hold_reason || 'Pending verification'}</p>
                  <p className="text-sm text-slate-300">Contact support for more information</p>
                </div>
              </div>
            )}

            {/* 3-STAGE PROGRESS BAR */}
            <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-xl font-bold mb-8 text-slate-100">Shipment Status</h2>

              <div className="mb-12">
                {/* Progress Bar Container */}
                <div className="relative mb-8">
                  {/* Background Track */}
                  <div className="absolute top-8 left-0 right-0 h-1.5 bg-slate-700 rounded-full"></div>

                  {/* Filled Progress with Neon Glow */}
                  <div
                    className="absolute top-8 left-0 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700 shadow-lg shadow-cyan-400/50"
                    style={{
                      width: `${getStagePercentage(Math.min(shipment.stage, stageLabels.length))}%`,
                    }}
                  ></div>

                  {/* Stage Markers */}
                  <div className="relative flex justify-between">
                    {stageLabels.map((label, index) => {
                      const stageNum = index + 1;
                      const isActive = shipment.stage >= stageNum;
                      const isCurrent = shipment.stage === stageNum;

                      return (
                        <div key={index} className="flex flex-col items-center">
                          {/* Animated Plane for Current Stage */}
                          <div className="relative mb-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                                isActive
                                  ? 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50 scale-110'
                                  : 'bg-slate-700 text-slate-400'
                              }`}
                            >
                              {isCurrent ? (
                                <span className="animate-bounce text-2xl">✈️</span>
                              ) : isActive ? (
                                '✓'
                              ) : (
                                stageNum
                              )}
                            </div>
                          </div>

                          {/* Label */}
                          <p
                            className={`text-sm font-semibold transition-colors duration-300 ${
                              isActive ? 'text-cyan-400' : 'text-slate-400'
                            }`}
                          >
                            {label}
                          </p>

                          {/* Current Location */}
                          {isCurrent && shipment.current_city && (
                            <p className="text-xs text-slate-300 mt-2 bg-slate-700 px-3 py-1 rounded-full whitespace-nowrap">
                              {shipment.current_city}, {shipment.current_state}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Current Location Display */}
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-600">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Current Location</p>
                <p className="text-lg font-semibold text-cyan-400">
                  {shipment.current_city}, {shipment.current_state}
                </p>
              </div>
            </div>

            {/* US MAP WITH ROUTE */}
            <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-xl font-bold mb-6 text-slate-100">Route Map</h2>
              <USMapWithRoute
                fromCity={shipment.from_city}
                fromState={shipment.from_state}
                toCity={shipment.to_city}
                toState={shipment.to_state}
                currentCity={shipment.current_city}
                currentState={shipment.current_state}
                stage={shipment.stage}
                onHold={shipment.on_hold}
              />
            </div>

            {/* SENDER CARD */}
            <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-xl font-bold mb-6 text-slate-100">Sent From</h2>
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-colors duration-300">
                <div className="flex items-start mb-4">
                  <span className="text-2xl mr-4">📦</span>
                  <div className="flex-1">
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Sender Name</p>
                    <p className="text-lg font-bold text-white mb-4">{shipment.sender_name}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email</p>
                        <a
                          href={`mailto:${shipment.sender_email}`}
                          className="text-blue-400 hover:text-cyan-300 transition-colors"
                        >
                          {shipment.sender_email}
                        </a>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Phone</p>
                        <a
                          href={`tel:${shipment.sender_phone}`}
                          className="text-blue-400 hover:text-cyan-300 transition-colors"
                        >
                          {shipment.sender_phone}
                        </a>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Address</p>
                      <p className="text-slate-200 font-mono text-sm">
                        {shipment.sender_street}
                        <br />
                        {shipment.from_city}, {shipment.from_state} {shipment.from_zip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RECEIVER CARD */}
            <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-xl font-bold mb-6 text-slate-100">Sent To</h2>
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-green-500/50 transition-colors duration-300">
                <div className="flex items-start mb-4">
                  <span className="text-2xl mr-4">📍</span>
                  <div className="flex-1">
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Recipient Name</p>
                    <p className="text-lg font-bold text-white mb-4">{shipment.client_name}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email</p>
                        <a
                          href={`mailto:${shipment.client_email}`}
                          className="text-green-400 hover:text-emerald-300 transition-colors"
                        >
                          {shipment.client_email}
                        </a>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Phone</p>
                        <a
                          href={`tel:${shipment.client_phone}`}
                          className="text-green-400 hover:text-emerald-300 transition-colors"
                        >
                          {shipment.client_phone}
                        </a>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Address</p>
                      <p className="text-slate-200 font-mono text-sm">
                        {shipment.to_street}
                        <br />
                        {shipment.to_city}, {shipment.to_state} {shipment.to_zip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TRACKING NUMBER */}
            <div className="bg-slate-800 border border-slate-600 rounded-2xl p-6 text-center">
              <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Tracking Number</p>
              <p className="text-2xl font-mono font-bold text-cyan-400">{shipment.tracking_number}</p>
            </div>
          </div>
        )}

        {!shipment && !error && !loading && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">📮</div>
            <p className="text-slate-300 text-lg">Enter a tracking number to view shipment details</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* US MAP COMPONENT */
function USMapWithRoute({
  fromCity,
  fromState,
  toCity,
  toState,
  currentCity,
  currentState,
  stage,
  onHold,
}: {
  fromCity: string;
  fromState: string;
  toCity: string;
  toState: string;
  currentCity: string;
  currentState: string;
  stage: number;
  onHold: boolean;
}) {
  // Approximate city coordinates for US Map
  const cityCoords: Record<string, [number, number]> = {
    'New York,NY': [920, 120],
    'Los Angeles,CA': [150, 280],
    'Chicago,IL': [520, 200],
    'Houston,TX': [480, 400],
    'Phoenix,AZ': [280, 350],
    'Philadelphia,PA': [880, 140],
    'San Antonio,TX': [440, 420],
    'San Diego,CA': [140, 320],
    'Dallas,TX': [500, 350],
    'San Jose,CA': [130, 260],
    'Austin,TX': [470, 380],
    'Jacksonville,FL': [900, 380],
    'Fort Worth,TX': [490, 340],
    'Columbus,OH': [700, 180],
    'Indianapolis,IN': [620, 170],
    'Charlotte,NC': [800, 250],
    'Seattle,WA': [90, 100],
    'Denver,CO': [350, 250],
    'Washington,DC': [840, 160],
    'Boston,MA': [920, 100],
    'El Paso,TX': [290, 420],
    'Nashville,TN': [680, 260],
    'Detroit,MI': [700, 120],
    'Oklahoma City,OK': [450, 300],
    'Memphis,TN': [600, 300],
    'Louisville,KY': [700, 220],
    'Baltimore,MD': [840, 150],
    'Portland,OR': [80, 130],
    'Milwaukee,WI': [600, 140],
    'Albuquerque,NM': [330, 340],
    'Tucson,AZ': [300, 380],
    'Fresno,CA': [160, 290],
    'Sacramento,CA': [140, 270],
    'Long Beach,CA': [150, 310],
    'Kansas City,MO': [500, 260],
    'Mesa,AZ': [290, 350],
    'Atlanta,GA': [800, 300],
  };

  const getCoords = (city: string, state: string): [number, number] => {
    const key = `${city},${state}`;
    return cityCoords[key] || [500, 250];
  };

  const fromCoords = getCoords(fromCity, fromState);
  const toCoords = getCoords(toCity, toState);
  const currentCoords = getCoords(currentCity, currentState);

  // Calculate current position on route
  const progress = stage / 5;
  const currentX = fromCoords[0] + (toCoords[0] - fromCoords[0]) * progress;
  const currentY = fromCoords[1] + (toCoords[1] - fromCoords[1]) * progress;

  return (
    <div className="w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      <svg viewBox="0 0 1000 500" className="w-full h-96 bg-gradient-to-br from-slate-900 to-blue-900">
        {/* USA Simplified Outline */}
        <path
          d="M 50 100 L 100 80 L 150 90 L 200 70 L 250 80 L 300 60 L 350 70 L 400 80 L 450 70 L 500 60 L 550 70 L 600 80 L 650 70 L 700 80 L 750 90 L 800 80 L 850 100 L 900 110 L 920 130 L 920 180 L 900 200 L 850 210 L 800 200 L 750 220 L 700 210 L 650 220 L 600 210 L 550 220 L 500 210 L 450 220 L 400 210 L 350 220 L 300 210 L 250 220 L 200 210 L 150 220 L 100 210 L 50 200 Z"
          fill="none"
          stroke="rgb(100, 116, 139)"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Route Line */}
        <line
          x1={fromCoords[0]}
          y1={fromCoords[1]}
          x2={toCoords[0]}
          y2={toCoords[1]}
          stroke="rgb(59, 130, 246)"
          strokeWidth="3"
          opacity="0.6"
          strokeDasharray="5,5"
        />

        {/* From Pin */}
        <g>
          <circle cx={fromCoords[0]} cy={fromCoords[1]} r="8" fill="rgb(34, 197, 94)" opacity="0.8" />
          <circle
            cx={fromCoords[0]}
            cy={fromCoords[1]}
            r="12"
            fill="none"
            stroke="rgb(34, 197, 94)"
            strokeWidth="2"
            opacity="0.4"
          />
        </g>

        {/* To Pin */}
        <g>
          <circle cx={toCoords[0]} cy={toCoords[1]} r="8" fill="rgb(59, 130, 246)" opacity="0.8" />
          <circle
            cx={toCoords[0]}
            cy={toCoords[1]}
            r="12"
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
            opacity="0.4"
          />
        </g>

        {/* Current Pin - Animated */}
        <g>
          <circle
            cx={currentX}
            cy={currentY}
            r="6"
            fill={onHold ? 'rgb(239, 68, 68)' : 'rgb(34, 211, 238)'}
            opacity="1"
          />
          <circle
            cx={currentX}
            cy={currentY}
            r="12"
            fill="none"
            stroke={onHold ? 'rgb(239, 68, 68)' : 'rgb(34, 211, 238)'}
            strokeWidth="2"
            opacity={onHold ? '0.7' : '0.3'}
            className={onHold ? 'animate-pulse' : ''}
          />
        </g>

        {/* City Labels */}
        <text x={fromCoords[0]} y={fromCoords[1] - 20} textAnchor="middle" fill="rgb(209, 213, 219)" fontSize="11">
          {fromCity}, {fromState}
        </text>
        <text x={toCoords[0]} y={toCoords[1] - 20} textAnchor="middle" fill="rgb(209, 213, 219)" fontSize="11">
          {toCity}, {toState}
        </text>
      </svg>

      {/* Legend */}
      <div className="bg-slate-900 px-6 py-4 flex gap-8 text-xs flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-slate-300">Origin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          <span className="text-slate-300">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-slate-300">Destination</span>
        </div>
      </div>
    </div>
  );
}
