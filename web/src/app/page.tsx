export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Library Management System</h1>
      <p className="text-gray-600 mb-8">Manage books, members and borrowing easily.</p>
      <div className="flex gap-4">
        <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded font-semibold">Login</a>
        <a href="/register" className="bg-white border px-6 py-3 rounded font-semibold">Register</a>
      </div>
    </div>
  );
}
