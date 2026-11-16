"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;
type Book = { id: string; title: string; author: string; available: number };
type Borrow = { id: string; bookId: string; borrowedAt: string; dueDate: string; returnedAt: string | null; book?: { title: string; author: string } };

export default function Borrow() {
  const [books, setBooks] = useState<Book[]>([]);
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [error, setError] = useState("");

  const load = async () => {
    const token = localStorage.getItem("token");
    const [br, mr] = await Promise.all([
      fetch(`${API}/books`),
      fetch(`${API}/books/my/borrows`, { headers: { Authorization: `Bearer ${token}` } }),
    ]);
    setBooks(await br.json());
    if (mr.ok) setBorrows(await mr.json());
  };
  useEffect(() => { load(); }, []);

  const borrow = async (id: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/books/${id}/borrow`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (!res.ok) { setError(typeof data.message === "string" ? data.message : "Borrow failed"); return; }
    setError(""); load();
  };

  const returnBook = async (borrowId: string) => {
    const token = localStorage.getItem("token");
    await fetch(`${API}/books/return/${borrowId}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    load();
  };

  return (
    <main style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
      <h1>Borrow Books</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Available Books</h2>
      <ul>
        {books.map((b) => (
          <li key={b.id}>{b.title} by {b.author} — Available: {b.available}{" "}
            <button disabled={b.available <= 0} onClick={() => borrow(b.id)}>Borrow</button>
          </li>
        ))}
      </ul>
      <h2>My Borrows</h2>
      <ul>
        {borrows.map((r) => (
          <li key={r.id}>
            {r.book?.title || r.bookId} — Borrowed: {new Date(r.borrowedAt).toLocaleDateString()} | Due: {new Date(r.dueDate).toLocaleDateString()} | {r.returnedAt ? `Returned ${new Date(r.returnedAt).toLocaleDateString()}` : "Not returned"}{" "}
            {!r.returnedAt && <button onClick={() => returnBook(r.id)}>Return</button>}
          </li>
        ))}
      </ul>
      <p><a href="/dashboard">Back to Dashboard</a></p>
    </main>
  );
}
