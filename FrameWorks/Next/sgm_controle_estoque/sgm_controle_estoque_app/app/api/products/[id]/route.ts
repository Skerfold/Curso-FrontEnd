import { NextRequest } from 'next/server';
import { getProduct, updateProductHandler, deleteProductHandler } from '@/controllers/productController';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return getProduct(req, { params });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return updateProductHandler(req, { params });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return deleteProductHandler(req, { params });
}
