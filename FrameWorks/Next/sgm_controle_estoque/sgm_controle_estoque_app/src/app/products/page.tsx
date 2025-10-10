'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  sku: string;
  minQty: number;
  currentQty: number;
  lowStock: boolean;
}

export default function ProductsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', sku: '', minQty: 0, currentQty: 0 });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, [user, router]);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    } else {
      setError('Failed to fetch products');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = editingProduct ? 'PUT' : 'POST';
    const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchProducts();
      setForm({ name: '', sku: '', minQty: 0, currentQty: 0 });
      setEditingProduct(null);
    } else {
      const data = await res.json();
      setError(data.error || 'Failed');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({ name: product.name, sku: product.sku, minQty: product.minQty, currentQty: product.currentQty });
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchProducts();
    } else {
      setError('Failed to delete');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user.role === 'gestor' && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ display: 'block', margin: '5px 0', padding: '8px', width: '100%' }}
          />
          <input
            type="text"
            placeholder="SKU"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
            required
            style={{ display: 'block', margin: '5px 0', padding: '8px', width: '100%' }}
          />
          <input
            type="number"
            placeholder="Min Qty"
            value={form.minQty}
            onChange={(e) => setForm({ ...form, minQty: +e.target.value })}
            required
            style={{ display: 'block', margin: '5px 0', padding: '8px', width: '100%' }}
          />
          <input
            type="number"
            placeholder="Current Qty"
            value={form.currentQty}
            onChange={(e) => setForm({ ...form, currentQty: +e.target.value })}
            required
            style={{ display: 'block', margin: '5px 0', padding: '8px', width: '100%' }}
          />
          <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none' }}>
            {editingProduct ? 'Update' : 'Add'}
          </button>
          {editingProduct && (
            <button type="button" onClick={() => { setEditingProduct(null); setForm({ name: '', sku: '', minQty: 0, currentQty: 0 }); }} style={{ padding: '10px', marginLeft: '10px' }}>
              Cancel
            </button>
          )}
        </form>
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product) => (
          <li key={product._id} style={{ padding: '10px', margin: '5px 0', border: '1px solid #ccc', background: product.lowStock ? '#ffe6e6' : '#f9f9f9' }}>
            <strong>{product.name}</strong> (SKU: {product.sku}) - Min: {product.minQty}, Current: {product.currentQty}
            {product.lowStock && <span style={{ color: 'red', marginLeft: '10px' }}>Low Stock!</span>}
            {user.role === 'gestor' && (
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => handleEdit(product)} style={{ padding: '5px 10px', marginRight: '5px' }}>Edit</button>
                <button onClick={() => handleDelete(product._id)} style={{ padding: '5px 10px', background: 'red', color: 'white' }}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
