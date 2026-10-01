export default function UserFilter({ filter, professions, onChange, onReset }) {
  return (
    <div className="user-controls">
      <label htmlFor="profession-filter">Профессия: </label>
      <select
        id="profession-filter"
        value={filter}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Все профессии</option>
        {professions.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <button type="button" onClick={onReset}>Сбросить фильтр</button>
    </div>
  )
}