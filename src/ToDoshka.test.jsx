import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import ToDoshka from './ToDoshka'

async function addTask(user, text) {
  await user.type(screen.getByLabelText('Новая задача'), text)
  await user.click(screen.getByRole('button', { name: 'Добавить' }))
}

function getTaskTexts() {
  return screen.getAllByRole('listitem').map(item => item.querySelector('.text').textContent)
}

describe('ToDoshka', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('добавляет новую задачу в список', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await addTask(user, 'Купить хлеб')

    expect(screen.getByText('Купить хлеб')).toBeInTheDocument()
  })

  it('добавляет задачу по нажатию Enter', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await user.type(screen.getByLabelText('Новая задача'), 'Купить молоко{Enter}')

    expect(screen.getByText('Купить молоко')).toBeInTheDocument()
    expect(screen.getByLabelText('Новая задача')).toHaveValue('')
  })

  it('удаляет задачу из списка', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await addTask(user, 'Временная задача')

    expect(screen.getByText('Временная задача')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Удалить задачу/i }))

    expect(screen.queryByText('Временная задача')).not.toBeInTheDocument()
  })

  it('перемещает задачу в «Выполненные» при нажатии «Готово»', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await addTask(user, 'Выучить роутинг')
    await user.click(screen.getByRole('button', { name: /Отметить выполненной/i }))

    expect(screen.getByText('Выполненные')).toBeInTheDocument()
    expect(screen.getByText('Выучить роутинг')).toBeInTheDocument()
  })

  it('возвращает задачу обратно в активные при нажатии «Вернуть»', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await addTask(user, 'Сделать тудушку')
    await user.click(screen.getByRole('button', { name: /Отметить выполненной/i }))
    await user.click(screen.getByRole('button', { name: /Вернуть задачу/i }))

    expect(screen.queryByText('Выполненные')).not.toBeInTheDocument()
  })

  it('не добавляет пустую задачу', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await user.click(screen.getByRole('button', { name: 'Добавить' }))

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('поднимает задачу на одну позицию выше', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await addTask(user, 'Первая')
    await addTask(user, 'Вторая')
    await addTask(user, 'Третья')
    await user.click(screen.getByRole('button', { name: 'Переместить задачу выше: Третья' }))

    expect(getTaskTexts()).toEqual(['Первая', 'Третья', 'Вторая'])
  })

  it('делает кнопку «Вверх» неактивной у верхней задачи', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await addTask(user, 'Первая')
    await addTask(user, 'Вторая')

    expect(screen.getByRole('button', { name: 'Переместить задачу выше: Первая' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Переместить задачу выше: Вторая' })).toBeEnabled()
  })

  it('сохраняет задачи в localStorage и восстанавливает их', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<ToDoshka />)

    await addTask(user, 'Не потеряться')

    expect(JSON.parse(localStorage.getItem('tasks'))).toMatchObject([
      { text: 'Не потеряться', completed: false },
    ])

    unmount()
    render(<ToDoshka />)

    expect(screen.getByText('Не потеряться')).toBeInTheDocument()
  })

  it('стартует с пустым списком, если в localStorage повреждённые данные', () => {
    localStorage.setItem('tasks', '{не json')
    render(<ToDoshka />)

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })
})
