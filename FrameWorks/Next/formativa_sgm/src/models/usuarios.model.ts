// Definir primeiro a infraestrutura do OBJ

import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";


export interface IUsuario extends Document {
    nome: string;
    email: string;
    senha: string;
    funcao: string;
    login(): Promise<void>;
    logout(): Promise<void>;
}

// Vamos criar a Regra do Schema

const UsuarioSchema: Schema<IUsuario> = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O nome é obrigatório"],
        trim: true,
        maxlength: [50, "Máximo de 50 caracteres"]
    },
    email: {
        type: String,
        required: [true, "O email é obrigatório"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Email inválido"]
    },
    senha: {
        type: String,
        required: [true, "A senha é obrigatória"],
        select: false,
        trim: true,
        maxlength: [20, "Máximo de 20 caracteres"]
    },
    funcao: {
        type: String,
        required: [true, "A função é obrigatória"],
        trim: true,
        maxlength: [50, "Máximo de 50 caracteres"]
    }
});

// Middleware para hashear a senha 
// Serve para criptografar a senha quando for armazenar o usuario no BD
UsuarioSchema.pre<IUsuario>('save', async function (next){
    if(!this.isModified('password') || !this.senha) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error:any) {
        next(error);
    }
})

// Método para comparar a senha 
// Quando o usuário for fazer o login ( compara a senha digitada e criptografada com a senha criptografada )
UsuarioSchema.methods.comparePassword = function (userPassword:string): Promise<boolean>{
    return  bcrypt.compare(userPassword, this.password);
}


UsuarioSchema.methods.login = async function() {
    // Lógica de login
    console.log(`${this.nome} fez login`);
};

UsuarioSchema.methods.logout = async function() {
    // Lógica de logout
    console.log(`${this.nome} fez logout`);
};

const Usuario: Model<IUsuario> = mongoose.models.Usuario || mongoose.model<IUsuario>("Usuario", UsuarioSchema);

// Componente reutilizavel
export default Usuario;
