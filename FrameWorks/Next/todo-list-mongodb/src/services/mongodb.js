// auxiliar de conexão com o MONGODB

import mongoose from "mongoose";

// arrow function 

const connectMongo = async () => { 
    mongoose.connect (process.env.DATABASE_URL) // estabelece a conexão com o banco dados MONGODB
    .then(() => console.log("Conectado ao MongoDB com sucesso!"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB!", err));

}

export default connectMongo;