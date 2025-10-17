// src/controllers/productController.ts

import { NextRequest } from 'next/server';
import * as productService from '@/services/productService';

/**
 * Lida com a requisição GET para buscar todos os produtos.
 */
export const getAll = async (_req: NextRequest) => {
  try {
    const products = await productService.findAllProducts();
    return { status: 200, body: products };
  } catch (error) {
    console.error(error);
    return { status: 500, body: { message: 'Erro interno no servidor.' } };
  }
};

/**
 * Lida com a requisição POST para criar um novo produto.
 */
export const create = async (req: NextRequest) => {
  try {
    const productData = await req.json();

    if (!productData.name || !productData.sku || productData.minQuantity === undefined) {
        return { status: 400, body: { message: 'Campos obrigatórios ausentes: name, sku, minQuantity.' }};
    }

    const newProduct = await productService.createProduct(productData);
    return { status: 201, body: newProduct };

  } catch (error: unknown) { 
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: unknown }).code === 11000) {
        return { status: 409, body: { message: 'Conflito: Já existe um produto com este SKU.' } };
    }
    
    console.error(error);
    return { status: 500, body: { message: 'Erro ao criar produto.' } };
  }
};

// ==================================================================
// ============= NOVO CÓDIGO ADICIONADO ABAIXO ======================
// ==================================================================

/**
 * Parâmetros de contexto para rotas dinâmicas.
 * Contém os parâmetros da URL, como o [id].
 */
interface IContext {
  params: {
    id: string;
  };
}

/**
 * Lida com a requisição GET para buscar um único produto pelo ID.
 */
export const getById = async (_req: NextRequest, context: IContext) => {
  try {
    const { id } = context.params;
    const product = await productService.findProductById(id);

    if (!product) {
      return { status: 404, body: { message: 'Produto não encontrado.' } };
    }

    return { status: 200, body: product };
  } catch (error) {
    console.error(error);
    return { status: 500, body: { message: 'Erro interno no servidor.' } };
  }
};

/**
 * Lida com a requisição PUT para atualizar um produto.
 */
export const update = async (req: NextRequest, context: IContext) => {
  try {
    const { id } = context.params;
    const productData = await req.json();

    const updatedProduct = await productService.updateProduct(id, productData);

    if (!updatedProduct) {
      return { status: 404, body: { message: 'Produto não encontrado para atualização.' } };
    }

    return { status: 200, body: updatedProduct };
  } catch (error) {
    console.error(error);
    return { status: 500, body: { message: 'Erro ao atualizar produto.' } };
  }
};

/**
 * Lida com a requisição DELETE para remover um produto.
 */
export const remove = async (_req: NextRequest, context: IContext) => {
  try {
    const { id } = context.params;
    const deletedProduct = await productService.deleteProduct(id);

    if (!deletedProduct) {
      return { status: 404, body: { message: 'Produto não encontrado para remoção.' } };
    }

    return { status: 200, body: { message: 'Produto removido com sucesso.', product: deletedProduct } };
  } catch (error) {
    console.error(error);
    return { status: 500, body: { message: 'Erro ao remover produto.' } };
  }
};