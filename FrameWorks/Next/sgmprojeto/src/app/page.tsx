// src/app/page.tsx

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import styles from './Dashboard.module.scss';
import AddProductModal from '@/components/AddProductModal';
import MovementModal from '@/components/MovementModal'; // <-- IMPORTAÇÃO DO NOVO MODAL

// Define a estrutura de um objeto de Produto
interface IProduct {
  _id: string;
  name: string;
  sku: string;
  quantity: number;
  minQuantity: number;
}

export default function DashboardPage() {
  const { user, token, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // Estados da página
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para os modais
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [movementType, setMovementType] = useState<'entrada' | 'saída' | null>(null);

  // Função para buscar os produtos da API
  const fetchProducts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch('/api/products', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Falha ao buscar produtos.');
      const data = await response.json();
      setProducts(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Efeito inicial para proteger a rota e buscar dados
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchProducts();
    }
  }, [isAuthenticated, router, fetchProducts]);
  
  // Funções para controlar os modais
  const handleOpenMovementModal = (product: IProduct, type: 'entrada' | 'saída') => {
    setSelectedProduct(product);
    setMovementType(type);
    setIsMovementModalOpen(true);
  };
  
  const handleMovementSuccess = () => {
    setIsMovementModalOpen(false); // Fecha o modal
    fetchProducts(); // Atualiza a lista de produtos
  };
  
  const handleAddProductSuccess = () => {
    setIsAddProductModalOpen(false);
    fetchProducts();
  };

  if (loading && products.length === 0) {
    return <div className={styles.centered}>Carregando...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Dashboard de Estoque</h1>
          <div>
            <span>Olá, {user?.name} ({user?.role})</span>
            <button onClick={logout} className={styles.logoutButton}>Sair</button>
          </div>
        </header>

        <main>
          <div className={styles.mainHeader}>
            <h2>Produtos</h2>
            {user?.role === 'Gestor de Estoque' && (
              <button onClick={() => setIsAddProductModalOpen(true)} className={styles.addButton}>
                Adicionar Produto
              </button>
            )}
          </div>

          {error && <p className={styles.error}>{error}</p>}
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>SKU</th>
                <th>Quantidade Atual</th>
                <th>Quantidade Mínima</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className={product.quantity <= product.minQuantity ? styles.lowStock : ''}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.quantity}</td>
                  <td>{product.minQuantity}</td>
                  <td className={styles.actionsCell}>
                    <button onClick={() => handleOpenMovementModal(product, 'entrada')} className={`${styles.actionButton} ${styles.entradaButton}`}>
                      Entrada
                    </button>
                    <button onClick={() => handleOpenMovementModal(product, 'saída')} className={`${styles.actionButton} ${styles.saidaButton}`}>
                      Saída
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      {/* Renderização dos Modais */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onProductAdded={handleAddProductSuccess}
      />
      
      <MovementModal
        isOpen={isMovementModalOpen}
        onClose={() => setIsMovementModalOpen(false)}
        onMovementSuccess={handleMovementSuccess}
        product={selectedProduct}
        movementType={movementType}
      />
    </>
  );
}