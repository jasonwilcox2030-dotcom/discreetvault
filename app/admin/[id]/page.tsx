'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase, US_CITIES, SERVICE_TIERS, STATUS_OPTIONS } from '@/lib/supabase';
import {
  Shield, ArrowLeft, Save, Trash2, AlertTriangle, Plus,
  MapPin, Package, Clock, CheckCircle2, X
} from 'lucide-react';

export default function EditShipment() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [shipment, setShipment] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [newEvent, setNewEvent] = useState({
    location: '',
    status_text: '',
    is_alert: false,
  });

  useEffect(() => {
    const auth = sessionStorage.getItem('dv_admin_auth');
    if (auth !== 'authenticated') {
      router.push('/admin/login');
    } else {
      setAuthed(true);
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    setLoading(true);

    const { data: shipData } = await supabase
      .from('shipments')
      .select('*')
      .eq('id', id)
      .single();

    const { data: eventsData } = await supabase
      .from('shipment_events')
      .select('*')
      .eq('shipment_id', id)
      .order('created_at', { ascending: false });

    if (shipData) {
      setShipment(shipData);
      shipData.from_city_key = `${shipData.from_city}-${shipData.from_state}`;
      shipData.to_city_key = `${shipData.to_city}-${shipData.to_state}`;
    }
    if (eventsData) setEvents(eventsData);

    setLoading(false);
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);

    const fromCity = US_CITIES.find((c) => `${c.city}-${c.state}` === shipment.from_city_key);
    const toCity = US_CITIES.find((c) => `${c.city}-${c.state}` === shipment.to_city_key);
    const currentCity = US_CITIES.find((c) => c.city === shipment.current_city);

    const updates: any = {
      status: shipment.status,
      stage: shipment.stage,
      on_hold: shipment.on_hold,
      on_hold_reason: shipment.on_hold ? shipment.on_hold_reason : null,
      eta: shipment.eta,
      client_name: shipment.client_name,
      client_email: shipment.client_email,
      client_phone: shipment.client_phone,
      client_notes: shipment.client_notes,
      weight: shipment.weight,
      service: shipment.service,
      updated_at: new Date().toISOString(),
    };

    if (fromCity) {
      updates.from_city = fromCity.city;
      updates.from_state = fromCity.state;
      updates.from_zip = fromCity.zip;
      updates.from_x = fromCity.x;
      updates.from_y = fromCity.y;
    }

    if (toCity) {
      updates.to_city = toCity.city;
      updates.to_state = toCity.state;
      updates.to_zip = toCity.zip;
      updates.to_x = toCity.x;
      updates.to_y = toCity.y;
    }

    if (currentCity) {
      updates.current_city = currentCity.city;
      updates.current_x = currentCity.x;
      updates.current_y = currentCity.y;
    }

    const { error: dbError } = await supabase
      .from('shipments')
      .update(updates)
      .eq('id', id);

    if (dbError) {
      setError('Failed to save: ' + dbError.message);
      setSaving(false);
      return;
    }

    setSuccess('Shipment updated successfully');
    setSaving(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleAddEvent = async () => {
    if (!newEvent.location || !newEvent.status_text) {
      setError('Location and status are required for events');
      return;
    }

    const now = new Date();
    await supabase.from('shipment_events').insert({
      shipment_id: id,
      event_date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      event_time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      location: newEvent.location,
      status_text: newEvent.status_text,
      is_alert: newEvent.is_alert,
    });

    setNewEvent({ location: '', status_text: '', is_alert: false });
    loadData();
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Delete this event?')) return;
    await supabase.from('shipment_events').delete().eq('id', eventId);
    loadData();
  };

  const handleDeleteShipment = async () => {
    if (!confirm('Delete this entire shipment? This cannot be undone.')) return;
    await supabase.from('shipments').delete().eq('id', id);
    router.push('/admin');
  };

  if (!authed) return null;
  if (loading) return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: '#050816', color: '#a8b2ba' }}>
      Loading shipment...
    </main>
  );
  if (!shipment) return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: '#050816', color: '#a8b2ba' }}>
      Shipment not found.
    </main>
  );

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: '#050816', color: '#ffffff' }}>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, #0b1730 0%, #050816 60%)' }} />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px]" style={{ background: 'rgba(27,111,255,0.1)' }} />
      </div>

      <header className="relative z-50 border-b backdrop-blur-xl" style={{ borderColor: 'rgba(59,130,246,0.18)', background: 'rgba(5,8,22,0.85)' }}>
        <div className="flex items-center justify-between py-4 px-6 max-w-5xl mx-auto">
          <button
            onClick={() => router.push('/admin')}
            className="flex items-center gap-2 text-sm font-bold transition-all hover:scale-105"
            style={{ color: '#1b6fff' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #005fcc, #DA291C)',
              boxShadow: '0 0 25px rgba(27,111,255,0.4)',
            }}>
            <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#1b6fff' }}>
            Tracking Number
          </div>
          <div className="font-mono text-sm md:text-base mb-2 break-all" style={{ color: '#a8b2ba' }}>
            {shipment.tracking_number}
          </div>
          <h1 className="text-3xl md:text-4xl font-black">{shipment.client_name}</h1>
        </div>

        {success && (
          <div className="rounded-xl p-4 mb-6 text-sm" style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.3)',
            color: '#10b981',
          }}>✓ {success}</div>
        )}

        {error && (
          <div className="rounded-xl p-4 mb-6 text-sm" style={{
            background: 'rgba(218,41,28,0.1)',
            border: '1px solid rgba(218,41,28,0.3)',
            color: '#e84a38',
          }}>{error}</div>
        )}

        <div className="rounded-2xl p-6 mb-6 backdrop-blur-xl"
          style={{
            background: 'rgba(16,24,39,0.82)',
            border: '1px solid ' + (shipment.on_hold ? 'rgba(218,41,28,0.4)' : 'rgba(59,130,246,0.18)'),
            boxShadow: shipment.on_hold ? '0 0 30px rgba(218,41,28,0.15)' : 'none',
          }}>
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2" style={{ color: '#1b6fff' }}>
            <Package className="w-3 h-3" />
            Status Control
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                Current Status
              </label>
              <select
                value={shipment.stage}
                onChange={(e) => {
                  const stage = parseInt(e.target.value);
                  const opt = STATUS_OPTIONS.find((s) => s.stage === stage);
                  setShipment({ ...shipment, stage, status: opt?.label || shipment.status });
                }}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#ffffff',
                }}>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.stage} value={s.stage}>{s.stage}. {s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                Expected Delivery
              </label>
              <input
                type="text"
                value={shipment.eta || ''}
                onChange={(e) => setShipment({ ...shipment, eta: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#ffffff',
                }}
              />
            </div>
          </div>

          <div className="rounded-xl p-4" style={{
            background: shipment.on_hold ? 'rgba(218,41,28,0.1)' : 'rgba(5,8,22,0.5)',
            border: '1px solid ' + (shipment.on_hold ? 'rgba(218,41,28,0.3)' : 'rgba(59,130,246,0.2)'),
          }}>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={shipment.on_hold || false}
                onChange={(e) => setShipment({ ...shipment, on_hold: e.target.checked })}
                className="w-5 h-5"
              />
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" style={{ color: shipment.on_hold ? '#DA291C' : '#6d7580' }} />
                <span className="font-bold text-sm">Mark shipment as ON HOLD</span>
              </div>
            </label>

            {shipment.on_hold && (
              <div className="mt-4">
                <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#DA291C' }}>
                  Reason for Hold
                </label>
                <textarea
                  value={shipment.on_hold_reason || ''}
                  onChange={(e) => setShipment({ ...shipment, on_hold_reason: e.target.value })}
                  placeholder="Customs verification required..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                  style={{
                    background: 'rgba(5,8,22,0.5)',
                    border: '1px solid rgba(218,41,28,0.3)',
                    color: '#ffffff',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl p-6 mb-6 backdrop-blur-xl"
          style={{
            background: 'rgba(16,24,39,0.82)',
            border: '1px solid rgba(59,130,246,0.18)',
          }}>
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2" style={{ color: '#1b6fff' }}>
            <MapPin className="w-3 h-3" />
            Current Location (shows on map)
          </div>

          <select
            value={shipment.current_city || ''}
            onChange={(e) => setShipment({ ...shipment, current_city: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{
              background: 'rgba(5,8,22,0.5)',
              border: '1px solid rgba(59,130,246,0.3)',
              color: '#ffffff',
            }}>
            <option value="">Select current location...</option>
            {US_CITIES.map((c) => (
              <option key={`${c.city}-${c.state}`} value={c.city}>
                {c.city}, {c.state}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl p-6 mb-6 backdrop-blur-xl"
          style={{
            background: 'rgba(16,24,39,0.82)',
            border: '1px solid rgba(59,130,246,0.18)',
          }}>
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6" style={{ color: '#1b6fff' }}>
            Client Information
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={shipment.client_name || ''}
              onChange={(e) => setShipment({ ...shipment, client_name: e.target.value })}
              placeholder="Client Name"
              className="px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.3)', color: '#ffffff' }}
            />
            <input
              type="email"
              value={shipment.client_email || ''}
              onChange={(e) => setShipment({ ...shipment, client_email: e.target.value })}
              placeholder="Email"
              className="px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.3)', color: '#ffffff' }}
            />
            <input
              type="tel"
              value={shipment.client_phone || ''}
              onChange={(e) => setShipment({ ...shipment, client_phone: e.target.value })}
              placeholder="Phone"
              className="px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.3)', color: '#ffffff' }}
            />
            <input
              type="text"
              value={shipment.client_notes || ''}
              onChange={(e) => setShipment({ ...shipment, client_notes: e.target.value })}
              placeholder="Internal Notes"
              className="px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.3)', color: '#ffffff' }}
            />
          </div>
        </div>

        <div className="rounded-2xl p-6 mb-6 backdrop-blur-xl"
          style={{
            background: 'rgba(16,24,39,0.82)',
            border: '1px solid rgba(59,130,246,0.18)',
          }}>
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2" style={{ color: '#1b6fff' }}>
            <MapPin className="w-3 h-3" />
            Route Addresses
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                From
              </label>
              <select
                value={shipment.from_city_key}
                onChange={(e) => setShipment({ ...shipment, from_city_key: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.3)', color: '#ffffff' }}>
                {US_CITIES.map((c) => (
                  <option key={`${c.city}-${c.state}`} value={`${c.city}-${c.state}`}>
                    {c.city}, {c.state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                To
              </label>
              <select
                value={shipment.to_city_key}
                onChange={(e) => setShipment({ ...shipment, to_city_key: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.3)', color: '#ffffff' }}>
                {US_CITIES.map((c) => (
                  <option key={`${c.city}-${c.state}`} value={`${c.city}-${c.state}`}>
                    {c.city}, {c.state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6 mb-6 backdrop-blur-xl"
          style={{
            background: 'rgba(16,24,39,0.82)',
            border: '1px solid rgba(59,130,246,0.18)',
          }}>
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2" style={{ color: '#1b6fff' }}>
            <Package className="w-3 h-3" />
            Package
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={shipment.weight || ''}
              onChange={(e) => setShipment({ ...shipment, weight: e.target.value })}
              placeholder="Weight"
              className="px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.3)', color: '#ffffff' }}
            />
            <select
              value={shipment.service}
              onChange={(e) => setShipment({ ...shipment, service: e.target.value })}
              className="px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.3)', color: '#ffffff' }}>
              {SERVICE_TIERS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 justify-end mb-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-50"
            style={{
              background: '#DA291C',
              color: '#fff',
              boxShadow: '0 0 25px rgba(218,41,28,0.4)',
            }}>
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className="rounded-2xl p-6 mb-6 backdrop-blur-xl"
          style={{
            background: 'rgba(16,24,39,0.82)',
            border: '1px solid rgba(59,130,246,0.18)',
          }}>
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2" style={{ color: '#1b6fff' }}>
            <Clock className="w-3 h-3" />
            Tracking Events ({events.length})
          </div>

          <div className="rounded-xl p-4 mb-6" style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <div className="text-xs uppercase tracking-wider font-bold mb-3" style={{ color: '#1b6fff' }}>Add New Event</div>
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Location (e.g., Chicago, IL 60607)"
                className="px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.3)', color: '#ffffff' }}
              />
              <input
                type="text"
                value={newEvent.status_text}
                onChange={(e) => setNewEvent({ ...newEvent, status_text: e.target.value })}
                placeholder="Event description"
                className="px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.3)', color: '#ffffff' }}
              />
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={newEvent.is_alert}
                  onChange={(e) => setNewEvent({ ...newEvent, is_alert: e.target.checked })}
                />
                <span style={{ color: '#DA291C' }}>Mark as alert (red)</span>
              </label>
              <button
                onClick={handleAddEvent}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105"
                style={{
                  background: '#1b6fff',
                  color: '#fff',
                }}>
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>
          </div>

          {events.length === 0 ? (
            <p className="text-center py-6 text-sm" style={{ color: '#6d7580' }}>No events yet</p>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="rounded-xl p-4 flex items-start justify-between gap-3" style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid ' + (event.is_alert ? 'rgba(218,41,28,0.3)' : 'rgba(59,130,246,0.15)'),
                }}>
                  <div className="flex-1">
                    <div className="font-bold text-sm mb-1 flex items-center gap-2" style={{ color: event.is_alert ? '#DA291C' : '#ffffff' }}>
                      {event.is_alert && <AlertTriangle className="w-3.5 h-3.5" />}
                      {event.status_text}
                    </div>
                    <div className="text-xs flex items-center gap-1.5" style={{ color: '#a8b2ba' }}>
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                    <div className="text-xs mt-1" style={{ color: '#6d7580' }}>
                      {event.event_date} • {event.event_time}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 rounded-lg transition-all hover:scale-105"
                    style={{ background: 'rgba(218,41,28,0.1)', border: '1px solid rgba(218,41,28,0.3)' }}>
                    <X className="w-4 h-4" style={{ color: '#DA291C' }} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl p-6 backdrop-blur-xl"
          style={{
            background: 'rgba(218,41,28,0.05)',
            border: '1px solid rgba(218,41,28,0.2)',
          }}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-bold mb-1" style={{ color: '#DA291C' }}>Danger Zone</h3>
              <p className="text-sm" style={{ color: '#a8b2ba' }}>Permanently delete this shipment and all events</p>
            </div>
            <button
              onClick={handleDeleteShipment}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{
                background: '#DA291C',
                color: '#fff',
              }}>
              <Trash2 className="w-4 h-4" />
              Delete Shipment
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
