"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        // NestJS returns message as string or array
        const msg = Array.isArray(data.message) ? data.message.join(", ") : data.message;
        throw new Error(msg || "Register failed");
      }
      // No token is returned on register — go to login
      alert("Account created! Please login.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <h1>Register</h1>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p><a href="/login">Already have an account? Login</a></p>
    </main>
  );
}
