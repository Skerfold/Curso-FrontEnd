'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  sku: string;
}

interface Movement {
  _id: string;
  type: 'entry' | 'exit';
  qty: number;
  date: string;
  productId: { name: string; sku: string };
  userId: { email: string };
}

export default function MovementsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ productId: '', type: 'entry', qty: 0 });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchProducts();
    fetchMovements();
  }, [user, router]);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
  };

  const fetchMovements = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/movements', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setMovements(data);
    } else {
      setError('Failed to fetch movements');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('/api/movements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchMovements();
      fetchProducts(); // Update product qtys
      setForm({ productId: '', type: 'entry', qty: 0 });
    } else {
      const data = await res.json();
      setError(data.error || 'Failed');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Movements</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>Add Movement</h2>
        <select
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
          required
          style={{ display: 'block', margin: '5px 0', padding: '8px', width: '100%' }}
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>{p.name} ({p.sku})</option>
          ))}
        </select>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value as 'entry' | 'exit' })}
          style={{ display: 'block', margin: '5px 0', padding: '8px', width: '100%' }}
        >
          <option value="entry">Entry</option>
          <option value="exit">Exit</option>
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: +e.target.value })}
          required
          min="1"
          style={{ display: 'block', margin: '5px 0', padding: '8px', width: '100%' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none' }}>
          Add Movement
        </button>
      </form>
      <h2>Recent Movements</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {movements.slice(0, 10).map((m) => (
          <li key={m._id} style={{ padding: '10px', margin: '5px 0', border: '1px solid #ccc' }}>
            {m.type === 'entry' ? 'Entry' : 'Exit'} of {m.qty} for {m.productId.name} by {m.userId.email} on {new Date(m.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
