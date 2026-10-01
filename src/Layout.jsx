import { NavLink, Outlet } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/second', label: 'Вторая страница' },
  { to: '/memory', label: 'Игра на память' },
  { to: '/users', label: 'Пользователи' },
]

function Layout() {
  return (
    <>
      <nav className="main-nav" aria-label="Основная навигация">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} end>
            {label}
          </NavLink>
        ))}
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
