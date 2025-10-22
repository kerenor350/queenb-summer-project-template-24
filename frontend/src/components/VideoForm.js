// src/components/VideoForm.js
import { useState } from 'react';

const VideoForm = ({ albumId }) => {
  const [name, setName] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [category, setCategory] = useState('family'); // חדש
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!videoFile) return setError('בחרי קובץ וידאו להעלאה');
    if (!albumId)  return setError('חסר מזהה אלבום');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('video', videoFile);  // השם חייב להיות 'video'
    formData.append('album', albumId);    // חדש
    formData.append('category', category);// חדש

    try {
      const response = await fetch('/api/videos', { method: 'POST', body: formData });
      const json = await response.json();

      if (!response.ok) return setError(json?.error || 'Upload failed');

      setName('');
      setVideoFile(null);
      setError(null);
      window.dispatchEvent(new Event('videos:updated')); // ריענון רשימה
    } catch {
      setError('Network error');
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>הוספת סרטון לאלבום</h3>

      <label>שם הסרטון:</label>
      <input value={name} onChange={e=>setName(e.target.value)} required />

      <label>איזה אורח כבוד אתה? </label>
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        <option value="family"> family משפחה</option>
        <option value="friends"> friends חברים</option>
        <option value="other">אורח כבוד אחר </option>
      </select>

      <label>בחרי קובץ וידאו:</label>
      <input type="file" accept="video/*" onChange={e=>setVideoFile(e.target.files[0] || null)} required />

      <button type="submit">העלאת סרטון</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default VideoForm;
