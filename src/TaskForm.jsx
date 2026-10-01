import { useState } from 'react'

const MAX_LENGTH = 100

function TaskForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (trimmed === '') return
    onAdd(trimmed)
    setInputValue('')
  }

  return (
    <form className="to-do-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="new-task-input" className="visually-hidden">
          Новая задача
        </label>
        <input
          id="new-task-input"
          type="text"
          placeholder="Новая задача..."
          value={inputValue}
          maxLength={MAX_LENGTH}
          onChange={e => setInputValue(e.target.value)}
        />
        <span className="char-count">{inputValue.length}/{MAX_LENGTH}</span>
      </div>
      <button type="submit" className="add-button">
        Добавить
      </button>
    </form>
  )
}

export default TaskForm
