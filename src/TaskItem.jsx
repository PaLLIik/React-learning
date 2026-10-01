function TaskItem({ task, onDelete, onMoveUp, onDone, canMoveUp = true, completed = false }) {
  return (
    <li>
      <span className="text" style={completed ? { textDecoration: 'line-through' } : undefined}>
        {task.text}
      </span>

      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
        aria-label={`Удалить задачу: ${task.text}`}
        title="Удалить"
      >
        ✕
      </button>

      {!completed && (
        <button
          className="up-button"
          onClick={() => onMoveUp(task.id)}
          disabled={!canMoveUp}
          aria-label={`Переместить задачу выше: ${task.text}`}
          title="Вверх"
        >
          ↑
        </button>
      )}

      <button
        className="done-button"
        onClick={() => onDone(task.id)}
        aria-label={completed ? `Вернуть задачу: ${task.text}` : `Отметить выполненной: ${task.text}`}
        title={completed ? 'Вернуть' : 'Готово'}
      >
        {completed ? '↺' : '✓'}
      </button>
    </li>
  )
}

export default TaskItem
