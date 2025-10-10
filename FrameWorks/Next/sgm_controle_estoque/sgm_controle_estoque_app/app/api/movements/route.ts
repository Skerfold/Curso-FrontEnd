import { NextRequest } from 'next/server';
import { getMovements, createMovementHandler } from '@/controllers/movementController';

export async function GET(req: NextRequest) {
  return getMovements(req);
}

export async function POST(req: NextRequest) {
  return createMovementHandler(req);
}
