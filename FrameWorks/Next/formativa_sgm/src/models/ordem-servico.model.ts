// Definir primeiro a infraestrutura do OBJ

import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IOrdemServico extends Document {
    titulo: string;
    descricao: string;
    tipoManutencao: string;
    status: string;
    equipId: Types.ObjectId;
    tecnicoId: Types.ObjectId;
    dataConclusao?: Date;
}

const OrdemServicoSchema: Schema<IOrdemServico> = new mongoose.Schema({
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
        enum: ['preventiva', 'correiva'],
        required: [true, "O tipo de manutenção é obrigatório"],
        trim: true,
        maxlength: [50, "Máximo de 50 caracteres"]
    },
    status: {
        type: String,
        enum: ['aberta', 'atribuida', 'em_andamento', 'concluida'],
        required: [true, "O status é obrigatório"],
        trim: true,
        maxlength: [20, "Máximo de 20 caracteres"],
        default: 'aberta'
    },
    equipId: {
        type: Schema.Types.ObjectId,
        ref: 'Equipamento',
        required: true
    },
    tecnicoId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    },
    dataConclusao: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const OrdemServico: Model<IOrdemServico> = mongoose.models.OrdemServico || mongoose.model<IOrdemServico>("OrdemServico", OrdemServicoSchema);

export default OrdemServico;
