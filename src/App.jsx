import { useState, useMemo } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import PropTypes from 'prop-types'
import './index.css'

const makeId = () => (crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`)

const FILTERS = {
  TODAS: 'todas',
  PENDIENTES: 'pendientes',
  COMPLETADAS: 'completadas'
}

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState(FILTERS.TODAS)

  const addTask = (text) => {
    const taskText = text.trim()
    if (!taskText) return
    setTasks(prev => [{ id: makeId(), text: taskText, completed: false }, ...prev])
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id) => {
    const ok = window.confirm('¿Seguro que quieres eliminar esta tarea?')
    if (!ok) return
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case FILTERS.PENDIENTES: return tasks.filter(t => !t.completed)
      case FILTERS.COMPLETADAS: return tasks.filter(t => t.completed)
      default: return tasks
    }
  }, [tasks, filter])

  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const pending = total - completed

  return (
    <div className="app-container">
      <header className="header">
        <h1>Todo List</h1>
        <p className="subtitle">React • Hooks • Props • PropTypes • Programación funcional</p>
      </header>

      <section className="card">
        <TodoForm onAdd={addTask} />

        <div className="toolbar">
          <div className="filters">
            <button
              className={filter === FILTERS.TODAS ? 'active' : ''}
              onClick={() => setFilter(FILTERS.TODAS)}
              aria-pressed={filter === FILTERS.TODAS}
            >
              Todas
            </button>
            <button
              className={filter === FILTERS.PENDIENTES ? 'active' : ''}
              onClick={() => setFilter(FILTERS.PENDIENTES)}
              aria-pressed={filter === FILTERS.PENDIENTES}
            >
              Pendientes
            </button>
            <button
              className={filter === FILTERS.COMPLETADAS ? 'active' : ''}
              onClick={() => setFilter(FILTERS.COMPLETADAS)}
              aria-pressed={filter === FILTERS.COMPLETADAS}
            >
              Completadas
            </button>
          </div>

          <div className="stats" role="status" aria-live="polite">
            <span>Total: <strong>{total}</strong></span>
            <span>Pendientes: <strong>{pending}</strong></span>
            <span>Completadas: <strong>{completed}</strong></span>
          </div>
        </div>

        <TodoList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </section>

      <footer className="footer">
        <small>Hecha con React y Vite. Responsive y accesible.</small>
      </footer>
    </div>
  )
}

App.propTypes = {}
