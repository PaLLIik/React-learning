import { describe, it, expect } from 'vitest'
import { validateField } from './validation'

describe('validateField', () => {
  it('принимает корректное значение', () => {
    expect(validateField('name', 'Katherine Johnson')).toBe('')
    expect(validateField('profession', 'Mathematician')).toBe('')
  })

  it('принимает дефис и апостроф', () => {
    expect(validateField('name', "Anne-Marie O'Neil")).toBe('')
  })

  it('не принимает пустое значение и значение из пробелов', () => {
    expect(validateField('name', '')).toBe('Имя не может быть пустым')
    expect(validateField('profession', '   ')).toBe('Профессия не может быть пустым')
  })

  it('не принимает цифры и запрещённые символы', () => {
    expect(validateField('name', 'John2')).toMatch(/запрещены цифры и символы/)
    expect(validateField('name', 'John!')).toMatch(/запрещены цифры и символы/)
  })

  it('не принимает кириллицу', () => {
    expect(validateField('name', 'Иван')).toBe('Имя: разрешена только латиница')
  })

  it('проверяет длину по правилам поля', () => {
    expect(validateField('name', 'A')).toBe('Имя: длина — от 2 до 40 символов')
    expect(validateField('name', 'Al')).toBe('')
    expect(validateField('name', 'a'.repeat(41))).toBe('Имя: длина — от 2 до 40 символов')
    expect(validateField('profession', 'Chef')).toBe('Профессия: длина — от 5 до 100 символов')
  })

  it('считает длину без пробелов по краям', () => {
    expect(validateField('name', '  A  ')).toBe('Имя: длина — от 2 до 40 символов')
  })
})
