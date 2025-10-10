import User from '@/models/User';
import dbConnect from '@/lib/mongodb';
import { hashPassword, comparePassword } from '@/lib/auth';

export async function createUser(email: string, password: string, role: 'gestor' | 'operador') {
  await dbConnect();
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error('User exists');
  }
  const hashed = await hashPassword(password);
  return await User.create({ email, password: hashed, role });
}

export async function findUserByEmail(email: string) {
  await dbConnect();
  return await User.findOne({ email });
}

export async function validateUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  return user;
}
