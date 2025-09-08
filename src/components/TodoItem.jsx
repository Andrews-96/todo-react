import PropTypes from 'prop-types'

export default function TodoItem({ id, text, completed, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          aria-label={`Marcar "${text}" como ${completed ? 'pendiente' : 'completada'}`}
        />
        <span className="task-text">{text}</span>
      </label>

      <button className="delete" onClick={() => onDelete(id)} aria-label={`Eliminar "${text}"`}>
        Eliminar
      </button>
    </li>
  )
}

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
