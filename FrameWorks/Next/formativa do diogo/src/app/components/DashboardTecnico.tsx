"use client";

import { useEffect, useState } from "react";

interface OrdemServico {
  _id: string;
  titulo: string;
  descricao: string;
  tipoManutencao: string;
  status: string;
  dataSolictada: string;
  dataFinalizacao: string;
  tecnicoId: string;
  EquipamentoId: string;
}

import "./DashboardTecnico.css";

export default function DashboardTecnico() {
  const [ordemServicos, setOrdemServicos] = useState<OrdemServico[]>([]);

  useEffect(() => {
    fetchOrdemServicos();
  }, []);

  const fetchOrdemServicos = async () => {
    const res = await fetch('/api/ordemservicos');
    const data = await res.json();
    if (data.success) {
      // Filter by tecnicoId if needed, but for now show all
      setOrdemServicos(data.data);
    }
  };

  return (
    <div>
      <h1>Dashboard Técnico</h1>
      <div>
        <h2>Minhas Ordens de Serviço</h2>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Tipo Manutenção</th>
              <th>Status</th>
              <th>Data Solicitada</th>
              <th>Data Finalização</th>
              <th>Equipamento ID</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ordemServicos.map(o => (
              <tr key={o._id}>
                <td>{o.titulo}</td>
                <td>{o.descricao}</td>
                <td>{o.tipoManutencao}</td>
                <td>{o.status}</td>
                <td>{new Date(o.dataSolictada).toLocaleDateString()}</td>
                <td>{o.dataFinalizacao ? new Date(o.dataFinalizacao).toLocaleDateString() : '-'}</td>
                <td>{o.EquipamentoId}</td>
                <td>
                  <button>Atualizar Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
