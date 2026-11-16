"use client";
import { useEffect, useState } from "react";

export default function Borrow() {
  const [records, setRecords] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");

  const fetchAll = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const [r1, r2, r3] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/borrow`, { headers }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, { headers }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/members`, { headers }),
    ]);
    setRecords(await r1.json());
    setBooks(await r2.json());
    setMembers(await r3.json());
  };

  useEffect(() => { fetchAll(); }, []);

  const borrowBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/borrow`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ bookId, memberId }),
    });
    fetchAll();
  };

  const returnBook = async (id: string) => {
    const token = localStorage.getItem("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/borrow/${id}/return`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAll();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <a href="/dashboard" className="text-blue-600 text-sm">← Back to Dashboard</a>
      <h1 className="text-2xl font-bold my-4">Borrow Records</h1>
      <form onSubmit={borrowBook} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <select className="border p-2 rounded" value={bookId} onChange={(e) => setBookId(e.target.value)} required>
          <option value="">Select Book</option>
          {books.map((b: any) => <option key={b._id} value={b._id}>{b.title} ({b.availableCopies} left)</option>)}
        </select>
        <select className="border p-2 rounded" value={memberId} onChange={(e) => setMemberId(e.target.value)} required>
          <option value="">Select Member</option>
          {members.map((m: any) => <option key={m._id} value={m._id}>{m.name}</option>)}
        </select>
        <button className="bg-blue-600 text-white py-2 rounded">Borrow Book</button>
      </form>
      <div className="space-y-3">
        {records.map((r: any) => (
          <div key={r._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-bold">{r.bookId?.title || "Book"} — {r.memberId?.name || "Member"}</p>
              <p className="text-sm text-gray-600">Borrowed: {new Date(r.borrowDate).toLocaleDateString()} | Due: {new Date(r.dueDate).toLocaleDateString()}</p>
              <p className="text-sm">Status: <span className={r.status === "returned" ? "text-green-600" : "text-orange-600"}>{r.status}</span></p>
            </div>
            {r.status !== "returned" && <button onClick={() => returnBook(r._id)} className="bg-green-600 text-white px-4 py-2 rounded text-sm">Return</button>}
          </div>
        ))}
      </div>
      {records.length === 0 && <p className="text-gray-500">No borrow records yet.</p>}
    </div>
  );
}
