import { useEffect, useState, useRef } from 'react'
import './CategoryAutocomplete.css'

export default function CategoryAutocomplete({ value, onChange, categories = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredCategories, setFilteredCategories] = useState([])
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Filtrar categorias baseado no valor digitado
    if (value.trim() === '') {
      setFilteredCategories(categories)
    } else {
      const filtered = categories.filter((cat) =>
        cat.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredCategories(filtered)
    }
  }, [value, categories])

  useEffect(() => {
    // Fechar dropdown ao clicar fora
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectCategory = (category) => {
    onChange(category)
    setIsOpen(false)
  }

  const handleAddNewCategory = () => {
    if (value.trim()) {
      onChange(value.trim())
      setIsOpen(false)
    }
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleInputChange = (e) => {
    onChange(e.target.value)
  }

  const showNewCategoryOption = value.trim() && !categories.includes(value.trim())

  return (
    <div className="category-autocomplete-container" ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="Selecione ou digite uma categoria"
        className="category-input"
        required
      />

      {isOpen && (categories.length > 0 || showNewCategoryOption) && (
        <div className="category-dropdown">
          {filteredCategories.length > 0 && (
            <>
              {filteredCategories.map((category) => (
                <div
                  key={category}
                  className="category-option"
                  onClick={() => handleSelectCategory(category)}
                >
                  <span className="category-option-text">{category}</span>
                </div>
              ))}
            </>
          )}

          {showNewCategoryOption && (
            <>
              {filteredCategories.length > 0 && <div className="category-divider" />}
              <div
                className="category-option category-option-new"
                onClick={handleAddNewCategory}
              >
                <span className="category-option-icon">+</span>
                <span className="category-option-text">
                  Adicionar nova categoria: <strong>{value.trim()}</strong>
                </span>
              </div>
            </>
          )}

          {filteredCategories.length === 0 && !showNewCategoryOption && (
            <div className="category-no-results">Nenhuma categoria encontrada</div>
          )}
        </div>
      )}

      {isOpen && categories.length === 0 && !showNewCategoryOption && (
        <div className="category-dropdown">
          <div className="category-no-results">
            Digite uma categoria para adicionar a primeira
          </div>
        </div>
      )}
    </div>
  )
}
