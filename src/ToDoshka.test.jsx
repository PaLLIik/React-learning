import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import ToDoshka from './ToDoshka'

describe('ToDoshka', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('добавляет новую задачу в список', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    const input = screen.getByLabelText('Новая задача')
    const addButton = screen.getByRole('button', { name: 'Add' })

    await user.type(input, 'Купить хлеб')
    await user.click(addButton)

    expect(screen.getByText('Купить хлеб')).toBeInTheDocument()
  })

  it('удаляет задачу из списка', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await user.type(screen.getByLabelText('Новая задача'), 'Временная задача')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('Временная задача')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Удалить задачу/i }))

    expect(screen.queryByText('Временная задача')).not.toBeInTheDocument()
  })

  it('перемещает задачу в Completed при нажатии done', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await user.type(screen.getByLabelText('Новая задача'), 'Выучить роутинг')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.click(screen.getByRole('button', { name: /Отметить выполненной/i }))

    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('Выучить роутинг')).toBeInTheDocument()
  })

  it('возвращает задачу обратно в активные при нажатии return', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await user.type(screen.getByLabelText('Новая задача'), 'Сделать тудушку')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.click(screen.getByRole('button', { name: /Отметить выполненной/i }))
    await user.click(screen.getByRole('button', { name: /Вернуть задачу/i }))

    expect(screen.queryByText('Completed')).not.toBeInTheDocument()
  })

  it('не добавляет пустую задачу', async () => {
    const user = userEvent.setup()
    render(<ToDoshka />)

    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })
})