'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

type Parceria = {
  id?: number
  title: string
  url: string
  newsDate: string
}

type Props = {
  parceria: Parceria
  onDelete: (id: number) => void
}

export default function ParceriaCard({ parceria, onDelete }: Props) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!parceria.id) return alert('ID da parceria não encontrado.')
    const confirm = window.confirm('Tem certeza que deseja excluir essa parceria?')
    if (!confirm) return

    try {
      const res = await fetch(`http://localhost:8080/parcerias/${parceria.id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Erro ao excluir parceria')

      alert('Parceria excluída com sucesso!')
      onDelete(parceria.id)
    } catch (err) {
      console.error(err)
      alert('Erro ao excluir parceria')
    }
  }

  const handleEdit = () => {
    if (!parceria.id) return alert('ID da parceria não encontrado.')
    router.push(`/put-parceria/${parceria.id}`)
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 relative">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold text-black w-3/4">
          {parceria.title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded"
          >
            ✏️ Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
            title="Excluir"
          >
            🗑 Excluir
          </button>
        </div>
      </div>

      <p className="text-blue-600 underline mb-2">
        <a href={parceria.url} target="_blank" rel="noopener noreferrer">
          {parceria.url}
        </a>
      </p>
      <p className="text-xs text-gray-500">
        Data: {new Date(parceria.newsDate).toLocaleDateString()}
      </p>
    </div>
  )
}