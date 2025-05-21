'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

type Parceria = {
  id: number
  title: string
  url: string
  newsDate: string
}

export default function EditarParceriaPage() {
  const { id } = useParams()
  const router = useRouter()
  const [parceria, setParceria] = useState<Parceria | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    newsDate: '',
  })

  useEffect(() => {
    const fetchParceria = async () => {
      try {
        const res = await fetch(`https://parcerias-serpro.onrender.com/parcerias/${id}`)
        if (!res.ok) throw new Error('Erro ao buscar parceria')
        const data = await res.json()
        setParceria(data)
        setFormData({
          title: data.title,
          url: data.url,
          newsDate: data.newsDate.split('T')[0],
        })
      } catch (err) {
        console.error(err)
        alert('Erro ao buscar parceria')
      }
    }

    fetchParceria()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`https://parcerias-serpro.onrender.com/parcerias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: Number(id) }),
      })

      if (!res.ok) throw new Error('Erro ao atualizar parceria')
      alert('Parceria atualizada com sucesso!')
      router.push('/')
    } catch (err) {
      console.error(err)
      alert('Erro ao atualizar parceria')
    }
  }

  if (!parceria) 
    return <p className="p-4 text-white bg-[#0a1d3a] min-h-screen flex items-center justify-center">Carregando parceria...</p>

  return (
    <div className="min-h-screen bg-[#0a1d3a] p-8 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <button
          onClick={() => router.push('/parcerias')}
          className="mb-4 text-blue-400 underline"
        >
          ← Voltar para Parcerias
        </button>
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          Editar Parceria
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-[#1B2A47] text-white border border-gray-600 rounded-lg placeholder-gray-400"
            required
          />
          <input
            type="url"
            name="url"
            placeholder="URL"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-3 bg-[#1B2A47] text-white border border-gray-600 rounded-lg placeholder-gray-400"
            required
          />
          <input
            type="date"
            name="newsDate"
            value={formData.newsDate}
            onChange={handleChange}
            className="w-full p-3 bg-[#1B2A47] text-white border border-gray-600 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  )
}