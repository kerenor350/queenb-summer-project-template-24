// src/pages/CreateAlbumPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAlbumPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Failed to create album');
        return;
      }

      // מעבר אוטומטי לעמוד האלבום החדש
      navigate(`/albums/${data._id}`);
    } catch (err) {
      console.error(err);
      setError('Network error');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 560, margin: '24px auto' }}>
      <h2>Create a new album</h2>
      <form className="create" onSubmit={handleSubmit}>
        <label>Album name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">Create</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
