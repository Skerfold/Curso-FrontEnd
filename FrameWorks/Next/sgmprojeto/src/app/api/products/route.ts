// src/app/api/products/route.ts

import { NextResponse, NextRequest } from 'next/server';
import * as productController from '@/controllers/productController';

// Rota para GET /api/products
export async function GET(req: NextRequest) {
  const { status, body } = await productController.getAll(req);
  return NextResponse.json(body, { status });
}

// Rota para POST /api/products
export async function POST(req: NextRequest) {
  const { status, body } = await productController.create(req);
  return NextResponse.json(body, { status });
}