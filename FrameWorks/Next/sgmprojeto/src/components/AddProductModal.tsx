// src/components/AddProductModal.tsx

'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/lib/authContext';
import styles from './AddProductModal.module.scss';

// Define as propriedades que o componente vai receber
interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void; // Função para avisar o pai que um produto foi adicionado
}

export default function AddProductModal({ isOpen, onClose, onProductAdded }: AddProductModalProps) {
  const { token } = useAuth(); // Pega o token para autenticar a requisição

  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [minQuantity, setMinQuantity] = useState(10);

  // Estados para controle de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ESSENCIAL: Envia o token para a API protegida
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, sku, quantity, minQuantity }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha ao adicionar produto.');
      }

      // Sucesso!
      onProductAdded(); // Avisa a página do dashboard para recarregar a lista
      handleClose();    // Fecha o modal

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Função para resetar o formulário e fechar
  const handleClose = () => {
    setName('');
    setSku('');
    setQuantity(0);
    setMinQuantity(10);
    setError(null);
    onClose();
  };

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Adicionar Novo Produto</h2>
          <button onClick={handleClose} className={styles.closeButton}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome do Produto</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="sku">SKU (Código)</label>
            <input id="sku" type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="quantity">Quantidade Inicial</label>
            <input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required min="0" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="minQuantity">Quantidade Mínima</label>
            <input id="minQuantity" type="number" value={minQuantity} onChange={(e) => setMinQuantity(Number(e.target.value))} required min="0" />
          </div>
          
          {error && <p className={styles.error}>{error}</p>}
          
          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </button>
        </form>
      </div>
    </div>
  );
}