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
        const res = await fetch(`http://localhost:8080/parcerias/${id}`)
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
      const res = await fetch(`http://localhost:8080/parcerias/${id}`, {
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

  if (!parceria) return <p className="p-4 text-black">Carregando parceria...</p>

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">Editar Parceria</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black">URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Data da Notícia</label>
          <input
            type="date"
            name="newsDate"
            value={formData.newsDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-black"
            required
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}