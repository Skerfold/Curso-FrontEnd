import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IManutencao extends Document {
    tipo: string;
    dataPrevista: Date;
    dataRealizada?: Date;
    descricao: string;
    ordemId: Types.ObjectId;
}

const ManutencaoSchema: Schema<IManutencao> = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['preventiva', 'correiva'],
        required: [true, "O tipo é obrigatório"],
        trim: true,
        maxlength: [50, "Máximo de 50 caracteres"]
    },
    dataPrevista: {
        type: Date,
        required: [true, "A data prevista é obrigatória"]
    },
    dataRealizada: {
        type: Date,
        default: null
    },
    descricao: {
        type: String,
        required: [true, "A descrição é obrigatória"],
        trim: true,
        maxlength: [500, "Máximo de 500 caracteres"]
    },
    ordemId: {
        type: Schema.Types.ObjectId,
        ref: 'OrdemServico',
        required: true
    }
}, { timestamps: true });

const Manutencao: Model<IManutencao> = mongoose.models.Manutencao || mongoose.model<IManutencao>("Manutencao", ManutencaoSchema);

export default Manutencao;
