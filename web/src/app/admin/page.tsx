'use client';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [totalCopies, setTotalCopies] = useState(1);
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState<any[]>([]);
  const [newGenre, setNewGenre] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    apiFetch('/genres').then(setGenres).catch(() => {});
  }, []);

  async function addGenre(e: React.FormEvent) {
    e.preventDefault();
    try {
      const g = await apiFetch('/genres', { method: 'POST', body: JSON.stringify({ name: newGenre }) });
      setGenres([...genres, g]);
      setNewGenre('');
      setMsg('Genre added!');
    } catch (err: any) { setMsg(err.message); }
  }

  async function addBook(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiFetch('/books', {
        method: 'POST',
        body: JSON.stringify({ title, author, isbn, totalCopies: Number(totalCopies), genreId: Number(genreId) }),
      });
      setMsg('Book added!');
      setTitle(''); setAuthor(''); setIsbn('');
    } catch (err: any) { setMsg(err.message); }
  }

  const input = { padding: 10, borderRadius: 6, border: '1px solid #ddd', width: '100%', boxSizing: 'border-box' as const };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Librarian Admin</h1>
      {msg && <p style={{ background: '#e6ffed', padding: 10, borderRadius: 6 }}>{msg}</p>}

      <div style={{ background: '#fff', padding: 20, borderRadius: 8, marginBottom: 20 }}>
        <h2>Add Genre</h2>
        <form onSubmit={addGenre} style={{ display: 'flex', gap: 10 }}>
          <input placeholder="Genre name e.g. Fiction" value={newGenre} onChange={e => setNewGenre(e.target.value)} required style={input} />
          <button style={{ padding: '10px 20px', background: '#111', color: '#fff', border: 0, borderRadius: 6 }}>Add</button>
        </form>
      </div>

      <div style={{ background: '#fff', padding: 20, borderRadius: 8 }}>
        <h2>Add Book</h2>
        <form onSubmit={addBook} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={input} />
          <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required style={input} />
          <input placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} required style={input} />
          <input type="number" placeholder="Total Copies" value={totalCopies} onChange={e => setTotalCopies(Number(e.target.value))} required style={input} />
          <select value={genreId} onChange={e => setGenreId(e.target.value)} required style={input}>
            <option value="">Select Genre</option>
            {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <button style={{ padding: 12, background: '#111', color: '#fff', border: 0, borderRadius: 6 }}>Add Book</button>
        </form>
      </div>
    </div>
  );
}