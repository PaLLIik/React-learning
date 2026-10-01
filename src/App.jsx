import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './HomePage'
import NotFoundPage from './NotFoundPage'
import SecondPage from './SecondPage'
import MemoryGame from './memoryGame/game'
import UserList from './UserList/PageUserList'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/memory" element={<MemoryGame />} />
        <Route path="/users" element={<UserList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
