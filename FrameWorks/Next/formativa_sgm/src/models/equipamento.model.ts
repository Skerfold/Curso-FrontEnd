// Definir primeiro a infraestrutura do OBJ

import mongoose, { Document, Model, Schema } from "mongoose";

export interface Equipamento extends Document {
    id: number;
    nome: string;
    modelo: string;
    numeroSerie: string;
    localizacao: string;
    status: string;
    create(): Promise<Equipamento>;
    read(): Promise<Equipamento | null>;
    update(data: Partial<Equipamento>): Promise<Equipamento | null>;
    delete(): Promise<void>;
}

const EquipamentoSchema: Schema<Equipamento> = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
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

EquipamentoSchema.methods.create = async function() {
    return this.save();
};

EquipamentoSchema.methods.read = async function() {
    return await Equipamento.findById(this._id);
};

EquipamentoSchema.methods.update = async function(data: Partial<Equipamento>) {
    return await Equipamento.findByIdAndUpdate(this._id, data, { new: true });
};

EquipamentoSchema.methods.delete = async function() {
    await Equipamento.findByIdAndDelete(this._id);
};

const Equipamento: Model<Equipamento> = mongoose.models.Equipamento || mongoose.model<Equipamento>("Equipamento", EquipamentoSchema);

export default Equipamento;
