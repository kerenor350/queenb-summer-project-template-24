// src/pages/AlbumPage.js
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import VideoDetails from '../components/VideoDetails';
import VideoForm from '../components/VideoForm';

export default function AlbumPage() {
  const { id } = useParams(); // album id
  const [album, setAlbum] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const [aRes, vRes] = await Promise.all([
        fetch(`/api/albums/${id}`),
        fetch(`/api/videos?album=${id}`),
      ]);
      const [a, vs] = await Promise.all([aRes.json(), vRes.json()]);
      setAlbum(a);
      setVideos(Array.isArray(vs) ? vs : []);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAll();
    const handler = () => fetchAll();
    window.addEventListener('videos:updated', handler);
    return () => window.removeEventListener('videos:updated', handler);
  }, [fetchAll]);

  const by = (cat) => videos.filter(v => v.category === cat);

  if (loading) return <p>טוען…</p>;
  if (!album || album.error) return <p>אלבום לא נמצא</p>;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <h2>{album.name}</h2>

      {/* טופס העלאה שמוסיף סרטון לאלבום הזה */}
      <VideoForm albumId={id} />

      <hr style={{ margin: '16px 0' }} />

      <h3>משפחה</h3>
      <div className="videos" style={{ display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))' }}>
        {by('family').map(v => <VideoDetails key={v._id} video={v} />)}
      </div>

      <h3 style={{ marginTop: 24 }}>חברים</h3>
      <div className="videos" style={{ display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))' }}>
        {by('friends').map(v => <VideoDetails key={v._id} video={v} />)}
      </div>

      <h3 style={{ marginTop: 24 }}>אחר</h3>
      <div className="videos" style={{ display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))' }}>
        {by('other').map(v => <VideoDetails key={v._id} video={v} />)}
      </div>
    </div>
  );
}
