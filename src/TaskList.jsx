import TaskItem from './TaskItem'

function TaskList({ tasks, onDelete, onMoveUp, onDone, completed = false }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onDone={onDone}
          canMoveUp={index > 0}
          completed={completed}
        />
      ))}
    </ul>
  )
}

export default TaskList