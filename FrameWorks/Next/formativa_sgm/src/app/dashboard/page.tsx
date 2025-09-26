'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    nome: string;
    funcao: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (!token || !userData) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(userData));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold">SGM - Sistema de Gestão de Manutenções</h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">Olá, {user.nome} ({user.funcao})</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <a href="/usuarios" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
                            <h3 className="text-lg font-semibold">Usuários</h3>
                            <p>Gerenciar usuários do sistema</p>
                        </a>
                        <a href="/equipamentos" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
                            <h3 className="text-lg font-semibold">Equipamentos</h3>
                            <p>Gerenciar equipamentos</p>
                        </a>
                        <a href="/ordens-servico" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
                            <h3 className="text-lg font-semibold">Ordens de Serviço</h3>
                            <p>Gerenciar ordens de serviço</p>
                        </a>
                        <a href="/manutencoes" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
                            <h3 className="text-lg font-semibold">Manutenções</h3>
                            <p>Gerenciar manutenções</p>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
