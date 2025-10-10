import { NextRequest } from 'next/server';
import { getProducts, createProductHandler } from '@/controllers/productController';

export async function GET(req: NextRequest) {
  return getProducts(req);
}

export async function POST(req: NextRequest) {
  return createProductHandler(req);
}
