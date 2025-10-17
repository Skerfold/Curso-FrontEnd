// src/lib/mongodb.ts

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Por favor, defina a variável de ambiente MONGODB_URI dentro de .env.local'
  );
}

/**
 * Caching da conexão global.
 * Isso evita criar uma nova conexão a cada requisição em ambientes de desenvolvimento e produção.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Adiciona o tipo 'mongoose' ao objeto global do NodeJS
declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    // console.log('🚀 Usando conexão de DB cacheada');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // console.log('⏳ Criando nova conexão com o DB...');
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      // console.log('✅ Conexão com o DB estabelecida!');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;