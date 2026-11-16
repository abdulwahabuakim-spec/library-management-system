"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;
type Book = { id: string; title: string; author: string; isbn?: string; category?: string; totalCopies: number; available: number };

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [totalCopies, setTotalCopies] = useState(1);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch(`${API}/books`);
    setBooks(await res.json());
  };
  useEffect(() => { load(); }, []);

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, author, isbn, category, totalCopies: Number(totalCopies) }),
    });
    const data = await res.json();
    if (!res.ok) { setError(typeof data.message === "string" ? data.message : "Failed to add book"); return; }
    setTitle(""); setAuthor(""); setIsbn(""); setCategory(""); setTotalCopies(1);
    load();
  };

  const del = async (id: string) => {
    const token = localStorage.getItem("token");
    await fetch(`${API}/books/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    load();
  };

  return (
    <main style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
      <h1>Books</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={addBook} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input placeholder="Title *" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input placeholder="Author *" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <input placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="number" min={1} placeholder="Total Copies" value={totalCopies} onChange={(e) => setTotalCopies(Number(e.target.value))} />
        <button type="submit">Add Book</button>
      </form>
      <ul style={{ marginTop: 20 }}>
        {books.map((b) => (
          <li key={b.id} style={{ marginBottom: 10 }}>
            <b>{b.title}</b> by {b.author} — {b.category || "No category"}<br />
            ISBN: {b.isbn || "-"} | Available: {b.available} / {b.totalCopies}{" "}
            <button onClick={() => del(b.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p><a href="/dashboard">Back to Dashboard</a></p>
    </main>
  );
}
