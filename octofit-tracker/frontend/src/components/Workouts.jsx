import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl('workouts')}/api/workouts/`);
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.workouts || payload.results || [];
        setWorkouts(items);
      } catch (error) {
        console.error(error);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      {loading ? <p>Loading workouts...</p> : (
        <ul className="list-group">
          {workouts.map((workout, index) => (
            <li key={workout.id || `${workout.name || 'workout'}-${index}`} className="list-group-item">
              {workout.name || workout.title || JSON.stringify(workout)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Workouts;
