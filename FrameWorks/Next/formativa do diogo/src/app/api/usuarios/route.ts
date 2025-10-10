// Rotas que não precisam de autenticação ID ( GET / POST )

import { getUsuarios, createUsuario } from "@/controllers/UsuarioController";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getUsuarios();
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newUsuario = await createUsuario(data);
    return NextResponse.json({ success: true, data: newUsuario });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
