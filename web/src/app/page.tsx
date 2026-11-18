'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
  genre?: { name: string };
};

type Genre = { id: number; name: string };

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState('');
  const [genreId, setGenreId] = useState('');
  const [msg, setMsg] = useState('');

  async function loadBooks() {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (genreId) params.append('genreId', genreId);
    const data = await apiFetch(`/books?${params.toString()}`);
    setBooks(data);
  }

  useEffect(() => {
    apiFetch('/genres').then(setGenres).catch(() => {});
    loadBooks();
  }, []);

  async function borrow(id: number) {
    try {
      await apiFetch('/loans', { method: 'POST', body: JSON.stringify({ bookId: id }) });
      setMsg('Borrowed! Check My Loans.');
      loadBooks();
    } catch (e: any) {
      setMsg(e.message);
    }
  }

  return (
    <div>
      <h1>Browse Books</h1>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <input
          placeholder="Search title, author, ISBN..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
        />
        <select value={genreId} onChange={e => setGenreId(e.target.value)} style={{ padding: 10, borderRadius: 6 }}>
          <option value="">All Genres</option>
          {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        <button onClick={loadBooks} style={{ padding: '10px 20px', background: '#111', color: '#fff', border: 0, borderRadius: 6 }}>Search</button>
      </div>

      {msg && <p style={{ background: '#e6ffed', padding: 10, borderRadius: 6 }}>{msg}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
        {books.map(b => (
          <div key={b.id} style={{ background: '#fff', padding: 16, borderRadius: 8 }}>
            <h3 style={{ margin: '0 0 6px' }}>{b.title}</h3>
            <p style={{ margin: '0 0 4px', color: '#555' }}>by {b.author}</p>
            <p style={{ margin: '0 0 4px', fontSize: 13 }}>Genre: {b.genre?.name || 'N/A'} | ISBN: {b.isbn}</p>
            <p style={{ fontSize: 13, fontWeight: 'bold' }}>Available: {b.availableCopies} / {b.totalCopies}</p>
            <button
              onClick={() => borrow(b.id)}
              disabled={b.availableCopies === 0}
              style={{ width: '100%', padding: 10, marginTop: 8, background: b.availableCopies === 0 ? '#ccc' : '#111', color: '#fff', border: 0, borderRadius: 6, cursor: 'pointer' }}
            >
              {b.availableCopies === 0 ? 'Out of Stock' : 'Borrow'}
            </button>
          </div>
        ))}
      </div>

      {books.length === 0 && <p>No books found. Login as Librarian to add books.</p>}
    </div>
  );
}