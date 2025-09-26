import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../services/mongodb';
import Usuario, { IUsuario } from '../models/usuarios.model';

export async function getAllUsuarios() {
    try {
        await connectMongo();
        const usuarios = await Usuario.find().select('-senha');
        return NextResponse.json(usuarios);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 });
    }
}

export async function getUsuarioById(id: string) {
    try {
        await connectMongo();
        const usuario = await Usuario.findById(id).select('-senha');
        if (!usuario) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }
        return NextResponse.json(usuario);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar usuário' }, { status: 500 });
    }
}

export async function createUsuario(data: Partial<IUsuario>) {
    try {
        await connectMongo();
        const usuario = new Usuario(data);
        await usuario.save();
        const { senha, ...usuarioSemSenha } = usuario.toObject();
        return NextResponse.json(usuarioSemSenha, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 });
    }
}

export async function updateUsuario(id: string, data: Partial<IUsuario>) {
    try {
        await connectMongo();
        const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true }).select('-senha');
        if (!usuario) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }
        return NextResponse.json(usuario);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar usuário' }, { status: 500 });
    }
}

export async function deleteUsuario(id: string) {
    try {
        await connectMongo();
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao deletar usuário' }, { status: 500 });
    }
}
