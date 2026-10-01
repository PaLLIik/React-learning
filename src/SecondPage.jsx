import { useRef } from 'react'
import './modal.css'

function SecondPage() {
  const dialogRef = useRef(null)

  function closeModal() {
    dialogRef.current.close()
  }

  // Клик по затемнению попадает в сам <dialog>, клик по содержимому — в .modal-content
  function handleDialogClick(e) {
    if (e.target === dialogRef.current) closeModal()
  }

  return (
    <div className="second-page">
      <p>Пример модального окна</p>
      <button className="open-modal-button" onClick={() => dialogRef.current.showModal()}>
        Открыть модалку
      </button>

      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="modal-title"
        onClick={handleDialogClick}
      >
        <div className="modal-content">
          <h2 id="modal-title">Это модальное окно</h2>
          <p>Какой-то контент</p>
          <button onClick={closeModal}>Закрыть</button>
        </div>
      </dialog>
    </div>
  )
}

export default SecondPage
