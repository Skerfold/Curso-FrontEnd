import { NextResponse } from 'next/server';
import connectMongo from '../services/mongodb';
import OrdemServico, { IOrdemServico } from '../models/ordem-servico.model';

export async function getAllOrdensServico() {
    try {
        await connectMongo();
        const ordens = await OrdemServico.find().populate('equipId').populate('tecnicoId', '-senha');
        return NextResponse.json(ordens);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar ordens de serviço' }, { status: 500 });
    }
}

export async function getOrdemServicoById(id: string) {
    try {
        await connectMongo();
        const ordem = await OrdemServico.findById(id).populate('equipId').populate('tecnicoId', '-senha');
        if (!ordem) {
            return NextResponse.json({ error: 'Ordem de serviço não encontrada' }, { status: 404 });
        }
        return NextResponse.json(ordem);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar ordem de serviço' }, { status: 500 });
    }
}

export async function createOrdemServico(data: Partial<IOrdemServico>) {
    try {
        await connectMongo();
        const ordem = new OrdemServico(data);
        await ordem.save();
        await ordem.populate('equipId');
        if (data.tecnicoId) await ordem.populate('tecnicoId', '-senha');
        return NextResponse.json(ordem, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Erro ao criar ordem de serviço' }, { status: 500 });
    }
}

export async function updateOrdemServico(id: string, data: Partial<IOrdemServico>) {
    try {
        await connectMongo();
        const ordem = await OrdemServico.findByIdAndUpdate(id, data, { new: true }).populate('equipId').populate('tecnicoId', '-senha');
        if (!ordem) {
            return NextResponse.json({ error: 'Ordem de serviço não encontrada' }, { status: 404 });
        }
        return NextResponse.json(ordem);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar ordem de serviço' }, { status: 500 });
    }
}

export async function deleteOrdemServico(id: string) {
    try {
        await connectMongo();
        const ordem = await OrdemServico.findByIdAndDelete(id);
        if (!ordem) {
            return NextResponse.json({ error: 'Ordem de serviço não encontrada' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Ordem de serviço deletada com sucesso' });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao deletar ordem de serviço' }, { status: 500 });
    }
}
