import Product from '@/models/Product';
import dbConnect from '@/lib/mongodb';

export async function getAllProducts() {
  await dbConnect();
  const products = await Product.find({});
  return products.map(p => ({
    ...p.toObject(),
    lowStock: p.currentQty < p.minQty
  }));
}

export async function createProduct(data: { name: string; sku: string; minQty: number; currentQty: number }) {
  await dbConnect();
  return await Product.create(data);
}

export async function getProductById(id: string) {
  await dbConnect();
  return await Product.findById(id);
}

export async function updateProduct(id: string, data: Partial<{ name: string; sku: string; minQty: number; currentQty: number }>) {
  await dbConnect();
  return await Product.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteProduct(id: string) {
  await dbConnect();
  return await Product.findByIdAndDelete(id);
}

export async function updateProductQuantity(id: string, delta: number) {
  await dbConnect();
  return await Product.findByIdAndUpdate(id, { $inc: { currentQty: delta } }, { new: true });
}
