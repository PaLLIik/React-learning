export const SORT_OPTIONS = [
  { value: 'name', label: 'Имя' },
  { value: 'profession', label: 'Профессия' },
]

export function compareValues(a, b) {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), 'en')
}