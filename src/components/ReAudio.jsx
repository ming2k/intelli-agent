import { useRef, useState, useEffect } from "react";
import "./ReAudio.css";

const ReAudio = ({audioUrl}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
    }
    setIsPlaying(!audioRef.current.paused);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      audioRef.current.play();
      setIsPaused(false);
    } else {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="re-audio-container">
      <div className="controls">
        {!isPlaying ? (
          <button onClick={togglePlay}>Play</button>
        ) : isPlaying && !isPaused ? (
          <>
            <button onClick={togglePause}>Pause</button>
            <button onClick={togglePlay}>Stop</button>
          </>
        ) : (
          <>
            <button onClick={togglePause}>Resume</button>
            <button onClick={togglePlay}>Stop</button>
          </>
        )}
      </div>
      <div className="visualization">
        <div
          className={`pulse-wave-container ${
            isPlaying && !audioRef.current.paused ? "active" : "inactive"
          }`}
        >
          {[...Array(24)].map((_, index) => (
            <div key={index} className="pulse-wave"></div>
          ))}
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={audioUrl}
      />
    </div>
  );
};

export default ReAudio;
