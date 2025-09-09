import { useState } from 'react'
import PropTypes from 'prop-types'

export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)

  const save = () => {
    const val = draft.trim()
    if (!val || val === task.text) { setEditing(false); return }
    onEdit(task.id, val)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(task.text)
    setEditing(false)
  }

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Marcar "${task.text}" como completada`}
      />

      {!editing ? (
        <span className="todo-text">{task.text}</span>
      ) : (
        <input
          className="input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') cancel()
          }}
          autoFocus
          aria-label="Editar tarea"
        />
      )}

      {!editing ? (
        <>
          <button className="edit" onClick={() => setEditing(true)}>Editar</button>
          <button className="delete" onClick={() => onDelete(task.id)}>Eliminar</button>
        </>
      ) : (
        <>
          <button className="button" onClick={save} disabled={!draft.trim()}>Guardar</button>
          <button className="delete" onClick={cancel}>Cancelar</button>
        </>
      )}
    </div>
  )
}

TodoItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}
