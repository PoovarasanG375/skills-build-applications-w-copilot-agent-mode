import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';
        const response = await fetch(apiUrl);
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.leaderboard || payload.results || [];
        setEntries(items);
      } catch (error) {
        console.error(error);
        setEntries([]);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading ? <p>Loading leaderboard...</p> : (
        <ul className="list-group">
          {entries.map((entry, index) => (
            <li key={entry.id || `${entry.name || 'entry'}-${index}`} className="list-group-item">
              {entry.name || entry.username || JSON.stringify(entry)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Leaderboard;
