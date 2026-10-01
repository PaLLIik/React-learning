import { useEffect, useRef, useState } from 'react'
import './game.css'

const IMAGES = ['🍎', '🍌', '🍇', '🍓']

function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
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
  const [moves, setMoves] = useState(0)
  const flipBackTimeout = useRef(null)

  const isWon = cards.every(card => card.isMatched)

  useEffect(() => {
    return () => clearTimeout(flipBackTimeout.current)
  }, [])

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
      setMoves(prev => prev + 1)
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
      flipBackTimeout.current = setTimeout(() => {
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

  function handleRestart() {
    clearTimeout(flipBackTimeout.current)
    setCards(createCards())
    setFlippedIds([])
    setIsLocked(false)
    setMoves(0)
  }

  return (
    <div className="memory-game">
      <div className="game-status">
        <span>Ходы: {moves}</span>
        <button type="button" className="restart-button" onClick={handleRestart}>
          Заново
        </button>
      </div>

      <p className="game-result" role="status">
        {isWon && `Победа! Ходов: ${moves}`}
      </p>

      <div className="game-board">
        {cards.map((card, index) => {
          const isOpen = card.isFlipped || card.isMatched
          return (
            <button
              key={card.id}
              type="button"
              className="card"
              onClick={() => handleCardClick(card)}
              aria-label={`Карточка ${index + 1}: ${isOpen ? card.image : 'закрыта'}`}
            >
              {isOpen ? card.image : '❓'}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MemoryGame
