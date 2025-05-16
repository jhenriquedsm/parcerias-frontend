'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    api.get('/parcerias')
      .then((res) => setParcerias(res.data))
      .catch((err) => console.error('Erro ao buscar parcerias', err));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Parcerias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parcerias.map((parceria) => (
          <ParceriaCard key={parceria.id} parceria={parceria} />
        ))}
      </div>
    </main>
  );
}
