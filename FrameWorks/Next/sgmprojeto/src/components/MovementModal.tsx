// src/components/MovementModal.tsx

'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import styles from './MovementModal.module.scss';

// Define a estrutura de um objeto de Produto que o modal espera
interface ProductInfo {
  _id: string;
  name: string;
  sku: string;
}

// Define as propriedades que o componente vai receber
interface MovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMovementSuccess: () => void; // Avisa o pai que a operação foi um sucesso
  product: ProductInfo | null;
  movementType: 'entrada' | 'saída' | null;
}

export default function MovementModal({ isOpen, onClose, onMovementSuccess, product, movementType }: MovementModalProps) {
  const { token } = useAuth();

  // Estados do formulário e UI
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reseta a quantidade para 1 sempre que o modal abrir
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product || !movementType) return; // Segurança extra

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/movements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          type: movementType,
          quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha ao registrar movimentação.');
      }

      // Sucesso!
      onMovementSuccess(); // Avisa o Dashboard para atualizar a lista e fechar

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

  if (!isOpen || !product || !movementType) {
    return null;
  }

  // Deixa a primeira letra maiúscula para o título (Entrada/Saída)
  const formattedType = movementType.charAt(0).toUpperCase() + movementType.slice(1);

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Registrar {formattedType}</h2>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
        <p className={styles.productInfo}>
          Produto: <strong>{product.name}</strong> (SKU: {product.sku})
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="quantity">Quantidade</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} // Garante que a quantidade seja no mínimo 1
              required
              min="1"
            />
          </div>
          
          {error && <p className={styles.error}>{error}</p>}
          
          <button type="submit" disabled={loading} className={`${styles.submitButton} ${styles[movementType]}`}>
            {loading ? 'Registrando...' : `Confirmar ${formattedType}`}
          </button>
        </form>
      </div>
    </div>
  );
}