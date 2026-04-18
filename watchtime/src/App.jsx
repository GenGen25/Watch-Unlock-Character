import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        const prog = (video.currentTime / video.duration) * 100;
        setProgress(prog);

        if (prog >= 90 && !isFinished) {
          setIsFinished(true);
          alert('🎉 You finished watching the video! Character unlocked!');
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [isFinished]);

  return (
    <div className="video-app">
      <header>
        <h1>Watch to Unlock Character</h1>
        <p>Watch the full video to unlock your character!</p>
      </header>
      <div className="video-container">
        <iframe
          ref={videoRef}
          src="https://youtu.be/blL0F5SS2yc?si=WsWNUizoMQ4aAMTN"
          title="Unlock Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video-player"
        ></iframe>
        {!isFinished && (
          <div className="progress-overlay">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p>{Math.round(progress)}% watched</p>
          </div>
        )}
      </div>
      {isFinished && (
        <div className="finished">
          <h2>✅ Complete!</h2>
          <p>Great job! Your character is unlocked.</p>
        </div>
      )}
    </div>
  );
}

export default App;

