// client/src/pages/UserList.jsx
import { useEffect, useState } from "react";
import "./UserList.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setUsers(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong while loading users.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="user-page">
      <h1 className="user-title">System Users</h1>
      <p className="user-subtitle">
        Live data loaded from the backend <code>/api/users</code> endpoint.
      </p>

      {loading && <div className="info-box">Loading users…</div>}

      {error && (
        <div className="info-box error">
          Failed to load users: {error}
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="info-box">No users returned from the API.</div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="user-table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const key =
                  user.id ||
                  user._id ||
                  user.email ||
                  `${user.name || "user"}-${index}`;

                return (
                  <tr key={key}>
                    <td>{user.name || "—"}</td>
                    <td>{user.email || "—"}</td>
                    <td>{user.role || "—"}</td>
                    <td>{user.status || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
