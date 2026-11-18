'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function LoansPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [msg, setMsg] = useState('');

  function load() {
    apiFetch('/loans/my').then(setLoans).catch((e: any) => setMsg(e.message));
  }

  useEffect(load, []);

  async function returnBook(id: number) {
    try {
      await apiFetch(`/loans/${id}/return`, { method: 'POST' });
      setMsg('Returned!');
      load();
    } catch (e: any) { setMsg(e.message); }
  }

  return (
    <div>
      <h1>My Loans</h1>
      {msg && <p>{msg}</p>}
      {loans.length === 0 && <p>No loans yet. Borrow a book from home.</p>}
      {loans.map(l => (
        <div key={l.id} style={{ background: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <b>{l.book?.title}</b> by {l.book?.author}
            <div style={{ fontSize: 13, color: '#555' }}>
              Borrowed: {new Date(l.borrowedAt).toLocaleDateString()} | Due: {new Date(l.dueDate).toLocaleDateString()} | Status: {l.status}
            </div>
          </div>
          {l.status === 'BORROWED' && <button onClick={() => returnBook(l.id)} style={{ padding: '8px 16px', background: '#111', color: '#fff', border: 0, borderRadius: 6 }}>Return</button>}
        </div>
      ))}
    </div>
  );
}