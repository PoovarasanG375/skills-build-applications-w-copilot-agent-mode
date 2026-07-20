import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl('activities')}/api/activities/`);
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
