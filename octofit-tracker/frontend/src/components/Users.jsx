import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
          : 'http://localhost:8000/api/users/';
        const response = await fetch(apiUrl);
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.users || payload.results || [];
        setUsers(items);
      } catch (error) {
        console.error(error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {loading ? <p>Loading users...</p> : (
        <ul className="list-group">
          {users.map((user, index) => (
            <li key={user.id || `${user.name || 'user'}-${index}`} className="list-group-item">
              {user.name || user.username || JSON.stringify(user)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;
