import { describe, it, expect } from 'vitest'
import { compareValues } from './sorting'

describe('compareValues', () => {
  it('сравнивает числа как числа', () => {
    expect([10, 9, 2].sort(compareValues)).toEqual([2, 9, 10])
  })

  it('сравнивает строки по алфавиту без учёта регистра', () => {
    expect(['chemist', 'Astronaut', 'Baker'].sort(compareValues)).toEqual([
      'Astronaut',
      'Baker',
      'chemist',
    ])
  })

  it('возвращает 0 для одинаковых значений', () => {
    expect(compareValues('Chemist', 'Chemist')).toBe(0)
    expect(compareValues(5, 5)).toBe(0)
  })
})
