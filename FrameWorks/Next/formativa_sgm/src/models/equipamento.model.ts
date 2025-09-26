// Definir primeiro a infraestrutura do OBJ

import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEquipamento extends Document {
    nome: string;
    modelo: string;
    numeroSerie: string;
    localizacao: string;
    status: string;
}

const EquipamentoSchema: Schema<IEquipamento> = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O nome é obrigatório"],
        trim: true,
        maxlength: [50, "Máximo de 50 caracteres"]
    },
    modelo: {
        type: String,
        required: [true, "O modelo é obrigatório"],
        trim: true,
        maxlength: [50, "Máximo de 50 caracteres"]
    },
    numeroSerie: {
        type: String,
        required: [true, "O número de série é obrigatório"],
        trim: true,
        maxlength: [50, "Máximo de 50 caracteres"]
    },
    localizacao: {
        type: String,
        required: [true, "A localização é obrigatória"],
        trim: true,
        maxlength: [100, "Máximo de 100 caracteres"]
    },
    status: {
        type: String,
        required: [true, "O status é obrigatório"],
        trim: true,
        maxlength: [20, "Máximo de 20 caracteres"]
    }
}, { timestamps: true });

const Equipamento: Model<IEquipamento> = mongoose.models.Equipamento || mongoose.model<IEquipamento>("Equipamento", EquipamentoSchema);

export default Equipamento;
