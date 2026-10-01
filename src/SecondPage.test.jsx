import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import SecondPage from './SecondPage'

describe('SecondPage', () => {
  it('не показывает модалку, пока её не открыли', () => {
    render(<SecondPage />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('открывает модалку по кнопке', async () => {
    const user = userEvent.setup()
    render(<SecondPage />)

    await user.click(screen.getByRole('button', { name: 'Открыть модалку' }))

    expect(screen.getByRole('dialog', { name: 'Это модальное окно' })).toBeInTheDocument()
  })

  it('закрывает модалку по кнопке «Закрыть»', async () => {
    const user = userEvent.setup()
    render(<SecondPage />)

    await user.click(screen.getByRole('button', { name: 'Открыть модалку' }))
    await user.click(screen.getByRole('button', { name: 'Закрыть' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('закрывает модалку по клику на затемнение', async () => {
    const user = userEvent.setup()
    render(<SecondPage />)

    await user.click(screen.getByRole('button', { name: 'Открыть модалку' }))
    await user.click(screen.getByRole('dialog'))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('не закрывает модалку по клику на её содержимое', async () => {
    const user = userEvent.setup()
    render(<SecondPage />)

    await user.click(screen.getByRole('button', { name: 'Открыть модалку' }))
    await user.click(screen.getByText('Какой-то контент'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
