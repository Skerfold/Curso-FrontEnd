'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  sku: string;
  currentQty: number;
}

interface Movement {
  _id: string;
  productId: { _id: string; name: string };
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [user, router]);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const [productsRes, movementsRes] = await Promise.all([
      fetch('/api/products', { headers: { Authorization: `Bearer ${token}` } }),
      fetch('/api/movements', { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    if (productsRes.ok && movementsRes.ok) {
      const productsData = await productsRes.json();
      const movementsData = await movementsRes.json();
      setProducts(productsData);
      setMovements(movementsData);
    }
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  const totalValue = products.reduce((sum, p) => sum + p.currentQty * 10, 0); // Assume 10 per unit
  const movementCount = movements.reduce((acc, m) => {
    acc[m.productId._id] = (acc[m.productId._id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topMoved = Object.entries(movementCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, count]) => {
      const product = products.find(p => p._id === id);
      return { name: product?.name || 'Unknown', count };
    });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Total Products</h2>
          <p>{products.length}</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Total Movements</h2>
          <p>{movements.length}</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Total Stock Value</h2>
          <p>R$ {totalValue.toFixed(2)}</p>
        </div>
      </div>
      <h2>Top Moved Products</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {topMoved.map((item, idx) => (
          <li key={idx} style={{ padding: '10px', margin: '5px 0', border: '1px solid #ccc' }}>
            {item.name}: {item.count} movements
          </li>
        ))}
      </ul>
    </div>
  );
}
