// src/pages/Home.js
import { useEffect, useState } from 'react';
import VideoDetails from '../components/VideoDetails';
import VideoForm from '../components/VideoForm';

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        if (!response.ok) throw new Error('Failed to fetch videos');
        const data = await response.json();

        // מיון לפי סדר רצוי: family -> friends -> other
        const order = { family: 1, friends: 2, other: 3 };
        const sorted = data.sort((a, b) => {
          const catA = order[a.category] || 4;
          const catB = order[b.category] || 4;
          return catA - catB;
        });

        setVideos(sorted);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();

    // ריענון אוטומטי כשנוסף/נמחק סרטון
    const handler = () => fetchVideos();
    window.addEventListener('videos:updated', handler);
    return () => window.removeEventListener('videos:updated', handler);
  }, []);

  return (
    <div className="home">
      <div className="videos">
        {videos.length === 0 ? (
          <p>אין סרטונים להצגה.</p>
        ) : (
          videos.map((video) => (
            <VideoDetails key={video._id} video={video} />
          ))
        )}
      </div>

      <VideoForm />
    </div>
  );
};

export default Home;
