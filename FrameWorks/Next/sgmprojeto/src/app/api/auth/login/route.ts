// src/app/api/auth/login/route.ts

import { NextResponse, NextRequest } from 'next/server';
import * as authController from '@/controllers/authController';

export async function POST(req: NextRequest) {
  const { status, body } = await authController.login(req);
  return NextResponse.json(body, { status });
}