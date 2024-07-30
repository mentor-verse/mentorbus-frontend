// src/components/OpenGatherTown.tsx
import { useState } from 'react';
import { createGatherTownSpace } from './creategathertown';

const OpenGatherTown = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenGatherTown = async () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      alert('User name not found. Please complete the onboarding process.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const spaceId = await createGatherTownSpace();
      const gatherTownURL = `https://gather.town/app/${spaceId}?name=${encodeURIComponent(userName)}`;
      window.open(gatherTownURL, '_blank');
    } catch (err) {
      console.error('Error opening Gather Town:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleOpenGatherTown} disabled={loading}>
        {loading ? 'Loading...' : 'Open Gather Town'}
      </button>
    </div>
  );
};

export default OpenGatherTown;
