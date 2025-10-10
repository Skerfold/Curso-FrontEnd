'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      background: '#333',
      color: 'white',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div>
        <Link href="/" style={{ color: 'white', marginRight: '20px' }}>Home</Link>
        {user && (
          <>
            {user.role === 'gestor' && <Link href="/products" style={{ color: 'white', marginRight: '20px' }}>Products</Link>}
            <Link href="/movements" style={{ color: 'white', marginRight: '20px' }}>Movements</Link>
            <Link href="/dashboard" style={{ color: 'white', marginRight: '20px' }}>Dashboard</Link>
          </>
        )}
      </div>
      {user && (
        <div>
          <span>Welcome, {user.role}</span>
          <button onClick={handleLogout} style={{ marginLeft: '20px', padding: '5px 10px', background: 'red', color: 'white', border: 'none' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
