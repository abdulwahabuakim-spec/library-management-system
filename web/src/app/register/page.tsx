'use client';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role }),
      });
      setSuccess('Account created! Go to login.');
    } catch (err: any) {
      setError(err.message);
    }
  }

  const inputStyle = { padding: 10, borderRadius: 6, border: '1px solid #ddd', width: '100%', boxSizing: 'border-box' as const };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
        <select value={role} onChange={e => setRole(e.target.value)} style={inputStyle}>
          <option value="MEMBER">Member</option>
          <option value="LIBRARIAN">Librarian</option>
        </select>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button style={{ padding: 12, background: '#111', color: '#fff', border: 0, borderRadius: 6, cursor: 'pointer' }}>Create Account</button>
      </form>
    </div>
  );
}