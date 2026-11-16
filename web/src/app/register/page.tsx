"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</p>}
        <input className="w-full border p-3 rounded mb-4" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="w-full border p-3 rounded mb-4" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border p-3 rounded mb-4" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white py-3 rounded font-semibold">Register</button>
        <p className="text-center mt-4 text-sm">Have account? <a href="/login" className="text-blue-600">Login</a></p>
      </form>
    </div>
  );
}
