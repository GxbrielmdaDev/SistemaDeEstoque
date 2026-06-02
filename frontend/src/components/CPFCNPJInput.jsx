import { useState, useEffect } from 'react'
import './CPFCNPJInput.css'

export default function CPFCNPJInput({ value, onChange, required = false, disabled = false }) {
  const [documentType, setDocumentType] = useState('cpf')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Detectar tipo baseado no valor já existente
    if (value) {
      const cleanValue = value.replace(/\D/g, '')
      if (cleanValue.length === 11) {
        setDocumentType('cpf')
      } else if (cleanValue.length === 14) {
        setDocumentType('cnpj')
      }
    }
  }, [])

  // Formata CPF: XXX.XXX.XXX-XX
  const formatCPF = (value) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{2})$/, '$1-$2')
    }
    return cleaned.substring(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{2})$/, '$1-$2')
  }

  // Formata CNPJ: NN.NNN.NNN/NNNN-NN
  const formatCNPJ = (value) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 14) {
      return cleaned
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{2})$/, '$1-$2')
    }
    return cleaned.substring(0, 14).replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{2})$/, '$1-$2')
  }

  const handleDocumentTypeChange = (type) => {
    setDocumentType(type)
    setIsModalOpen(false)
    // Limpar o campo ao trocar o tipo
    onChange('')
  }

  const handleInputChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, '')

    if (documentType === 'cpf') {
      if (inputValue.length <= 11) {
        onChange(formatCPF(inputValue))
      }
    } else if (documentType === 'cnpj') {
      if (inputValue.length <= 14) {
        onChange(formatCNPJ(inputValue))
      }
    }
  }

  const getPlaceholder = () => {
    return documentType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'
  }

  const getMaxLength = () => {
    return documentType === 'cpf' ? 14 : 18
  }

  return (
    <div className="cpf-cnpj-container">
      <div className="input-wrapper">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={getPlaceholder()}
          maxLength={getMaxLength()}
          disabled={disabled}
          required={required}
        />
        <button
          type="button"
          className="document-type-button"
          onClick={() => setIsModalOpen(true)}
          title={`Clique para alterar de ${documentType === 'cpf' ? 'CPF' : 'CNPJ'}`}
        >
          {documentType === 'cpf' ? 'CPF' : 'CNPJ'}
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Selecione o tipo de documento</h3>
            <div className="modal-buttons">
              <button
                type="button"
                className={`modal-button ${documentType === 'cpf' ? 'active' : ''}`}
                onClick={() => handleDocumentTypeChange('cpf')}
              >
                CPF
              </button>
              <button
                type="button"
                className={`modal-button ${documentType === 'cnpj' ? 'active' : ''}`}
                onClick={() => handleDocumentTypeChange('cnpj')}
              >
                CNPJ
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '12px', textAlign: 'center' }}>
              O campo será limpo ao alterar o tipo de documento.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
