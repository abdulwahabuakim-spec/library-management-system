"use client";
import { useEffect, useState } from "react";

export default function Books() {
  const [books, setBooks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [copies, setCopies] = useState(1);

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, author, isbn, totalCopies: copies, availableCopies: copies }),
    });
    setTitle(""); setAuthor(""); setIsbn(""); setCopies(1);
    fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <a href="/dashboard" className="text-blue-600 text-sm">← Back to Dashboard</a>
      <h1 className="text-2xl font-bold my-4">Books</h1>
      <form onSubmit={addBook} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input className="border p-2 rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="border p-2 rounded" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <input className="border p-2 rounded" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        <input className="border p-2 rounded" type="number" placeholder="Copies" value={copies} onChange={(e) => setCopies(Number(e.target.value))} />
        <button className="bg-blue-600 text-white py-2 rounded md:col-span-4">Add Book</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((b: any) => (
          <div key={b._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">{b.title}</h2>
            <p className="text-sm text-gray-600">by {b.author}</p>
            <p className="text-xs text-gray-500">ISBN: {b.isbn}</p>
            <p className="text-sm mt-2">Available: {b.availableCopies} / {b.totalCopies}</p>
          </div>
        ))}
      </div>
      {books.length === 0 && <p className="text-gray-500">No books yet. Add one above.</p>}
    </div>
  );
}
