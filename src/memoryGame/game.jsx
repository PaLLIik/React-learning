import { useState } from 'react'
import { Link } from 'react-router-dom'


const IMAGES = ['🍎', '🍌', '🍇', '🍓']

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

function createCards() {
  const pairs = [...IMAGES, ...IMAGES]
  const shuffled = shuffle(pairs)
  return shuffled.map((image, index) => ({
    id: index,
    image,
    isFlipped: false,
    isMatched: false,
  }))
}

function MemoryGame() {
  const [cards, setCards] = useState(createCards)
  const [flippedIds, setFlippedIds] = useState([])
  const [isLocked, setIsLocked] = useState(false)

  function handleCardClick(clickedCard) {
    if (isLocked) return
    if (clickedCard.isFlipped || clickedCard.isMatched) return

    const newFlippedIds = [...flippedIds, clickedCard.id]

    setCards(prev =>
      prev.map(card =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    )
    setFlippedIds(newFlippedIds)

    if (newFlippedIds.length === 2) {
      setIsLocked(true)
      checkForMatch(newFlippedIds)
    }
  }

  function checkForMatch([firstId, secondId]) {
    const firstCard = cards.find(card => card.id === firstId)
    const secondCard = cards.find(card => card.id === secondId)

    if (firstCard.image === secondCard.image) {
      setCards(prev =>
        prev.map(card =>
          card.id === firstId || card.id === secondId
            ? { ...card, isMatched: true }
            : card
        )
      )
      setFlippedIds([])
      setIsLocked(false)
    } else {
      setTimeout(() => {
        setCards(prev =>
          prev.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          )
        )
        setFlippedIds([])
        setIsLocked(false)
      }, 1000)
    }
  }

  return (
    <div className="game-board">
      <Link to="/">Назад на главную</Link>
      {cards.map(card => (
        <div key={card.id} className="card" onClick={() => handleCardClick(card)}>
          {card.isFlipped || card.isMatched ? card.image : '❓'}
        </div>
      ))}
    </div>
  )
}

export default MemoryGame