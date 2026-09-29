import { useState } from 'react'

const MAX_LENGTH = 100

function TaskForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('')

  function handleAddTask() {
    const trimmed = inputValue.trim()
    if (trimmed === '') return
    onAdd(trimmed)
    setInputValue('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  return (
    <div className="to-do-form">
    <div className="input-wrapper">
    <label htmlFor="new-task-input" className="visually-hidden">
    Новая задача
  </label>
      <input
      id="new-task-input"
        type="text"
        placeholder="New task..."
        value={inputValue}
        maxLength={MAX_LENGTH}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <span className="char-count">{inputValue.length}/{MAX_LENGTH}</span>
    </div>
      <button className="add-button" onClick={handleAddTask}>
        Add
      </button>
    </div>
  )
}

export default TaskForm