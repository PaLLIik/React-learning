import '@testing-library/jest-dom'

// jsdom не реализует showModal/close у <dialog>, поэтому в тестах подменяем их простой версией
HTMLDialogElement.prototype.showModal = function () {
  this.open = true
}

HTMLDialogElement.prototype.close = function () {
  this.open = false
}
