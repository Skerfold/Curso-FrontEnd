// src/app/api/auth/register/route.ts

import { NextResponse, NextRequest } from 'next/server';
import * as authController from '@/controllers/authController';

export async function POST(req: NextRequest) {
  const { status, body } = await authController.register(req);
  return NextResponse.json(body, { status });
}