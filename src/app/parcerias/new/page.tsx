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
      const res = await fetch('http://localhost:8080/parcerias', {
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
    <div className="p-8 max-w-xl mx-auto">
        <button
        onClick={() => router.push('/')}
        className="mb-4 text-blue-600 underline"
      >
        ← Voltar para Home
      </button>
      <h1 className="text-2xl font-bold mb-4">Nova Parceria</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={newsDate}
          onChange={(e) => setNewsDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}