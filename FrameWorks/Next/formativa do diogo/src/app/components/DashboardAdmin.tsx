"use client";

import { useEffect, useState } from "react";

interface Equipamento {
  _id: string;
  modelo: string;
  marca: string;
  localizacao: string;
  numSerie: string;
  status: string;
}

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

interface Usuario {
  _id: string;
  username: string;
  tipo: string;
}

import "./DashboardAdmin.css";

export default function DashboardAdmin() {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [ordemServicos, setOrdemServicos] = useState<OrdemServico[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [activeTab, setActiveTab] = useState<'equipamentos' | 'ordemservicos' | 'usuarios'>('equipamentos');

  useEffect(() => {
    fetchEquipamentos();
    fetchOrdemServicos();
    fetchUsuarios();
  }, []);

  const fetchEquipamentos = async () => {
    const res = await fetch('/api/equipamentos');
    const data = await res.json();
    if (data.success) setEquipamentos(data.data);
  };

  const fetchOrdemServicos = async () => {
    const res = await fetch('/api/ordemservicos');
    const data = await res.json();
    if (data.success) setOrdemServicos(data.data);
  };

  const fetchUsuarios = async () => {
    const res = await fetch('/api/usuarios');
    const data = await res.json();
    if (data.success) setUsuarios(data.data);
  };

  const handleDeleteEquipamento = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar?')) {
      await fetch(`/api/equipamentos/${id}`, { method: 'DELETE' });
      fetchEquipamentos();
    }
  };

  const handleDeleteOrdemServico = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar?')) {
      await fetch(`/api/ordemservicos/${id}`, { method: 'DELETE' });
      fetchOrdemServicos();
    }
  };

  const handleDeleteUsuario = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar?')) {
      await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
      fetchUsuarios();
    }
  };

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <nav>
        <button onClick={() => setActiveTab('equipamentos')}>Equipamentos</button>
        <button onClick={() => setActiveTab('ordemservicos')}>Ordens de Serviço</button>
        <button onClick={() => setActiveTab('usuarios')}>Usuários</button>
      </nav>
      {activeTab === 'equipamentos' && (
        <div>
          <h2>Equipamentos</h2>
          <table>
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Localização</th>
                <th>Número de Série</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.map(e => (
                <tr key={e._id}>
                  <td>{e.modelo}</td>
                  <td>{e.marca}</td>
                  <td>{e.localizacao}</td>
                  <td>{e.numSerie}</td>
                  <td>{e.status}</td>
                  <td>
                    <button>Editar</button>
                    <button onClick={() => handleDeleteEquipamento(e._id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'ordemservicos' && (
        <div>
          <h2>Ordens de Serviço</h2>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Tipo Manutenção</th>
                <th>Status</th>
                <th>Data Solicitada</th>
                <th>Data Finalização</th>
                <th>Técnico ID</th>
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
                  <td>{o.tecnicoId}</td>
                  <td>{o.EquipamentoId}</td>
                  <td>
                    <button>Editar</button>
                    <button onClick={() => handleDeleteOrdemServico(o._id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'usuarios' && (
        <div>
          <h2>Usuários</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.tipo}</td>
                  <td>
                    <button>Editar</button>
                    <button onClick={() => handleDeleteUsuario(u._id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
