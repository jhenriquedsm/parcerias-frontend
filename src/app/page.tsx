'use client'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-10 text-center">Parcerias Serpro</h1>

      <div className="flex gap-6">
        <button
          onClick={() => router.push('/parcerias/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
        >
          ➕ Cadastrar Parceria
        </button>

        <button
          onClick={() => router.push('/parcerias')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
        >
          📄 Listar Parcerias
        </button>
      </div>
    </main>
  )
}