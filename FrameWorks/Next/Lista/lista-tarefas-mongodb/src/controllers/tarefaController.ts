

// Funções do Controller

import Tarefa, { Itarefa } from "@/models/Tarefa";
import connectMongo from "@/services/mongodb";

// Get
export const getAllTarefas = async(): Promise<Itarefa[]> => {
    await connectMongo();
    const tarefas = await Tarefa.find({});
    return tarefas;
}

// Post
export const createTarefa = async(data:Partial<Itarefa>):Promise<Itarefa> =>{
    await connectMongo(); 
    const tarefa = await Tarefa.create(data);
    return tarefa;
}

// Patch
export const updateTarefa = async(id:string, data:Partial<Itarefa>):Promise<Itarefa | null> =>{
    await connectMongo();
    const tarefa = await Tarefa.findByIdAndUpdate(id, data, {
        new: true
    });
    return tarefa;
}

// Delete
export const deleteTarefa = async(id:string):Promise<boolean> => {
    await connectMongo();
    const resultado = await Tarefa.findByIdAndDelete(id);
    return !!resultado;
}
