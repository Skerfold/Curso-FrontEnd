// Definir primeiro a infraestrutura do OBJ

import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";


export interface IUsuario extends Document {
    nome: string;
    email: string;
    senha: string;
    funcao: string;
    comparePassword(userPassword: string): Promise<boolean>;
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
        enum: ['tecnico', 'gestor', 'admin'],
        required: [true, "A função é obrigatória"],
        trim: true,
        maxlength: [50, "Máximo de 50 caracteres"]
    }
}, { timestamps: true });

UsuarioSchema.pre<IUsuario>('save', async function (next){
    if(!this.isModified('senha') || !this.senha) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error:any) {
        next(error);
    }
})

UsuarioSchema.methods.comparePassword = function (userPassword:string): Promise<boolean>{
    return  bcrypt.compare(userPassword, this.senha);
}



const Usuario: Model<IUsuario> = mongoose.models.Usuario || mongoose.model<IUsuario>("Usuario", UsuarioSchema);

// Componente reutilizavel
export default Usuario;
