import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        const response = await fetch(apiUrl);
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
