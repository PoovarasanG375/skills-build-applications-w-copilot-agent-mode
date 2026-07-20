import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl('leaderboard')}/api/leaderboard/`);
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
