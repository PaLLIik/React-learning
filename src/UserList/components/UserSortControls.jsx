import { SORT_OPTIONS } from '../sorting'

export default function UserSortControls({ sortField, onChange, onSort }) {
  return (
    <div className="user-controls">
      <label htmlFor="sort-field">Сортировать по: </label>
      <select
        id="sort-field"
        value={sortField}
        onChange={(e) => onChange(e.target.value)}
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <button type="button" onClick={onSort}>Сортировать</button>
    </div>
  )
}