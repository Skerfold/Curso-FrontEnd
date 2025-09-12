// Definir primeiro a infraestrutura do OBJ 

import mongoose, { Document, Model, Schema } from "mongoose";

export interface Itarefa extends Document { 
    // Herdamos a base Document do Mongoose 
    // Vamos criar os atributos do OBJ 
    titulo: string;
    concluida: boolean;
    criadaEm: Date;
}

// Vamos criar a Regra do Schema 

const TarefaSchema: Schema <Itarefa> = new mongoose.Schema({ 
    titulo: { 
        type: String,
        required:[true, "O titulo é obrigatorio"],
        trim: true,
        maxLenght: [50, "Máximo de 50 caracteres"]
    },
    concluida: {
        type: Boolean,
        default: false
    },
    criadaEm: {
        type: Date,
        default: Date.now // Pega o carimbo de data e hora
    }
});

const Tarefa: Model<Itarefa> = mongoose.models.Tarefa || mongoose.model<Itarefa>("Tarefa", TarefaSchema);

// Componente reutilizavel
export default Tarefa; 