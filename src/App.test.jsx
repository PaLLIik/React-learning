import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import App from './App'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  )
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('показывает меню и список задач на главной', () => {
    renderAt('/')

    expect(screen.getByRole('navigation', { name: 'Основная навигация' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Список задач' })).toBeInTheDocument()
  })

  it('переходит на другую страницу по ссылке из меню', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.click(screen.getByRole('link', { name: 'Пользователи' }))

    expect(screen.getByRole('heading', { name: 'Список пользователей' })).toBeInTheDocument()
  })

  it('показывает страницу «не найдено» для неизвестного адреса', () => {
    renderAt('/net-takoy-stranicy')

    expect(screen.getByRole('heading', { name: 'Страница не найдена' })).toBeInTheDocument()
  })
})
