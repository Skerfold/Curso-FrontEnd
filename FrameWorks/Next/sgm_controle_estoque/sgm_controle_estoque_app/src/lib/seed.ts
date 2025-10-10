import dbConnect from './mongodb';
import User from '../models/User';
import { hashPassword } from './auth';

async function seed() {
  await dbConnect();

  const existing = await User.findOne({ email: 'admin@example.com' });
  if (existing) {
    console.log('Admin already exists');
    return;
  }

  const hashed = await hashPassword('password123');
  await User.create({ email: 'admin@example.com', password: hashed, role: 'gestor' });
  console.log('Admin seeded');
}

seed().then(() => process.exit(0));
