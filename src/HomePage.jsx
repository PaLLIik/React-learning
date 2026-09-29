import { Link } from 'react-router-dom'
import ToDoshka from './ToDoshka'

function HomePage() {
  return (
    <div>
      <h1>Главная</h1>
      <Link to="/second">Перейти на вторую страницу</Link>
      <Link to="/memoryGame/game">Перейти к memory game</Link>
      <Link to="/UserList/PageUserList">Перейти к списку пользователей</Link>
      <ToDoshka/>
    </div>
  )
}

export default HomePage