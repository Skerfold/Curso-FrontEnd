//índica que é a tela usada pelo cliente-side
"use client";

import { Itarefa } from "@/models/Tarefa";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Home() {
  //useState => Armazenamento no localStorage
  const [tarefas, setTarefas] = useState<Itarefa[]>([]);
  const [newTarefa, SetNewTarefa] = useState<string>("");

  //useEffect => usado para executar códigos ligados a renderização do componente no cliente-side
  useEffect(() => {
    // fazer o useeffect no carregamento da tela
    fetchTarefas(); //carregar todas as tarefas do banco de Dados
  }, []);

  //carregar Tarefas
  const fetchTarefas = async () => {
    try {
      const listaTarefas = await fetch("/api/tarefas"); //realiza a conexão http com o backend
      const data = await listaTarefas.json(); //verifica se esta em json
      if (data.success) {
        setTarefas(data.data as Itarefa[]); //preenche o vetor localStorage com as info do BD
      }
    } catch (error) {
      console.error(error);
    }
  };

  //add Tarefa
  const addTarefa = async (e: FormEvent) => {
    e.preventDefault(); //evita o carregamento da tela ao apertar o botão submmit
    if (!newTarefa.trim()) return; // não adiciona tarefa vazia
    try {
      const resultado = await fetch("/api/tarefas", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ titulo: newTarefa }),
      });
      const data = await resultado.json();
      if (data.success) {
        //fecthTarefas();
        setTarefas([...tarefas, data.data]); //adiciona a nova tarefa no vetor
        SetNewTarefa("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //updateTarefa
  const updateTarefa = async (id: string, data: Partial<Itarefa>) => {
    try {
      const resultado = await fetch(`/api/tarefas/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await resultado.json();
      if (res.success) {
        // Update local state
        setTarefas(tarefas.map(t => String(t._id) === id ? res.data : t));
      }
    } catch (error) {
      console.error(error);
    }
  };

  //deleteTarefa
const deleteTarefa = async(id:string) =>{
    try {
      const resultado = await fetch(`/api/tarefas/${id}`,{
        method: "DELETE",
      });
      if(resultado){
        //fetchTarefas(); //server-side
        setTarefas(tarefas.filter((tarefa)=> tarefa._id !==id));//remove a tarefa do vetor
      }
    } catch (error) {
      console.error(error);
    }
  }

  //html => ReactDOM
  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={addTarefa}>
        <input
          type="text"
          value={newTarefa}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            SetNewTarefa(e.target.value)
          }
          placeholder="Nova Tarefa"
        />
        <button type="submit">Adicionar Tarefa</button>
      </form>
      <div className="tarefas-container">
        <ul>
          {tarefas.map((tarefa) => {
            const id = String(tarefa._id);
            return (
              <li key={id} className={tarefa.concluida ? "concluida" : ""}>
                {tarefa.titulo}
                <div className="tarefa-actions">
                  <button onClick={() => updateTarefa(id, { concluida: !tarefa.concluida })}>
                    {tarefa.concluida ? "Desmarcar" : "Concluir"}
                  </button>
                  <button onClick={() => deleteTarefa(id)}>
                    Deletar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
