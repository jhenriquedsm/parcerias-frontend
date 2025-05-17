'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '../../public/logo.png' 

export default function HomePage() {
  const router = useRouter()

   return (
    <main className="flex flex-col min-h-screen bg-[#0A1E3F] text-white p-6">
      <div className="flex justify-between items-center w-full mb-12">
        <Image src={logo} alt="Logo Serpro" width={160} height={60} />
      </div>

      <h1 className="text-4xl font-bold mb-10 text-center">Parcerias Serpro</h1>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => router.push('/parcerias/new')}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow-lg transition"
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

      <div className="flex-grow" />

      <footer className="text-center text-sm text-gray-400 mt-12 border-t border-gray-600 pt-4">
        <p>Developed by José Henrique</p>
        <p className='text-red-500'>Esse projeto não é um projeto oficial do Serpro</p>
      </footer>
    </main>
  )
}