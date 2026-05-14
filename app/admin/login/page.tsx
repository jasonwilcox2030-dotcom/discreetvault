'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

const ADMIN_PASSWORD = 'MyVaultBoss88';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('dv_admin_auth', 'authenticated');
        router.push('/admin');
      } else {
        setError('Invalid password. Access denied.');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
      style={{ background: '#050816', color: '#ffffff' }}>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, #0b1730 0%, #050816 60%)' }} />
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(27,111,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(27,111,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] animate-pulse" style={{ background: 'rgba(27,111,255,0.15)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px]" style={{ background: 'rgba(218,41,28,0.08)' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, #005fcc, #DA291C)',
              boxShadow: '0 0 50px rgba(27,111,255,0.5)',
            }}>
            <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black mb-2 text-white">Admin Access</h1>
          <p className="text-sm" style={{ color: '#a8b2ba' }}>Discreet Vault Operations</p>
        </div>

        <div className="relative rounded-2xl p-8 backdrop-blur-xl"
          style={{
            background: 'rgba(16,24,39,0.82)',
            border: '1px solid rgba(59,130,246,0.3)',
            boxShadow: '0 0 60px rgba(27,111,255,0.15)',
          }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{
            background: 'linear-gradient(90deg, transparent, #1b6fff, transparent)',
          }} />

          <form onSubmit={handleLogin}>
            <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: '#1b6fff' }}>
              <Lock className="w-3 h-3 inline mr-2" />
              Master Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              autoFocus
              className="w-full px-4 py-3 rounded-xl text-base focus:outline-none mb-4"
              style={{
                background: 'rgba(5,8,22,0.5)',
                border: '1px solid rgba(59,130,246,0.3)',
                color: '#ffffff',
              }}
            />

            {error && (
              <div className="mb-4 p-3 rounded-xl text-sm flex items-center gap-2" style={{
                background: 'rgba(218,41,28,0.1)',
                border: '1px solid rgba(218,41,28,0.3)',
                color: '#e84a38',
              }}>
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!password || loading}
              className="w-full py-3 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: '#DA291C',
                color: '#fff',
                boxShadow: '0 0 25px rgba(218,41,28,0.4)',
              }}>
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#6d7580' }}>
          Authorized access only • All activity is logged
        </p>
      </div>
    </main>
  );
}
