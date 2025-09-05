//baser o meu modelo no Schema da Coleção

import mongoose from "mongoose";

const TarefaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "O título é obrigatório"],
        trim: true,
        maxlength: [100, "O título não pode ter mais de 100 caracteres"]
    },
    concluida: { 
        type: Boolean, 
        default: false, // toda tarefa criada não está concluída
    },
    dataCriacao: { 
        type: Date,
        default: Date.now // data e hora de criação da tarefa
    }
});

export default mongoose.models.Tarefa || mongoose.model("Tarefa", TarefaSchema); // se já existir o modelo, usa ele, senão cria um novo
// exporta o modelo como tarefa caso não exista
// caso já tenha uma tarefa criada, usa ela 