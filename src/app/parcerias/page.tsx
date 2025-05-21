'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import ParceriaCard from '@/components/ParceriaCard';

type Parceria = {
  id?: number;      
  title: string;
  url: string;
  newsDate: string; // Formato esperado: 'yyyy-mm-dd'
};

export default function ParceriasPage() {
  const [parcerias, setParcerias] = useState<Parceria[]>([]);
  const [ordenacao, setOrdenacao] = useState<'recente' | 'antiga'>('recente');
  const router = useRouter();

  useEffect(() => {
    api
      .get('/parcerias')
      .then((res) => setParcerias(res.data))
      .catch((err) => console.error('Erro ao buscar parcerias', err));
  }, []);

  const handleDelete = (id: number) => {
    setParcerias((prev) => prev.filter((p) => p.id !== id));
  };

  const parceriasOrdenadas = [...parcerias].sort((a, b) => {
    const dataA = new Date(a.newsDate).getTime();
    const dataB = new Date(b.newsDate).getTime();
    return ordenacao === 'recente' ? dataB - dataA : dataA - dataB;
  });

  return (
    <main className="min-h-screen bg-[#0a1d3a] p-6">
      <button
        onClick={() => router.push('/')}
        className="mb-4 text-blue-400 underline"
      >
        ← Voltar para Home
      </button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl font-bold">Lista de Parcerias</h1>
        <button
          onClick={() =>
            setOrdenacao((prev) => (prev === 'recente' ? 'antiga' : 'recente'))
          }
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ordenar: {ordenacao === 'recente' ? 'Mais Recentes' : 'Mais Antigas'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parceriasOrdenadas.map((parceria) => (
          <ParceriaCard
            key={parceria.id}
            parceria={parceria}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  );
}