// rotas para GET e POST

import Tarefa from "@/models/Tarefa";
import connectMongo from "@/services/mongpodb";
import { NextResponse } from "next/server"; //biblioteca intern

//get
export async function GET() {
  try {
    await connectMongo(); //conectar com o mongoDB
    const tarefas = await Tarefa.find({});
    //retornar as tarefas
    //usando o NextResponse => explicando o NextResponse
    // é uma resposta do NEXT para Requisiçoes HTTP
    return NextResponse.json(tarefas, { status: 200 }); // retorna as tarefas com status 200
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar as tarefas" },
      { status: 500 }
    );
  }
}

//post
export async function POST(req) {
  try {
    await connectMongo();
    const data = await req.json(); //pegar o corpo da requisição
    const tarefa = await Tarefa.create(data); //criar a tarefa no banco de dados
    return NextResponse.json(tarefa, { status: 201 }); //retornar a tarefa criada com status 201
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar a tarefa" },
      { status: 500 }
    );
  }
}
