import { NextResponse } from 'next/server';
import connectMongo from '../services/mongodb';
import Manutencao, { IManutencao } from '../models/manutencao.model';

export async function getAllManutencoes() {
    try {
        await connectMongo();
        const manutencoes = await Manutencao.find().populate('ordemId');
        return NextResponse.json(manutencoes);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar manutenções' }, { status: 500 });
    }
}

export async function getManutencaoById(id: string) {
    try {
        await connectMongo();
        const manutencao = await Manutencao.findById(id).populate('ordemId');
        if (!manutencao) {
            return NextResponse.json({ error: 'Manutenção não encontrada' }, { status: 404 });
        }
        return NextResponse.json(manutencao);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar manutenção' }, { status: 500 });
    }
}

export async function createManutencao(data: Partial<IManutencao>) {
    try {
        await connectMongo();
        const manutencao = new Manutencao(data);
        await manutencao.save();
        await manutencao.populate('ordemId');
        return NextResponse.json(manutencao, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Erro ao criar manutenção' }, { status: 500 });
    }
}

export async function updateManutencao(id: string, data: Partial<IManutencao>) {
    try {
        await connectMongo();
        const manutencao = await Manutencao.findByIdAndUpdate(id, data, { new: true }).populate('ordemId');
        if (!manutencao) {
            return NextResponse.json({ error: 'Manutenção não encontrada' }, { status: 404 });
        }
        return NextResponse.json(manutencao);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar manutenção' }, { status: 500 });
    }
}

export async function deleteManutencao(id: string) {
    try {
        await connectMongo();
        const manutencao = await Manutencao.findByIdAndDelete(id);
        if (!manutencao) {
            return NextResponse.json({ error: 'Manutenção não encontrada' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Manutenção deletada com sucesso' });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao deletar manutenção' }, { status: 500 });
    }
}
