"use client";
import { useEffect, useState } from "react";

export default function Members() {
  const [members, setMembers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const fetchMembers = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/members`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMembers(data);
  };

  useEffect(() => { fetchMembers(); }, []);

  const addMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, email, phone }),
    });
    setName(""); setEmail(""); setPhone("");
    fetchMembers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <a href="/dashboard" className="text-blue-600 text-sm">← Back to Dashboard</a>
      <h1 className="text-2xl font-bold my-4">Members</h1>
      <form onSubmit={addMember} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input className="border p-2 rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="border p-2 rounded" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2 rounded" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <button className="bg-blue-600 text-white py-2 rounded md:col-span-3">Add Member</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {members.map((m: any) => (
          <div key={m._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">{m.name}</h2>
            <p className="text-sm text-gray-600">{m.email}</p>
            <p className="text-sm text-gray-600">{m.phone}</p>
          </div>
        ))}
      </div>
      {members.length === 0 && <p className="text-gray-500">No members yet. Add one above.</p>}
    </div>
  );
}
