import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';
        const response = await fetch(apiUrl);
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.activities || payload.results || [];
        setActivities(items);
      } catch (error) {
        console.error(error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      {loading ? <p>Loading activities...</p> : (
        <ul className="list-group">
          {activities.map((activity, index) => (
            <li key={activity.id || `${activity.type || 'activity'}-${index}`} className="list-group-item">
              {activity.type || activity.name || JSON.stringify(activity)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Activities;
