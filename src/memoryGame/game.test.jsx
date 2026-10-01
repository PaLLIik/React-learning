import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import MemoryGame from './game'

function getCards() {
  return screen.getAllByRole('button', { name: /Карточка/ })
}

describe('MemoryGame', () => {
  // При таком значении перемешивание оставляет карточки на местах:
  // пары лежат в позициях 0 и 4, 1 и 5, 2 и 6, 3 и 7
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('показывает 8 закрытых карточек и 0 ходов', () => {
    render(<MemoryGame />)

    expect(getCards()).toHaveLength(8)
    expect(screen.getAllByRole('button', { name: /закрыта/ })).toHaveLength(8)
    expect(screen.getByText('Ходы: 0')).toBeInTheDocument()
  })

  it('считает ход после открытия двух карточек', async () => {
    const user = userEvent.setup()
    render(<MemoryGame />)

    await user.click(getCards()[0])
    expect(screen.getByText('Ходы: 0')).toBeInTheDocument()

    await user.click(getCards()[4])
    expect(screen.getByText('Ходы: 1')).toBeInTheDocument()
  })

  it('оставляет открытой совпавшую пару', async () => {
    const user = userEvent.setup()
    render(<MemoryGame />)

    await user.click(getCards()[0])
    await user.click(getCards()[4])

    expect(screen.getAllByRole('button', { name: /закрыта/ })).toHaveLength(6)
  })

  it('закрывает несовпавшую пару через секунду', async () => {
    const user = userEvent.setup()
    render(<MemoryGame />)

    await user.click(getCards()[0])
    await user.click(getCards()[1])
    expect(screen.getAllByRole('button', { name: /закрыта/ })).toHaveLength(6)

    await waitFor(
      () => expect(screen.getAllByRole('button', { name: /закрыта/ })).toHaveLength(8),
      { timeout: 2000 }
    )
  })

  it('сообщает о победе, когда найдены все пары', async () => {
    const user = userEvent.setup()
    render(<MemoryGame />)

    for (const index of [0, 1, 2, 3]) {
      await user.click(getCards()[index])
      await user.click(getCards()[index + 4])
    }

    expect(screen.getByRole('status')).toHaveTextContent('Победа! Ходов: 4')
  })

  it('начинает игру заново по кнопке', async () => {
    const user = userEvent.setup()
    render(<MemoryGame />)

    await user.click(getCards()[0])
    await user.click(getCards()[4])
    await user.click(screen.getByRole('button', { name: 'Заново' }))

    expect(screen.getByText('Ходы: 0')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /закрыта/ })).toHaveLength(8)
  })
})
