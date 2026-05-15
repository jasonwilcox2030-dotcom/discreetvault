'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// ==================== TYPES ====================
interface Shipment {
  id: string;
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
  stage: number; // 1-5
  on_hold: boolean;
  on_hold_reason?: string;
}

// ==================== COMPONENT ====================
export default function TrackingPage() {
  const searchParams = useSearchParams();
  const trackingId = searchParams.get('id');
  
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch shipment data
  useEffect(() => {
    if (!trackingId) {
      setError('No tracking ID provided');
      setLoading(false);
      return;
    }

    const fetchShipment = async () => {
      try {
        const response = await fetch(`/api/shipments/${trackingId}`);
        if (!response.ok) throw new Error('Shipment not found');
        const data = await response.json();
        setShipment(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load shipment');
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [trackingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="text-white text-xl">Loading tracking information...</div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="text-red-500 text-xl">Error: {error || 'Shipment not found'}</div>
      </div>
    );
  }

  // Map visual stage (1-5) to progress stage (1-3)
  const getProgressStage = (stage: number): 1 | 2 | 3 => {
    if (stage <= 2) return 1; // Shipped
    if (stage <= 4) return 2; // In Transit
    return 3; // Delivered
  };

  const progressStage = getProgressStage(shipment.stage);
  const stageLabels = ['Shipped', 'In Transit', 'Delivered'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      {/* ON HOLD OVERLAY */}
      {shipment.on_hold && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-red-950 border-2 border-red-500 rounded-xl p-8 max-w-md animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-red-400">SHIPMENT ON HOLD</h2>
            </div>
            <p className="text-red-200 mb-2">Reason:</p>
            <p className="text-lg font-semibold text-red-100">{shipment.on_hold_reason || 'No reason provided'}</p>
            <p className="text-red-300 text-sm mt-4">Please contact support for more information.</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Track Your Shipment
          </h1>
          <p className="text-slate-400">Tracking ID: {trackingId}</p>
        </div>

        {/* ==================== PROGRESS BAR ==================== */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            {stageLabels.map((label, index) => {
              const stageNum = (index + 1) as 1 | 2 | 3;
              const isActive = stageNum <= progressStage;
              const isCurrentStage = stageNum === progressStage;

              return (
                <div key={index} className="flex-1">
                  {/* Stage Circle with Plane Icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50'
                          : 'bg-slate-700'
                      }`}
                    >
                      {isCurrentStage ? (
                        <span className="text-2xl animate-bounce">✈️</span>
                      ) : isActive ? (
                        <span>✓</span>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <p className={`mt-3 font-semibold text-center ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {label}
                    </p>
                  </div>

                  {/* Connector Line */}
                  {index < stageLabels.length - 1 && (
                    <div className="flex-1 h-1 bg-slate-700 mx-2 mt-8 relative bottom-[45px]">
                      {isActive && (
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse"></div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Location Info */}
          <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
            <p className="text-slate-300 text-sm">Current Location:</p>
            <p className="text-xl font-bold text-cyan-400">
              {shipment.current_city}, {shipment.current_state}
            </p>
          </div>
        </div>

        {/* ==================== SENDER & RECEIVER CARDS ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* SENDER CARD */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📤</span>
              <h2 className="text-2xl font-bold text-cyan-400">From</h2>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm">Sender Name</p>
                <p className="text-lg font-semibold">{shipment.sender_name}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-cyan-300 hover:text-cyan-200 cursor-pointer">
                  {shipment.sender_email}
                </p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Phone</p>
                <p className="text-lg">{shipment.sender_phone}</p>
              </div>

              <div className="pt-3 border-t border-slate-700">
                <p className="text-slate-400 text-sm">Street Address</p>
                <p className="text-lg font-medium">{shipment.sender_street}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">City</p>
                  <p className="text-lg">{shipment.from_city}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">State</p>
                  <p className="text-lg">{shipment.from_state}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm">ZIP Code</p>
                <p className="text-lg">{shipment.from_zip}</p>
              </div>
            </div>
          </div>

          {/* RECEIVER CARD */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📥</span>
              <h2 className="text-2xl font-bold text-blue-400">To</h2>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm">Recipient Name</p>
                <p className="text-lg font-semibold">{shipment.client_name}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-blue-300 hover:text-blue-200 cursor-pointer">
                  {shipment.client_email}
                </p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Phone</p>
                <p className="text-lg">{shipment.client_phone}</p>
              </div>

              <div className="pt-3 border-t border-slate-700">
                <p className="text-slate-400 text-sm">Street Address</p>
                <p className="text-lg font-medium">{shipment.to_street}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">City</p>
                  <p className="text-lg">{shipment.to_city}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">State</p>
                  <p className="text-lg">{shipment.to_state}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm">ZIP Code</p>
                <p className="text-lg">{shipment.to_zip}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== INTERACTIVE MAP ==================== */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 overflow-hidden">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">📍 Route Map</h2>
          <TrackingMap shipment={shipment} />
        </div>
      </div>

      {/* CSS ANIMATIONS */}
      <style jsx>{`
        @keyframes planeFly {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }

        @keyframes pinPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .animate-plane {
          animation: planeFly 2s ease-in-out infinite;
        }

        .animate-pin-pulse {
          animation: pinPulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// ==================== TRACKING MAP COMPONENT ====================
function TrackingMap({ shipment }: { shipment: Shipment }) {
  const [mapWidth, setMapWidth] = useState(800);

  useEffect(() => {
    setMapWidth(typeof window !== 'undefined' ? window.innerWidth - 100 : 800);
  }, []);

  const mapHeight = 400;
  const padding = 40;

  // Simple US bounding box (approximate)
  const usMinLng = -125;
  const usMaxLng = -65;
  const usMinLat = 24;
  const usMaxLat = 50;

  // Convert lat/lng to SVG coordinates
  const lngToX = (lng: number) => {
    return padding + ((lng - usMinLng) / (usMaxLng - usMinLng)) * (mapWidth - padding * 2);
  };

  const latToY = (lat: number) => {
    return padding + ((usMaxLat - lat) / (usMaxLat - usMinLat)) * (mapHeight - padding * 2);
  };

  // Estimate sender/receiver coordinates (rough US map positions)
  // This should ideally use real lat/lng from your database
  const senderLng = -95;
  const senderLat = 37;
  const receiverLng = -74;
  const receiverLat = 40;

  const senderX = lngToX(senderLng);
  const senderY = latToY(senderLat);
  const receiverX = lngToX(receiverLng);
  const receiverY = latToY(receiverLat);

  const currentX = lngToX(shipment.current_x || ((senderLng + receiverLng) / 2));
  const currentY = latToY(shipment.current_y || ((senderLat + receiverLat) / 2));

  return (
    <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
      <svg
        width={mapWidth}
        height={mapHeight}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className="border border-slate-700 rounded"
      >
        {/* US MAP OUTLINE (simplified) */}
        <path
          d="M 50 100 L 150 80 L 200 90 L 220 110 L 210 130 L 180 140 L 150 135 L 100 145 L 60 140 Z"
          fill="none"
          stroke="#1e293b"
          strokeWidth="2"
        />

        {/* ROUTE LINE */}
        <line
          x1={senderX}
          y1={senderY}
          x2={receiverX}
          y2={receiverY}
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeDasharray="5,5"
          opacity="0.8"
        />

        {/* GRADIENT DEFINITION */}
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* SENDER PIN */}
        <g>
          <circle cx={senderX} cy={senderY} r="8" fill="#06b6d4" opacity="0.3" />
          <circle cx={senderX} cy={senderY} r="5" fill="#06b6d4" />
          <text x={senderX} y={senderY - 20} textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="bold">
            {shipment.from_city}
          </text>
        </g>

        {/* RECEIVER PIN */}
        <g>
          <circle cx={receiverX} cy={receiverY} r="8" fill="#3b82f6" opacity="0.3" />
          <circle cx={receiverX} cy={receiverY} r="5" fill="#3b82f6" />
          <text x={receiverX} y={receiverY - 20} textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">
            {shipment.to_city}
          </text>
        </g>

        {/* CURRENT LOCATION PIN */}
        <g className={shipment.on_hold ? 'animate-pin-pulse' : ''}>
          <circle
            cx={currentX}
            cy={currentY}
            r="10"
            fill={shipment.on_hold ? '#ef4444' : '#10b981'}
            opacity={shipment.on_hold ? 0.4 : 0.3}
          />
          <circle cx={currentX} cy={currentY} r="6" fill={shipment.on_hold ? '#ef4444' : '#10b981'} />
          <text
            x={currentX}
            y={currentY - 25}
            textAnchor="middle"
            fill={shipment.on_hold ? '#ef4444' : '#10b981'}
            fontSize="12"
            fontWeight="bold"
          >
            {shipment.on_hold ? '⚠️ On Hold' : '📍 Current'}
          </text>
        </g>
      </svg>
    </div>
  );
}
