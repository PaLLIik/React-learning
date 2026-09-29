export default function UserList({ users }) {
  if (users.length === 0) return <p>Пользователи не найдены</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          <strong>{u.name}</strong> — {u.profession}
        </li>
      ))}
    </ul>
  );
}