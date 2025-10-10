import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import { createUser, validateUser } from '@/services/userService';

export async function register(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Email, password, and role required' }, { status: 400 });
    }

    if (!['gestor', 'operador'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const user = await createUser(email, password, role);
    const token = signToken({ userId: user._id.toString(), role: user.role });
    return NextResponse.json({ token, role: user.role });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || 'Registration failed' }, { status: 400 });
  }
}

export async function login(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = await validateUser(email, password);
    const token = signToken({ userId: user._id.toString(), role: user.role });
    return NextResponse.json({ token, role: user.role });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || 'Login failed' }, { status: 401 });
  }
}
