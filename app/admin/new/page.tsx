'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, US_CITIES, SERVICE_TIERS, generateTrackingNumber } from '@/lib/supabase';
import {
  Shield, ArrowLeft, Save, User, Mail, Phone, FileText,
  MapPin, Package, Truck
} from 'lucide-react';

export default function NewShipment() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    client_notes: '',
    from_city_key: '',
    to_city_key: '',
    weight: '',
    service: SERVICE_TIERS[3],
    eta: '',
  });

  useEffect(() => {
    const auth = sessionStorage.getItem('dv_admin_auth');
    if (auth !== 'authenticated') {
      router.push('/admin/login');
    } else {
      setAuthed(true);
    }
  }, []);

  const handleSave = async () => {
    setError('');

    if (!form.client_name) return setError('Client name is required');
    if (!form.from_city_key) return setError('From city is required');
    if (!form.to_city_key) return setError('To city is required');
    if (form.from_city_key === form.to_city_key) return setError('From and To cities must be different');

    setSaving(true);

    const fromCity = US_CITIES.find((c) => `${c.city}-${c.state}` === form.from_city_key);
    const toCity = US_CITIES.find((c) => `${c.city}-${c.state}` === form.to_city_key);

    if (!fromCity || !toCity) {
      setError('Invalid city selection');
      setSaving(false);
      return;
    }

    const tracking = generateTrackingNumber();

    const { data, error: dbError } = await supabase
      .from('shipments')
      .insert({
        tracking_number: tracking,
        status: 'Created',
        stage: 1,
        on_hold: false,
        eta: form.eta || 'Calculating...',
        client_name: form.client_name,
        client_email: form.client_email || null,
        client_phone: form.client_phone || null,
        client_notes: form.client_notes || null,
        from_city: fromCity.city,
        from_state: fromCity.state,
        from_zip: fromCity.zip,
        from_x: fromCity.x,
        from_y: fromCity.y,
        to_city: toCity.city,
        to_state: toCity.state,
        to_zip: toCity.zip,
        to_x: toCity.x,
        to_y: toCity.y,
        current_city: fromCity.city,
        current_x: fromCity.x,
        current_y: fromCity.y,
        weight: form.weight || null,
        service: form.service,
      })
      .select()
      .single();

    if (dbError) {
      setError('Failed to create shipment: ' + dbError.message);
      setSaving(false);
      return;
    }

    if (data) {
      const now = new Date();
      await supabase.from('shipment_events').insert({
        shipment_id: data.id,
        event_date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        event_time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        location: `${fromCity.city}, ${fromCity.state} ${fromCity.zip}`,
        status_text: 'Shipment Created — Awaiting Pickup',
        is_alert: false,
      });

      router.push(`/admin/${data.id}`);
    }
  };

  if (!authed) return null;

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: '#050816', color: '#ffffff' }}>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, #0b1730 0%, #050816 60%)' }} />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px]" style={{ background: 'rgba(27,111,255,0.1)' }} />
      </div>

      <header className="relative z-50 border-b backdrop-blur-xl" style={{ borderColor: 'rgba(59,130,246,0.18)', background: 'rgba(5,8,22,0.85)' }}>
        <div className="flex items-center justify-between py-4 px-6 max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/admin')}
            className="flex items-center gap-2 text-sm font-bold transition-all hover:scale-105"
            style={{ color: '#1b6fff' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #005fcc, #DA291C)',
                boxShadow: '0 0 25px rgba(27,111,255,0.4)',
              }}>
              <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Create New Shipment</h1>
        <p className="text-sm mb-8" style={{ color: '#a8b2ba' }}>Fill in all details to generate tracking number</p>

        <div className="rounded-2xl p-6 mb-6 backdrop-blur-xl"
          style={{
            background: 'rgba(16,24,39,0.82)',
            border: '1px solid rgba(59,130,246,0.18)',
          }}>
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2" style={{ color: '#1b6fff' }}>
            <User className="w-3 h-3" />
            Client Information
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                Client Name *
              </label>
              <input
                type="text"
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#ffffff',
                }}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                Email
              </label>
              <input
                type="email"
                value={form.client_email}
                onChange={(e) => setForm({ ...form, client_email: e.target.value })}
                placeholder="client@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#ffffff',
                }}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                Phone
              </label>
              <input
                type="tel"
                value={form.client_phone}
                onChange={(e) => setForm({ ...form, client_phone: e.target.value })}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#ffffff',
                }}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                Internal Notes
              </label>
              <input
                type="text"
                value={form.client_notes}
                onChange={(e) => setForm({ ...form, client_notes: e.target.value })}
                placeholder="Special instructions..."
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#ffffff',
                }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6 mb-6 backdrop-blur-xl"
          style={{
            background: 'rgba(16,24,39,0.82)',
            border: '1px solid rgba(59,130,246,0.18)',
          }}>
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2" style={{ color: '#1b6fff' }}>
            <MapPin className="w-3 h-3" />
            Route
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                From City *
              </label>
              <select
                value={form.from_city_key}
                onChange={(e) => setForm({ ...form, from_city_key: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#ffffff',
                }}>
                <option value="">Select origin city...</option>
                {US_CITIES.map((c) => (
                  <option key={`${c.city}-${c.state}`} value={`${c.city}-${c.state}`}>
                    {c.city}, {c.state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                To City *
              </label>
              <select
                value={form.to_city_key}
                onChange={(e) => setForm({ ...form, to_city_key: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#ffffff',
                }}>
                <option value="">Select destination city...</option>
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
            Package Details
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                Weight
              </label>
              <input
                type="text"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                placeholder="4 lbs 8 oz"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#ffffff',
                }}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                Service Tier
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#ffffff',
                }}>
                {SERVICE_TIERS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>
                Expected Delivery
              </label>
              <input
                type="text"
                value={form.eta}
                onChange={(e) => setForm({ ...form, eta: e.target.value })}
                placeholder="Nov 14, 2026"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: 'rgba(5,8,22,0.5)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#ffffff',
                }}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-xl p-4 mb-6 text-sm" style={{
            background: 'rgba(218,41,28,0.1)',
            border: '1px solid rgba(218,41,28,0.3)',
            color: '#e84a38',
          }}>
            {error}
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-3 rounded-xl font-bold text-sm transition-all"
            style={{
              background: 'rgba(27,111,255,0.1)',
              border: '1px solid rgba(27,111,255,0.3)',
              color: '#1b6fff',
            }}>
            Cancel
          </button>

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
            {saving ? 'Creating...' : 'Create Shipment'}
          </button>
        </div>
      </div>
    </main>
  );
}
