import Movement from '@/models/Movement';
import Product from '@/models/Product';
import dbConnect from '@/lib/mongodb';

export async function getAllMovements() {
  await dbConnect();
  return await Movement.find({}).populate('productId', 'name sku').populate('userId', 'email').sort({ date: -1 });
}

export async function createMovement(data: { type: 'entry' | 'exit'; qty: number; productId: string; userId: string }) {
  await dbConnect();
  const movement = await Movement.create({ ...data, date: new Date() });
  const delta = data.type === 'entry' ? data.qty : -data.qty;
  await Product.findByIdAndUpdate(data.productId, { $inc: { currentQty: delta } });
  return movement.populate('productId', 'name sku').populate('userId', 'email');
}
