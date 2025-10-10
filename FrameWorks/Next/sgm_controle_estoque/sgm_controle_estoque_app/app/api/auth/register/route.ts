import { NextRequest } from 'next/server';
import { register } from '@/controllers/authController';

export async function POST(request: NextRequest) {
  return register(request);
}
