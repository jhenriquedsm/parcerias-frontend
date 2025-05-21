'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NovaParceriaPage() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [newsDate, setNewsDate] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('https://parcerias-serpro.onrender.com/parcerias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, url, newsDate }),
      })

      if (!res.ok) {
        throw new Error('Erro ao cadastrar parceria')
      }

      alert('Parceria cadastrada com sucesso!')
    } catch (err) {
      console.error(err)
      alert('Erro ao enviar formulário')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1d3a] p-8 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <button
          onClick={() => router.push('/')}
          className="mb-4 text-blue-400 underline"
        >
          ← Voltar para Home
        </button>
        <h1 className="text-white text-2xl font-bold mb-6">Nova Parceria</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-[#1B2A47] text-white border border-gray-600 rounded-lg placeholder-white"
            required
          />
          <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 bg-[#1B2A47] text-white border border-gray-600 rounded-lg placeholder-white"
            required
          />
          <input
            type="date"
            value={newsDate}
            onChange={(e) => setNewsDate(e.target.value)}
            className="w-full p-3 bg-[#1B2A47] text-white border border-gray-600 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}