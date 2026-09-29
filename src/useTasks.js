import { useState, useEffect } from 'react'

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

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
    const index = activeTasks.findIndex(task => task.id === id)
    if (index > 0) {
      const reordered = [...activeTasks]
      ;[reordered[index], reordered[index - 1]] = [reordered[index - 1], reordered[index]]
      setTasks([...reordered, ...doneTasks])
    }
  }

  return { activeTasks, doneTasks, addTask, deleteTask, doneTask, moveUpTask }
}