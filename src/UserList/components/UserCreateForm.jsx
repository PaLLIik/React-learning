import { useState } from 'react'
import { validateField } from '../validation'

const EMPTY = { name: '', profession: '' }

export default function UserCreateForm({ onCreate }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState(EMPTY)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {
      name: validateField('name', form.name),
      profession: validateField('profession', form.profession),
    }
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.profession) return

    onCreate({ name: form.name.trim(), profession: form.profession.trim() })
    setForm(EMPTY)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Новый пользователь</h2>

      <div className="form-field">
        <label htmlFor="name">Имя: </label>
        <input id="name" name="name" value={form.name}
          onChange={handleChange} onBlur={handleBlur} />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>

      <div className="form-field">
        <label htmlFor="profession">Профессия: </label>
        <input id="profession" name="profession" value={form.profession}
          onChange={handleChange} onBlur={handleBlur} />
        {errors.profession && <div className="field-error">{errors.profession}</div>}
      </div>

      <button type="submit">Создать</button>
    </form>
  )
}