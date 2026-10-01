import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div>
      <h1>Страница не найдена</h1>
      <Link to="/">На главную</Link>
    </div>
  )
}

export default NotFoundPage
