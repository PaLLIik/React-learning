import { useMemo, useState } from 'react';
import UserFilter from './components/UserFilter';
import UserSortControls from './components/UserSortControls';
import UserList from './components/UserList';
import UserCreateForm from './components/UserCreateForm';
import { compareValues } from './sorting';
import { initialUsers } from './users';
import { Link } from 'react-router-dom'

export default function PageUserList() {
  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortedBy, setSortedBy] = useState('');

  const professions = useMemo(
    () => [...new Set(users.map((u) => u.profession))].sort(),
    [users]
  );

  const visibleUsers = useMemo(() => {
    let result = filter ? users.filter((u) => u.profession === filter) : users;
    if (sortedBy) {
      result = [...result].sort((a, b) => compareValues(a[sortedBy], b[sortedBy]));
    }
    return result;
  }, [users, filter, sortedBy]);

  const handleCreate = (user) => {
    setUsers((prev) => [...prev, { id: Date.now(), ...user }]);
  };

  return (
    <div>
      <h1>Список пользователей</h1>
      <Link to="/">Назад на главную</Link>
      <UserFilter
        filter={filter}
        professions={professions}
        onChange={setFilter}
        onReset={() => setFilter('')}
      />
      <UserSortControls
        sortField={sortField}
        onChange={setSortField}
        onSort={() => setSortedBy(sortField)}
      />
      <UserList users={visibleUsers} />
      <UserCreateForm onCreate={handleCreate} />
    </div>
  );
}