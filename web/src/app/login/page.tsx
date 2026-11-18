'use client';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button style={{ padding: 12, background: '#111', color: '#fff', border: 0, borderRadius: 6, cursor: 'pointer' }}>Login</button>
      </form>
      <p>Don&apos;t have account? <a href="/register">Register</a></p>
    </div>
  );
}