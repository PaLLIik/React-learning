export default function UserList({ users }) {
  if (users.length === 0) return <p className="user-list-empty">Пользователи не найдены</p>

  return (
    <ul className="user-list">
      {users.map((u) => (
        <li key={u.id}>
          <strong>{u.name}</strong> — {u.profession}
        </li>
      ))}
    </ul>
  )
}