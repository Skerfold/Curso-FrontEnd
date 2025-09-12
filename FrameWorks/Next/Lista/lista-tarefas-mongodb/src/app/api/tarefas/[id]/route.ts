// Patch e Delete que usam ID para fazer as Requisições HTTP

import { deleteTarefa, updateTarefa } from "@/controllers/tarefaController";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface Parametros {
  id: string;
}

// Params -> Next precisa dos params para dar acesso ao segmento da URL
// Params.id => "/api/tarefas/123" => Transforma os params em endereço URL

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<Parametros> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const tarefaAtualizada = await updateTarefa(id, data);
    // Vou ter 2 respostas
    if (!tarefaAtualizada) {
      return NextResponse.json(
        { success: false, error: "Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: tarefaAtualizada },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Falha atualizar As Tarefas: ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE({params}:{params:Promise<Parametros>}){
    try {
        const {id} = await params;
        const resultado = await deleteTarefa(id);
        //2 possiblidades
        if(!resultado){
            return NextResponse.json({success:false, error:"Not found"},{status:404})
        }
        return NextResponse.json({success:true},{status:200});
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: `Falha ao deletar a tarefa: ${error}`
        }, {status: 500});
        
    }
}
