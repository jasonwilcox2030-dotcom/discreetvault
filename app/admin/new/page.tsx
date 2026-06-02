'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, SERVICE_TIERS, generateTrackingNumber } from '@/lib/supabase';
import {
  Shield, ArrowLeft, Save, User, Send, MapPin, Package
} from 'lucide-react';

// US States with approximate map coordinates (for shipment map display)
const US_STATES = [
  { code: 'AL', name: 'Alabama', x: 670, y: 380 },
  { code: 'AK', name: 'Alaska', x: 150, y: 500 },
  { code: 'AZ', name: 'Arizona', x: 280, y: 360 },
  { code: 'AR', name: 'Arkansas', x: 590, y: 360 },
  { code: 'CA', name: 'California', x: 130, y: 290 },
  { code: 'CO', name: 'Colorado', x: 390, y: 280 },
  { code: 'CT', name: 'Connecticut', x: 870, y: 200 },
  { code: 'DE', name: 'Delaware', x: 840, y: 250 },
  { code: 'FL', name: 'Florida', x: 760, y: 460 },
  { code: 'GA', name: 'Georgia', x: 720, y: 390 },
  { code: 'HI', name: 'Hawaii', x: 280, y: 540 },
  { code: 'ID', name: 'Idaho', x: 270, y: 170 },
  { code: 'IL', name: 'Illinois', x: 620, y: 240 },
  { code: 'IN', name: 'Indiana', x: 660, y: 250 },
  { code: 'IA', name: 'Iowa', x: 570, y: 220 },
  { code: 'KS', name: 'Kansas', x: 510, y: 290 },
  { code: 'KY', name: 'Kentucky', x: 680, y: 290 },
  { code: 'LA', name: 'Louisiana', x: 590, y: 430 },
  { code: 'ME', name: 'Maine', x: 890, y: 130 },
  { code: 'MD', name: 'Maryland', x: 820, y: 250 },
  { code: 'MA', name: 'Massachusetts', x: 880, y: 180 },
  { code: 'MI', name: 'Michigan', x: 680, y: 190 },
  { code: 'MN', name: 'Minnesota', x: 560, y: 150 },
  { code: 'MS', name: 'Mississippi', x: 630, y: 400 },
  { code: 'MO', name: 'Missouri', x: 580, y: 290 },
  { code: 'MT', name: 'Montana', x: 340, y: 130 },
  { code: 'NE', name: 'Nebraska', x: 490, y: 230 },
  { code: 'NV', name: 'Nevada', x: 200, y: 260 },
  { code: 'NH', name: 'New Hampshire', x: 880, y: 160 },
  { code: 'NJ', name: 'New Jersey', x: 850, y: 220 },
  { code: 'NM', name: 'New Mexico', x: 360, y: 360 },
  { code: 'NY', name: 'New York', x: 830, y: 190 },
  { code: 'NC', name: 'North Carolina', x: 780, y: 320 },
  { code: 'ND', name: 'North Dakota', x: 470, y: 140 },
  { code: 'OH', name: 'Ohio', x: 710, y: 240 },
  { code: 'OK', name: 'Oklahoma', x: 520, y: 350 },
  { code: 'OR', name: 'Oregon', x: 170, y: 160 },
  { code: 'PA', name: 'Pennsylvania', x: 790, y: 220 },
  { code: 'RI', name: 'Rhode Island', x: 880, y: 200 },
  { code: 'SC', name: 'South Carolina', x: 760, y: 360 },
  { code: 'SD', name: 'South Dakota', x: 480, y: 190 },
  { code: 'TN', name: 'Tennessee', x: 680, y: 330 },
  { code: 'TX', name: 'Texas', x: 490, y: 430 },
  { code: 'UT', name: 'Utah', x: 290, y: 270 },
  { code: 'VT', name: 'Vermont', x: 860, y: 160 },
  { code: 'VA', name: 'Virginia', x: 790, y: 280 },
  { code: 'WA', name: 'Washington', x: 180, y: 110 },
  { code: 'WV', name: 'West Virginia', x: 760, y: 260 },
  { code: 'WI', name: 'Wisconsin', x: 610, y: 180 },
  { code: 'WY', name: 'Wyoming', x: 380, y: 200 },
];

export default function NewShipment() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    // Sender
    sender_name: '',
    sender_email: '',
    sender_phone: '',
    sender_street: '',
    from_city: '',
    from_state: '',
    from_zip: '',
    // Receiver (client)
    client_name: '',
    client_email: '',
    client_phone: '',
    client_notes: '',
    to_street: '',
    to_city: '',
    to_state: '',
    to_zip: '',
    // Package
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

    if (!form.sender_name) return setError('Sender name is required');
    if (!form.client_name) return setError('Receiver name is required');
    if (!form.from_city || !form.from_state) return setError('Origin city and state are required');
    if (!form.to_city || !form.to_state) return setError('Destination city and state are required');
    if (form.from_city.toLowerCase() === form.to_city.toLowerCase() && form.from_state === form.to_state) {
      return setError('From and To locations must be different');
    }

    setSaving(true);

    // Look up state coordinates for map
    const fromStateData = US_STATES.find((s) => s.code === form.from_state);
    const toStateData = US_STATES.find((s) => s.code === form.to_state);

    if (!fromStateData || !toStateData) {
      setError('Invalid state selection');
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
        // Sender
        sender_name: form.sender_name,
        sender_email: form.sender_email || null,
        sender_phone: form.sender_phone || null,
        sender_street: form.sender_street || null,
        // Receiver
        client_name: form.client_name,
        client_email: form.client_email || null,
        client_phone: form.client_phone || null,
        client_notes: form.client_notes || null,
        // From
        from_city: form.from_city,
        from_state: form.from_state,
        from_zip: form.from_zip || null,
        from_street: form.sender_street || null,
        from_x: fromStateData.x,
        from_y: fromStateData.y,
        // To
        to_city: form.to_city,
        to_state: form.to_state,
        to_zip: form.to_zip || null,
        to_street: form.to_street || null,
        to_x: toStateData.x,
        to_y: toStateData.y,
        current_city: form.from_city,
        current_x: fromStateData.x,
        current_y: fromStateData.y,
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
      const locationStr = `${form.from_city}, ${form.from_state}${form.from_zip ? ' ' + form.from_zip : ''}`;
      await supabase.from('shipment_events').insert({
        shipment_id: data.id,
        event_date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        event_time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        location: locationStr,
        status_text: 'Shipment Created — Awaiting Pickup',
        is_alert: false,
      });

      router.push(`/admin/${data.id}`);
    }
  };

  const inputStyle = {
    background: 'rgba(5,8,22,0.5)',
    border: '1px solid rgba(59,130,246,0.3)',
    color: '#ffffff',
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

          <div className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #005fcc, #DA291C)',
              boxShadow: '0 0 25px rgba(27,111,255,0.4)',
            }}>
            <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Create New Shipment</h1>
        <p className="text-sm mb-8" style={{ color: '#a8b2ba' }}>Fill in all details to generate tracking number</p>

        {/* SENDER */}
        <div className="rounded-2xl p-6 mb-6 backdrop-blur-xl"
          style={{ background: 'rgba(16,24,39,0.82)', border: '1px solid rgba(59,130,246,0.18)' }}>
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2" style={{ color: '#1b6fff' }}>
            <Send className="w-3 h-3" />
            Sender Information (Person Sending Package)
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Sender Name *</label>
              <input type="text" value={form.sender_name} onChange={(e) => setForm({ ...form, sender_name: e.target.value })}
                placeholder="Jane Smith" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Email</label>
              <input type="email" value={form.sender_email} onChange={(e) => setForm({ ...form, sender_email: e.target.value })}
                placeholder="sender@email.com" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Phone</label>
              <input type="tel" value={form.sender_phone} onChange={(e) => setForm({ ...form, sender_phone: e.target.value })}
                placeholder="(555) 123-4567" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Street Address</label>
              <input type="text" value={form.sender_street} onChange={(e) => setForm({ ...form, sender_street: e.target.value })}
                placeholder="123 Main St, Apt 5" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>From City *</label>
              <input type="text" value={form.from_city} onChange={(e) => setForm({ ...form, from_city: e.target.value })}
                placeholder="Los Angeles" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>From State *</label>
              <select value={form.from_state} onChange={(e) => setForm({ ...form, from_state: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle}>
                <option value="">Select state...</option>
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>From Zip</label>
              <input type="text" value={form.from_zip} onChange={(e) => setForm({ ...form, from_zip: e.target.value })}
                placeholder="90001" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* RECEIVER */}
        <div className="rounded-2xl p-6 mb-6 backdrop-blur-xl"
          style={{ background: 'rgba(16,24,39,0.82)', border: '1px solid rgba(59,130,246,0.18)' }}>
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2" style={{ color: '#1b6fff' }}>
            <User className="w-3 h-3" />
            Receiver Information (Client / Recipient)
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Receiver Name *</label>
              <input type="text" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                placeholder="John Doe" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Email</label>
              <input type="email" value={form.client_email} onChange={(e) => setForm({ ...form, client_email: e.target.value })}
                placeholder="client@email.com" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Phone</label>
              <input type="tel" value={form.client_phone} onChange={(e) => setForm({ ...form, client_phone: e.target.value })}
                placeholder="(555) 987-6543" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Street Address</label>
              <input type="text" value={form.to_street} onChange={(e) => setForm({ ...form, to_street: e.target.value })}
                placeholder="456 Oak Ave, Unit 12" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>To City *</label>
              <input type="text" value={form.to_city} onChange={(e) => setForm({ ...form, to_city: e.target.value })}
                placeholder="New York" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>To State *</label>
              <select value={form.to_state} onChange={(e) => setForm({ ...form, to_state: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle}>
                <option value="">Select state...</option>
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>To Zip</label>
              <input type="text" value={form.to_zip} onChange={(e) => setForm({ ...form, to_zip: e.target.value })}
                placeholder="10001" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Internal Notes (Admin Only)</label>
            <input type="text" value={form.client_notes} onChange={(e) => setForm({ ...form, client_notes: e.target.value })}
              placeholder="Special instructions..." className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
          </div>
        </div>

        {/* PACKAGE */}
        <div className="rounded-2xl p-6 mb-6 backdrop-blur-xl"
          style={{ background: 'rgba(16,24,39,0.82)', border: '1px solid rgba(59,130,246,0.18)' }}>
          <div className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2" style={{ color: '#1b6fff' }}>
            <Package className="w-3 h-3" />
            Package Details
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Weight</label>
              <input type="text" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })}
                placeholder="4 lbs 8 oz" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Service Tier</label>
              <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle}>
                {SERVICE_TIERS.map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2" style={{ color: '#6d7580' }}>Expected Delivery</label>
              <input type="text" value={form.eta} onChange={(e) => setForm({ ...form, eta: e.target.value })}
                placeholder="Nov 14, 2026" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-xl p-4 mb-6 text-sm" style={{
            background: 'rgba(218,41,28,0.1)', border: '1px solid rgba(218,41,28,0.3)', color: '#e84a38',
          }}>{error}</div>
        )}

        <div className="flex gap-3 justify-end">
          <button onClick={() => router.push('/admin')}
            className="px-6 py-3 rounded-xl font-bold text-sm transition-all"
            style={{ background: 'rgba(27,111,255,0.1)', border: '1px solid rgba(27,111,255,0.3)', color: '#1b6fff' }}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-50"
            style={{ background: '#DA291C', color: '#fff', boxShadow: '0 0 25px rgba(218,41,28,0.4)' }}>
            <Save className="w-4 h-4" />
            {saving ? 'Creating...' : 'Create Shipment'}
          </button>
        </div>
      </div>
    </main>
  );
}
