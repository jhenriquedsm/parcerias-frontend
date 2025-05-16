'use client'
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

  return (
    <div className="bg-white rounded-xl shadow p-4 relative">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold text-black">{parceria.title}</h2>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 text-sm"
          title="Excluir"
        >
          🗑 Excluir
        </button>
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