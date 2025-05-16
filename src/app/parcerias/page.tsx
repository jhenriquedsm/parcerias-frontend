'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import api from '@/services/api';
import ParceriaCard from '@/components/ParceriaCard';

type Parceria = {
  id?: number;      
  title: string;
  url: string;
  newsDate: string;
};

export default function ParceriasPage() {
  const [parcerias, setParcerias] = useState<Parceria[]>([]);
  const router = useRouter()

  useEffect(() => {
    api.get('/parcerias')
      .then((res) => setParcerias(res.data))
      .catch((err) => console.error('Erro ao buscar parcerias', err));
  }, []);

  return (
    <main className="p-6">
        <button
        onClick={() => router.push('/')}
        className="mb-4 text-blue-600 underline"
      >
        ← Voltar para Home
      </button>
      <h1 className="text-2xl font-bold mb-4">Lista de Parcerias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parcerias.map((parceria) => (
          <ParceriaCard key={parceria.id} parceria={parceria} />
        ))}
      </div>
    </main>
  );
}
