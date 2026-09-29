import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import SecondPage from './SecondPage'
import MemoryGame from './memoryGame/game'
import UserList from './UserList/PageUserList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/second" element={<SecondPage />} />
      <Route path="/memoryGame/game" element={<MemoryGame />} />
      <Route path="/UserList/PageUserList" element={<UserList />} />
    </Routes>
  )
}

export default App
