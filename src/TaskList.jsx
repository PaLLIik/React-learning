import TaskItem from './TaskItem'

function TaskList({ tasks, onDelete, onMoveUp, onDone, completed = false }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onDone={onDone}
          completed={completed}
        />
      ))}
    </ul>
  )
}

export default TaskList