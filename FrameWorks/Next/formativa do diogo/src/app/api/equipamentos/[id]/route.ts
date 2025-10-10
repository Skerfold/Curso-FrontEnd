// Rotas que precisam do ID (PATCH, DELETE, GET by ID)

import { deleteEquipamento, getEquipamentoById, updateEquipamento } from "@/controllers/EquipamentoController";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
}

// Método PATCH
export async function PATCH(req: NextRequest, { params } : { params: Promise<Params> }) {
    try {
        const {id} = await params;
        const data = await req.json();
        const equipamentoAtualizado = await updateEquipamento(id, data);
        if (!equipamentoAtualizado) {
            return NextResponse.json({ success: false, error: "Not Found."})
        }
        return NextResponse.json({ success: true, data: equipamentoAtualizado});
    } catch ( error ) {
        return NextResponse.json({ success: false, error: error });
    }
}

//GET by ID
export async function GET (request: NextRequest, {params}:{params:Promise<Params>}){
    try {
        const {id} = await params;
        const data = await getEquipamentoById(id);
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
        await deleteEquipamento(id);
        return NextResponse.json({success: true, data: {}});
    } catch (error) {
        return NextResponse.json({ success: false, error: error})
    }
}
