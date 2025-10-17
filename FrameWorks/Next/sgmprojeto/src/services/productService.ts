// src/services/productService.ts

import dbConnect from '@/lib/mongodb'; // Nosso conector de DB
import Product, { IProduct } from '@/models/Product'; // Nosso model de Produto

/**
 * Busca todos os produtos no banco de dados, ordenados por nome.
 * @returns Uma promessa que resolve para um array de produtos.
 */
export const findAllProducts = async (): Promise<IProduct[]> => {
  await dbConnect(); // Garante que estamos conectados ao DB
  const products = await Product.find({}).sort({ name: 'asc' }); // 'asc' para ordem alfabética
  return products;
};

/**
 * Busca um único produto pelo seu ID.
 * @param id - O ID do produto a ser encontrado.
 * @returns Uma promessa que resolve para o documento do produto ou null se não for encontrado.
 */
export const findProductById = async (id: string): Promise<IProduct | null> => {
  await dbConnect();
  const product = await Product.findById(id);
  return product;
};

/**
 * Cria um novo produto no banco de dados.
 * @param productData - Os dados do produto a ser criado.
 * @returns Uma promessa que resolve para o novo documento do produto criado.
 */
export const createProduct = async (productData: Partial<IProduct>): Promise<IProduct> => {
  await dbConnect();
  // O 'unique' no SKU do model já previne duplicatas, mas validações extras podem ser adicionadas aqui.
  const newProduct = new Product(productData);
  await newProduct.save();
  return newProduct;
};

/**
 * Atualiza um produto existente no banco de dados.
 * @param id - O ID do produto a ser atualizado.
 * @param productData - Os novos dados para o produto.
 * @returns Uma promessa que resolve para o documento do produto atualizado ou null se não for encontrado.
 */
export const updateProduct = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
  await dbConnect();
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    productData,
    { new: true, runValidators: true } // 'new: true' retorna o documento atualizado
  );
  return updatedProduct;
};

/**
 * Deleta um produto do banco de dados.
 * @param id - O ID do produto a ser deletado.
 * @returns Uma promessa que resolve para o documento do produto deletado ou null se não for encontrado.
 */
export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  await dbConnect();
  const deletedProduct = await Product.findByIdAndDelete(id);
  return deletedProduct;
};