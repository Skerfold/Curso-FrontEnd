import { NextRequest, NextResponse } from 'next/server';
import { getAllMovements, createMovement } from '@/services/movementService';
import { verifyToken } from '@/lib/auth';

export async function getMovements(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  try {
    const movements = await getAllMovements();
    return NextResponse.json(movements);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movements' }, { status: 500 });
  }
}

export async function createMovementHandler(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  try {
    const data = await req.json();
    data.userId = payload.userId;
    const movement = await createMovement(data);
    return NextResponse.json(movement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || 'Failed to create movement' }, { status: 500 });
  }
}
