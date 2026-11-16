"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;
type User = { id: string; name: string; email: string; role: string };

export default function Members() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/users`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) { setError(typeof data.message === "string" ? data.message : "Failed to load users"); return; }
      setUsers(data);
    };
    load();
  }, []);

  return (
    <main style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
      <h1>Members (Users)</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>There is no separate Member model — Users ARE members.</p>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} — {u.email} — {u.role}</li>
        ))}
      </ul>
      <p><a href="/dashboard">Back to Dashboard</a></p>
    </main>
  );
}
