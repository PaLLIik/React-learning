import { useState, useEffect } from 'react'

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem('tasks'))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const activeTasks = tasks.filter(task => !task.completed)
  const doneTasks = tasks.filter(task => task.completed)

  function addTask(text) {
    if (text.trim() !== '') {
      setTasks(prev => [...prev, { id: crypto.randomUUID(), text, completed: false }])
    }
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  function doneTask(id) {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, completed: !task.completed } : task))
    )
  }

  function moveUpTask(id) {
    setTasks(prev => {
      const active = prev.filter(task => !task.completed)
      const done = prev.filter(task => task.completed)
      const index = active.findIndex(task => task.id === id)
      if (index <= 0) return prev

      ;[active[index], active[index - 1]] = [active[index - 1], active[index]]
      return [...active, ...done]
    })
  }

  return { activeTasks, doneTasks, addTask, deleteTask, doneTask, moveUpTask }
}