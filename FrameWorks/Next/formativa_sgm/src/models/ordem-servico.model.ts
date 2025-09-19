// Definir primeiro a infraestrutura do OBJ

import mongoose, { Document, Model, Schema } from "mongoose";

export interface OrdemServico extends Document {
    id: number;
    titulo: string;
    descricao: string;
    tipoManutencao: string;
    status: string;
    create(): Promise<OrdemServico>;
    read(): Promise<OrdemServico | null>;
    update(data: Partial<OrdemServico>): Promise<OrdemServico | null>;
    delete(): Promise<void>;
}

const OrdemServicoSchema: Schema<OrdemServico> = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: [true, "O título é obrigatório"],
        trim: true,
        maxlength: [100, "Máximo de 100 caracteres"]
    },
    descricao: {
        type: String,
        required: [true, "A descrição é obrigatória"],
        trim: true,
        maxlength: [500, "Máximo de 500 caracteres"]
    },
    tipoManutencao: {
        type: String,
        required: [true, "O tipo de manutenção é obrigatório"],
        trim: true,
        maxlength: [50, "Máximo de 50 caracteres"]
    },
    status: {
        type: String,
        required: [true, "O status é obrigatório"],
        trim: true,
        maxlength: [20, "Máximo de 20 caracteres"]
    }
}, { timestamps: true });

OrdemServicoSchema.methods.create = async function() {
    return this.save();
};

OrdemServicoSchema.methods.read = async function() {
    return await OrdemServico.findById(this._id);
};

OrdemServicoSchema.methods.update = async function(data: Partial<OrdemServico>) {
    return await OrdemServico.findByIdAndUpdate(this._id, data, { new: true });
};

OrdemServicoSchema.methods.delete = async function() {
    await OrdemServico.findByIdAndDelete(this._id);
};

const OrdemServico: Model<OrdemServico> = mongoose.models.OrdemServico || mongoose.model<OrdemServico>("OrdemServico", OrdemServicoSchema);

export default OrdemServico;
