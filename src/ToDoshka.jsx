import { useTasks } from './useTasks'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

function ToDoshka() {
  const { activeTasks, doneTasks, addTask, deleteTask, doneTask, moveUpTask } = useTasks()

  return (
    <div className="to-do-list">
      <h1>Список задач</h1>

      <TaskForm onAdd={addTask} />

      <TaskList tasks={activeTasks} onDelete={deleteTask} onMoveUp={moveUpTask} onDone={doneTask} />

      {doneTasks.length > 0 && (
        <>
          <h2>Выполненные</h2>
          <TaskList tasks={doneTasks} onDelete={deleteTask} onDone={doneTask} completed />
        </>
      )}
    </div>
  )
}

export default ToDoshka
