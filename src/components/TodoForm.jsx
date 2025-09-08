import { useState } from 'react'
import PropTypes from 'prop-types'

export default function TodoForm({ onAdd }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('') // limpiar input
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Escribe una tarea y presiona Enter…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Nueva tarea"
      />
      <button className="button" type="submit" disabled={!value.trim()}>
        Agregar
      </button>
    </form>
  )
}

TodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired
}
