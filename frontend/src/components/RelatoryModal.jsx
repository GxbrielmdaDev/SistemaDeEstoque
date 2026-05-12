import { useState } from 'react'
import './RelatoryModal.css'

export default function RelatoryModal({ isOpen, onClose, onSelectSection }) {
  const [isLoading, setIsLoading] = useState(false)

  const sections = [
    { name: 'Produtos', value: 'produtos' },
    { name: 'Clientes', value: 'clientes' },
    { name: 'Vendas', value: 'vendas' },
  ]

  const handleDownload = async (section) => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/relatorios/gerar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secao: section }),
      })

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `relatorio_${section}_${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      onClose()
    } catch (error) {
      console.error('Erro ao gerar relatório:', error)
      alert('Erro ao gerar relatório')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>De qual Seção você deseja imprimir os relatórios?</h2>
        <br />
        <h2>Clique em uma das opções para fazer o download do relatório:</h2>
        <div className="modal-buttons">
          {sections.map((section) => (
            <button
              key={section.value}
              className="section-button"
              onClick={() => handleDownload(section.value)}
              disabled={isLoading}
            >
              {section.name}
            </button>
          ))}
        </div>
        <button className="close-button" onClick={onClose} disabled={isLoading}>
          Cancelar
        </button>
      </div>
    </div>
  )
}
