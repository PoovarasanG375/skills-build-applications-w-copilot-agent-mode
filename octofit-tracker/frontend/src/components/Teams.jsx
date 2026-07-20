import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl('teams')}/api/teams/`);
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.teams || payload.results || [];
        setTeams(items);
      } catch (error) {
        console.error(error);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      {loading ? <p>Loading teams...</p> : (
        <ul className="list-group">
          {teams.map((team, index) => (
            <li key={team.id || `${team.name || 'team'}-${index}`} className="list-group-item">
              {team.name || JSON.stringify(team)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Teams;
