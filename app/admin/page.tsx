'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Shield, Plus, Search, LogOut, Package, Truck,
  AlertTriangle, CheckCircle2, MoreVertical, Edit3,
  Clock, MapPin
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const auth = sessionStorage.getItem('dv_admin_auth');
    if (auth !== 'authenticated') {
      router.push('/admin/login');
    } else {
      setAuthed(true);
      loadShipments();
    }
  }, []);

  const loadShipments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setShipments(data);
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dv_admin_auth');
    router.push('/admin/login');
  };

  const filtered = shipments.filter((s) => {
    const matchesSearch = !search ||
      s.tracking_number.toLowerCase().includes(search.toLowerCase()) ||
      s.client_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.to_city?.toLowerCase().includes(search.toLowerCase());

    if (filter === 'all') return matchesSearch;
    if (filter === 'in_transit') return matchesSearch && s.stage >= 2 && s.stage <= 4 && !s.on_hold;
    if (filter === 'on_hold') return matchesSearch && s.on_hold;
    if (filter === 'delivered') return matchesSearch && s.stage === 5;
    return matchesSearch;
  });

  const stats = {
    total: shipments.length,
    in_transit: shipments.filter((s) => s.stage >= 2 && s.stage <= 4 && !s.on_hold).length,
    on_hold: shipments.filter((s) => s.on_hold).length,
    delivered: shipments.filter((s) => s.stage === 5).length,
  };

  if (!authed) return null;

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: '#050816', color: '#ffffff' }}>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, #0b1730 0%, #050816 60%)' }} />
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(27,111,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(27,111,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px]" style={{ background: 'rgba(27,111,255,0.1)' }} />
      </div>

      <header className="relative z-50 border-b backdrop-blur-xl" style={{ borderColor: 'rgba(59,130,246,0.18)', background: 'rgba(5,8,22,0.85)' }}>
        <div className="flex items-center justify-between py-4 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #005fcc, #DA291C)',
                boxShadow: '0 0 25px rgba(27,111,255,0.4)',
              }}>
              <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-lg font-extrabold text-white leading-none">Admin Panel</div>
              <div className="text-[10px] uppercase tracking-[0.28em] font-bold" style={{ color: '#1b6fff' }}>Discreet Vault</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{
              background: 'rgba(218,41,28,0.1)',
              border: '1px solid rgba(218,41,28,0.3)',
              color: '#DA291C',
            }}>
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-1">Shipments Dashboard</h1>
            <p className="text-sm" style={{ color: '#a8b2ba' }}>Manage all client shipments and tracking</p>
          </div>
          <button
            onClick={() => router.push('/admin/new')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{
              background: '#DA291C',
              color: '#fff',
              boxShadow: '0 0 25px rgba(218,41,28,0.4)',
            }}>
            <Plus className="w-4 h-4" />
            New Shipment
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, Icon: Package, color: '#1b6fff' },
            { label: 'In Transit', value: stats.in_transit, Icon: Truck, color: '#1b6fff' },
            { label: 'On Hold', value: stats.on_hold, Icon: AlertTriangle, color: '#DA291C' },
            { label: 'Delivered', value: stats.delivered, Icon: CheckCircle2, color: '#10b981' },
          ].map((stat) => {
            const StatIcon = stat.Icon;
            return (
              <div key={stat.label} className="rounded-2xl p-5 backdrop-blur-xl"
                style={{
                  background: 'rgba(16,24,39,0.82)',
                  border: '1px solid rgba(59,130,246,0.18)',
                }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#6d7580' }}>{stat.label}</span>
                  <StatIcon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <div className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl p-4 mb-6 backdrop-blur-xl"
          style={{
            background: 'rgba(16,24,39,0.82)',
            border: '1px solid rgba(59,130,246,0.18)',
          }}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl"
              style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <Search className="w-4 h-4" style={{ color: '#1b6fff' }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tracking number, client name, city..."
                className="flex-1 bg-transparent text-sm focus:outline-none py-1"
                style={{ color: '#ffffff' }}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'all', label: 'All' },
                { id: 'in_transit', label: 'In Transit' },
                { id: 'on_hold', label: 'On Hold' },
                { id: 'delivered', label: 'Delivered' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background: filter === f.id ? '#1b6fff' : 'rgba(27,111,255,0.1)',
                    border: '1px solid ' + (filter === f.id ? '#1b6fff' : 'rgba(27,111,255,0.3)'),
                    color: filter === f.id ? '#fff' : '#1b6fff',
                  }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12" style={{ color: '#6d7580' }}>Loading shipments...</div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl p-12 text-center backdrop-blur-xl"
              style={{
                background: 'rgba(16,24,39,0.82)',
                border: '1px solid rgba(59,130,246,0.18)',
              }}>
              <Package className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: '#1b6fff' }} />
              <p className="text-lg font-bold mb-2">No shipments yet</p>
              <p className="text-sm mb-6" style={{ color: '#a8b2ba' }}>Create your first shipment to get started</p>
              <button
                onClick={() => router.push('/admin/new')}
                className="px-5 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2"
                style={{
                  background: '#DA291C',
                  color: '#fff',
                  boxShadow: '0 0 25px rgba(218,41,28,0.4)',
                }}>
                <Plus className="w-4 h-4" />
                Create First Shipment
              </button>
            </div>
          ) : (
            filtered.map((s) => (
              <div
                key={s.id}
                onClick={() => router.push(`/admin/${s.id}`)}
                className="rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all hover:scale-[1.01]"
                style={{
                  background: 'rgba(16,24,39,0.82)',
                  border: '1px solid ' + (s.on_hold ? 'rgba(218,41,28,0.4)' : 'rgba(59,130,246,0.18)'),
                  boxShadow: s.on_hold ? '0 0 30px rgba(218,41,28,0.15)' : 'none',
                }}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-mono text-xs" style={{ color: '#a8b2ba' }}>{s.tracking_number}</span>
                      {s.on_hold && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1" style={{
                          background: 'rgba(218,41,28,0.15)',
                          color: '#DA291C',
                          border: '1px solid rgba(218,41,28,0.3)',
                        }}>
                          <AlertTriangle className="w-3 h-3" />
                          On Hold
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{
                        background: s.stage === 5 ? 'rgba(16,185,129,0.15)' : 'rgba(27,111,255,0.15)',
                        color: s.stage === 5 ? '#10b981' : '#1b6fff',
                        border: s.stage === 5 ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(27,111,255,0.3)',
                      }}>
                        {s.status}
                      </span>
                    </div>

                    <div className="font-bold text-base mb-1">{s.client_name}</div>

                    <div className="flex items-center gap-2 text-xs flex-wrap" style={{ color: '#a8b2ba' }}>
                      <MapPin className="w-3 h-3" />
                      <span>{s.from_city}, {s.from_state}</span>
                      <span style={{ color: '#6d7580' }}>→</span>
                      <span>{s.to_city}, {s.to_state}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                      <div className="text-xs uppercase tracking-wider" style={{ color: '#6d7580' }}>Service</div>
                      <div className="text-sm font-bold">{s.service?.replace('Discreet Vault ', '')}</div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/${s.id}`);
                      }}
                      className="p-2 rounded-lg transition-all hover:scale-105"
                      style={{
                        background: 'rgba(27,111,255,0.1)',
                        border: '1px solid rgba(27,111,255,0.3)',
                      }}>
                      <Edit3 className="w-4 h-4" style={{ color: '#1b6fff' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
