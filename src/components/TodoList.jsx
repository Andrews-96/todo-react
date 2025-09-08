import PropTypes from 'prop-types'
import TodoItem from './TodoItem.jsx'

export default function TodoList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">No hay tareas para mostrar.</p>
  }

  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          id={task.id}
          text={task.text}
          completed={task.completed}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
