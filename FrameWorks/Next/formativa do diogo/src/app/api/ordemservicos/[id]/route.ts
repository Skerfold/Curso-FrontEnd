// Rotas que precisam do ID (PATCH, DELETE, GET by ID)

import { deleteOrdemServico, getOrdemServicoById, updateOrdemServico } from "@/controllers/OrdemServicoController";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
}

// Método PATCH
export async function PATCH(req: NextRequest, { params } : { params: Promise<Params> }) {
    try {
        const {id} = await params;
        const data = await req.json();
        const ordemservicoAtualizado = await updateOrdemServico(id, data);
        if (!ordemservicoAtualizado) {
            return NextResponse.json({ success: false, error: "Not Found."})
        }
        return NextResponse.json({ success: true, data: ordemservicoAtualizado});
    } catch ( error ) {
        return NextResponse.json({ success: false, error: error });
    }
}

//GET by ID
export async function GET (request: NextRequest, {params}:{params:Promise<Params>}){
    try {
        const {id} = await params;
        const data = await getOrdemServicoById(id);
        if(!data){
            return NextResponse.json({success:false, error: "Not Found"});
        }
        return NextResponse.json({success:true, data:data});
    } catch (error) {
        return NextResponse.json({success:false, error:error});
    }
}

// DELETE
export async function DELETE(request: NextRequest, {params} : {params: Promise<Params> }) {
    try {
        const {id} = await params;
        await deleteOrdemServico(id);
        return NextResponse.json({success: true, data: {}});
    } catch (error) {
        return NextResponse.json({ success: false, error: error})
    }
}
