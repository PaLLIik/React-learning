function TaskItem({ task, onDelete, onMoveUp, onDone, showMoveUp = true, completed = false }) {
  return (
    <li>
    <span className="text" style={completed ? { textDecoration: 'line-through' } : undefined}>
      {task.text}
    </span>

    <button className="delete-button" onClick={() => onDelete(task.id)} aria-label={`Удалить задачу: ${task.text}`}>
  delete
</button>

{!completed && showMoveUp && (
  <button className="up-button" onClick={() => onMoveUp(task.id)} aria-label={`Переместить задачу выше: ${task.text}`}>
    up
  </button>
)}

<button className="done-button" onClick={() => onDone(task.id)} aria-label={completed ? `Вернуть задачу: ${task.text}` : `Отметить выполненной: ${task.text}`}>
  {completed ? 'return' : 'done'}
</button>
  </li>
  )
}

export default TaskItem