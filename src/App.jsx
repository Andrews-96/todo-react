import { useState, useMemo, useEffect } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import './index.css'

const makeId = () => (crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`)

const FILTERS = {
  TODAS: 'todas',
  PENDIENTES: 'pendientes',
  COMPLETADAS: 'completadas'
}

export default function App() {
  // Estados con persistencia
  const [tasks, setTasks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tasks')) ?? [] }
    catch { return [] }
  })
  const [filter, setFilter] = useState(() => localStorage.getItem('filter') ?? FILTERS.TODAS)

  // Persistir tareas y filtro
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('filter', filter)
  }, [filter])

  // Handlers
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

  const updateTask = (id, newText) => {
    const text = newText.trim()
    if (!text) return
    setTasks(prev => prev.map(t => t.id === id ? { ...t, text } : t))
  }

  const clearCompleted = () => {
    if (!tasks.some(t => t.completed)) return
    const ok = window.confirm('¿Eliminar todas las tareas completadas?')
    if (!ok) return
    setTasks(prev => prev.filter(t => !t.completed))
  }

  // Derivados
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case FILTERS.PENDIENTES:   return tasks.filter(t => !t.completed)
      case FILTERS.COMPLETADAS:  return tasks.filter(t => t.completed)
      default:                   return tasks
    }
  }, [tasks, filter])

  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const pending = total - completed

  // UI
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

          <button
            className="delete"
            onClick={clearCompleted}
            disabled={completed === 0}
          >
            Eliminar completadas
          </button>
        </div>

        <TodoList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={updateTask}
        />
      </section>

      <footer className="footer">
        <small>Hecha con React y Vite. Responsive y accesible.</small>
      </footer>
    </div>
  )
}
