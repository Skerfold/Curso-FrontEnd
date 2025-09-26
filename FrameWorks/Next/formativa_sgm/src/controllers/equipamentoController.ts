import { NextResponse } from 'next/server';
import connectMongo from '../services/mongodb';
import Equipamento, { IEquipamento } from '../models/equipamento.model';

export async function getAllEquipamentos() {
    try {
        await connectMongo();
        const equipamentos = await Equipamento.find();
        return NextResponse.json(equipamentos);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar equipamentos' }, { status: 500 });
    }
}

export async function getEquipamentoById(id: string) {
    try {
        await connectMongo();
        const equipamento = await Equipamento.findById(id);
        if (!equipamento) {
            return NextResponse.json({ error: 'Equipamento não encontrado' }, { status: 404 });
        }
        return NextResponse.json(equipamento);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar equipamento' }, { status: 500 });
    }
}

export async function createEquipamento(data: Partial<IEquipamento>) {
    try {
        await connectMongo();
        const equipamento = new Equipamento(data);
        await equipamento.save();
        return NextResponse.json(equipamento, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Número de série já cadastrado' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Erro ao criar equipamento' }, { status: 500 });
    }
}

export async function updateEquipamento(id: string, data: Partial<IEquipamento>) {
    try {
        await connectMongo();
        const equipamento = await Equipamento.findByIdAndUpdate(id, data, { new: true });
        if (!equipamento) {
            return NextResponse.json({ error: 'Equipamento não encontrado' }, { status: 404 });
        }
        return NextResponse.json(equipamento);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar equipamento' }, { status: 500 });
    }
}

export async function deleteEquipamento(id: string) {
    try {
        await connectMongo();
        const equipamento = await Equipamento.findByIdAndDelete(id);
        if (!equipamento) {
            return NextResponse.json({ error: 'Equipamento não encontrado' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Equipamento deletado com sucesso' });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao deletar equipamento' }, { status: 500 });
    }
}
