import mongoose from "mongoose";
import { cache } from "react";

// Componentes responsavel por estabelece a conexão com o mongoDB
// Converte uma string em URL => 
const MONGO_URI = process.env.DATABASE_URL;

// Verificar se o arquivo enviroment(.env) foi definido

//1º Passo : Criar e Verificar o Endereço de Conexão
if(!MONGO_URI){
    throw new Error("Crie o .env.local com a Variável DATABASE_URL");
}



//2º Passo : Criar um arquivo Cached, para armazenar as conexões ao longo do projeto
let cached = (global as any).mongoose;

// Se cached não existir (primeira vez que for fazer acesso ao mongo)
if(!cached) {
    cached = (global as any).mongoose = {conn: null, promise: null}
}

//3º Passo : Criar a função de conexão com o DB

async function connectMongo(){
    // Verificar se já existe uma conexão
    if(cached.conn) return cached.conn;

    // Se caso não existir a conexão
    if(!cached.promise){
        const aguarde = {bufferCommands: false};
        // Criar uma promessa de conexão
        cached.promise = mongoose.connect(MONGO_URI!, aguarde)
            .then((mongoose)=>{console.log("Conectado ao Mongo");
                return mongoose;
            })
    }
    // Colocar a promessa dentro da conexão promise => conn
    try {
        // Cria a conexão a partir da promessa que estava pendente
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error; // Lança um erro para o view
    }
    return cached.conn;
}

// Transformar em componente reutilizável
export default connectMongo;
