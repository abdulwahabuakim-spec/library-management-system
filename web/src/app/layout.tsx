import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', margin: 0, background: '#f8f9fa' }}>
        <nav style={{ background: '#111', color: '#fff', padding: '14px 20px', display: 'flex', justifyContent: 'space-between' }}>
          <a href="/" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>📚 Library</a>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</a>
            <a href="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</a>
          </div>
        </nav>
        <main style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>{children}</main>
      </body>
    </html>
  );
}