import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', margin: 0, background: '#f8f9fa' }}>
        <nav style={{ background: '#111', color: '#fff', padding: '14px 20px', display: 'flex', justifyContent: 'space-between' }}>
          
          {/* 1. LOGO LINK - Left side, goes to Home */}
          <a href="/" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>📚 Library</a>

          {/* 2. NAV LINKS - Right side */}
          <div style={{ display: 'flex', gap: 16 }}>

            {/* Link 1: Home / Books */}
            <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>

            {/* Link 2: Admin - Add Book + Genre */}
            <a href="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Admin</a>

            {/* Link 3: My Loans - Borrowed books */}
            <a href="/loans" style={{ color: '#fff', textDecoration: 'none' }}>My Loans</a>

            {/* Link 4: Login */}
            <a href="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</a>

            {/* Link 5: Register */}
            <a href="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</a>

          </div>
        </nav>
        <main style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>{children}</main>
      </body>
    </html>
  );
}