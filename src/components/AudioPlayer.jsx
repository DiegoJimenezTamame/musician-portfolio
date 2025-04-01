import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import WaveSurfer from 'wavesurfer.js';
import '../styles/AudioPlayer.css';

function AudioPlayer({ title, audioSrc, imgSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const waveRef = useRef(null);
  const waveSurferRef = useRef(null);
  const isUnmounting = useRef(false);  // Track whether the component is unmounting

  // Create WaveSurfer only once and reset when audioSrc changes
  useEffect(() => {
    if (waveSurferRef.current) {
      waveSurferRef.current.stop();
      waveSurferRef.current.destroy();
      waveSurferRef.current = null;
    }

    if (audioSrc && waveRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveRef.current,
        waveColor: "rgba(0, 122, 255, 0.5)",
        progressColor: "rgba(0, 122, 255, 0.9)",
        barWidth: 2,
        barGap: 1,
        responsive: true,
        height: 50,
      });

      waveSurferRef.current.load(audioSrc);

      waveSurferRef.current.on("ready", () => {
        setDuration(waveSurferRef.current.getDuration());
      });

      waveSurferRef.current.on("audioprocess", () => {
        setCurrentTime(waveSurferRef.current.getCurrentTime());
        setProgress(
          (waveSurferRef.current.getCurrentTime() / waveSurferRef.current.getDuration()) * 100
        );
      });

      waveSurferRef.current.on("finish", () => setIsPlaying(false));
    }

    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.stop();
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      }
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    waveSurferRef.current.seekTo(newProgress / 100);
  };

  const toggleMute = () => {
    if (waveSurferRef.current) {
      setIsMuted(!isMuted);
      waveSurferRef.current.setMute(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    waveSurferRef.current.setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="audio-player">
      <div className="audio-player-header">
        <div className="audio-img-container">
          {imgSrc ? (
            <img src={imgSrc} alt={title} className="audio-thumbnail" />
          ) : (
            <div className="audio-thumbnail-placeholder">
              <span>♪</span>
            </div>
          )}
        </div>
        <div className="audio-info">
          <h5>{title}</h5>
        </div>
        <Button variant="link" className="play-btn" onClick={togglePlay}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </Button>
      </div>

      {/* Waveform Container */}
      <div className="waveform-container">
        <div ref={waveRef} className="waveform"></div>
      </div>

      {/* Progress Bar */}
      <div className="timeline-container">
        <span className="time current">{formatTime(currentTime)}</span>
        <input
          type="range"
          className="timeline"
          value={progress}
          step="0.01"
          onChange={handleProgressChange}
          min="0"
          max="100"
        />
        <span className="time duration">{formatTime(duration)}</span>
      </div>

      {/* Volume Controls */}
      <div className="volume-container">
        <Button variant="link" className="volume-btn" onClick={toggleMute}>
          <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
        </Button>
        <input
          type="range"
          className="volume"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

export default AudioPlayer;
