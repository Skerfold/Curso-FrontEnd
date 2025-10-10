// Rotas que precisam do ID (PATCH, DELETE, GET by ID)

import { deleteUsuario, getUsuarioById, updateUsuario } from "@/controllers/UsuarioController";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
}

// Método PATCH
export async function PATCH(req: NextRequest, { params } : { params: Promise<Params> }) {
    try {
        const {id} = await params;
        const data = await req.json();
        const usuarioAtualizado = await updateUsuario(id, data);
        if (!usuarioAtualizado) {
            return NextResponse.json({ success: false, error: "Not Found."})
        }
        return NextResponse.json({ success: true, data: usuarioAtualizado});
    } catch ( error ) {
        return NextResponse.json({ success: false, error: error });
    }
}

//GET by ID
export async function GET (request: NextRequest, {params}:{params:Promise<Params>}){
    try {
        const {id} = await params;
        const data = await getUsuarioById(id);
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
        await deleteUsuario(id);
        return NextResponse.json({success: true, data: {}});
    } catch (error) {
        return NextResponse.json({ success: false, error: error})
    }
}
