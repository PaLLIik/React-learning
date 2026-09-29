import { useState } from 'react'
import { Link } from 'react-router-dom'
import './modal.css'

function SecondPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <h1>Вторая страница</h1>
      <Link to="/">Назад на главную</Link>

      <button onClick={() => setIsModalOpen(true)}>Открыть модалку</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Это модальное окно</h2>
            <p>Какой-то контент</p>
            <button onClick={() => setIsModalOpen(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SecondPage