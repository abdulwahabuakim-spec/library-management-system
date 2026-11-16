"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
      return;
    }
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Library Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Hi, {user.name} ({user.role})</span>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded text-sm">Logout</button>
        </div>
      </header>
      <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/books" className="bg-white p-6 rounded shadow">
          <h2 className="font-bold text-lg">📚 Books</h2>
          <p className="text-gray-600 text-sm mt-2">View and manage books</p>
        </a>
        <a href="/members" className="bg-white p-6 rounded shadow">
          <h2 className="font-bold text-lg">👥 Members</h2>
          <p className="text-gray-600 text-sm mt-2">View and manage members</p>
        </a>
        <a href="/borrow" className="bg-white p-6 rounded shadow">
          <h2 className="font-bold text-lg">📖 Borrow Records</h2>
          <p className="text-gray-600 text-sm mt-2">Borrow and return books</p>
        </a>
      </main>
    </div>
  );
}
