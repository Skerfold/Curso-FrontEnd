import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../services/mongodb';
import Usuario from '../../../models/usuarios.model';
import { generateToken } from '../../../utils/auth';

export async function POST(req: NextRequest) {
    try {
        const { email, senha } = await req.json();

        if (!email || !senha) {
            return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
        }

        await connectMongo();
        const usuario = await Usuario.findOne({ email }).select('+senha');

        if (!usuario || !(await usuario.comparePassword(senha))) {
            return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
        }

        const token = generateToken({ id: usuario._id, funcao: usuario.funcao });

        const { senha: _, ...usuarioSemSenha } = usuario.toObject();

        return NextResponse.json({ usuario: usuarioSemSenha, token });
    } catch (error) {
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
