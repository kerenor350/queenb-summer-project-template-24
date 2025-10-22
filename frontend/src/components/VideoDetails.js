// VideoDetails.js
const VideoDetails = ({ video }) => {
  if (!video) return null;

  const handleDelete = async () => {
    const ok = window.confirm('למחוק את הסרטון?');
    if (!ok) return;

    try {
      const res = await fetch(`/api/videos/${video._id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || 'שגיאה במחיקה');
        return;
      }

      // עדכון הרשימה אחרי מחיקה (אותו אירוע כמו בהעלאה)
      window.dispatchEvent(new Event('videos:updated'));
    } catch (err) {
      console.error(err);
      alert('שגיאת רשת');
    }
  };

  // אם זה קישור ליוטיוב/ווימאו – iframe, אחרת <video>
  const isYouTube = /youtube\.com|youtu\.be/.test(video.videoUrl || '');
  const isVimeo   = /vimeo\.com/.test(video.videoUrl || '');

  let videoElement = null;

  if (isYouTube) {
    const id = (video.videoUrl.match(/(?:v=|be\/)([^&?/]+)/) || [])[1];
    const embed = id ? `https://www.youtube.com/embed/${id}` : video.videoUrl;
    videoElement = (
      <iframe
        src={embed}
        title={video.name}
        width="480"
        height="270"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: 0, borderRadius: 12 }}
      />
    );
  } else if (isVimeo) {
    videoElement = (
      <iframe
        src={video.videoUrl.replace('vimeo.com', 'player.vimeo.com/video')}
        title={video.name}
        width="480"
        height="270"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={{ border: 0, borderRadius: 12 }}
      />
    );
  } else {
    // ברירת מחדל – קובץ שהועלה לענן
    videoElement = (
      <video
        src={video.videoUrl}
        controls
        width="480"
        style={{ borderRadius: 12 }}
      />
    );
  }

  return (
    <div className="video-card" style={{ maxWidth: 520 }}>
      <h3>{video.name}</h3>
      {videoElement}

      <button
        onClick={handleDelete}
        style={{
          marginTop: 10,
          padding: '8px 12px',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        מחק/י סרטון
      </button>
    </div>
  );
};

export default VideoDetails;
