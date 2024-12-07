"use client"; // Marks this component as a client-side component

import React, { useEffect, useRef, useState } from "react";

// Vimeo player API
import Player from "@vimeo/player"; // Make sure to install the vimeo-player package via npm or yarn

const VideoComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1); // Default volume to 100%
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // Default playback speed to 1x
  const videoRef = useRef(null); // Ref to hold the Vimeo player instance

  useEffect(() => {
    if (videoRef.current) {
      const player = new Player(videoRef.current, {
        id: 1036990750, // Your Vimeo video ID
        width: "100%",
        autoplay: false,
        loop: true,
        muted: true,
        controls: false, // Disabling Vimeo default controls
      });

      // Handle play/pause toggle
      player.on("play", () => {
        setIsPlaying(true);
      });

      player.on("pause", () => {
        setIsPlaying(false);
      });

      // Handle mute/unmute toggle
      player.on("volumechange", () => {
        player.getVolume().then((volume) => {
          if (volume === 0) {
            setIsMuted(true);
          } else {
            setIsMuted(false);
          }
        });
      });

      // Attach player instance to the ref
      videoRef.current = player;
    }
  }, []);

  // Play/Pause Handler
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  };

  // Mute/Unmute Handler
  const toggleMute = () => {
    if (isMuted) {
      videoRef.current?.setVolume(volume); // Unmute
    } else {
      videoRef.current?.setVolume(0); // Mute
    }
  };

  // Volume Control Handler
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (!isMuted) {
      videoRef.current?.setVolume(newVolume); // Update volume
    }
  };

  // Playback Speed Handler
  const handleSpeedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpeed = parseFloat(event.target.value);
    setPlaybackSpeed(newSpeed);
    videoRef.current?.setPlaybackRate(newSpeed); // Set the playback speed
  };

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen mode:", err);
      });
    }
  };

  return (
    <div className="video-container mt-8">
      <h2 className="text-lg text-muted-foreground sm:text-xl mb-4">
        Sedici.me Tutorial Video
      </h2>
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%", // 16:9 Aspect Ratio
          height: 0,
          overflow: "hidden",
          maxWidth: "100%",
          backgroundColor: "#000", // Black background in case the video fails to load
        }}
      >
        <div
          ref={videoRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        >
          {/* Vimeo Player will be injected here */}
        </div>
      </div>

      {/* Custom Controls */}
      <div className="controls mt-4 flex justify-center space-x-4">
        <button
          className="play-pause-btn text-white bg-red-500 p-2 rounded"
          onClick={togglePlay}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          className="mute-btn text-white bg-blue-500 p-2 rounded"
          onClick={toggleMute}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>

        {/* Volume Control */}
        <div className="volume-control">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>

        {/* Playback Speed Control */}
        <div className="speed-control">
          <select
            value={playbackSpeed}
            onChange={handleSpeedChange}
            className="speed-select"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>

        {/* Fullscreen Toggle */}
        <button
          className="fullscreen-btn text-white bg-green-500 p-2 rounded"
          onClick={toggleFullscreen}
        >
          Fullscreen
        </button>
      </div>

      {/* Custom CSS for buttons and controls */}
      <style jsx>{`
        .controls button {
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        .controls button:hover {
          background-color: #333;
        }
        .volume-slider {
          width: 150px;
        }
        .speed-select {
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

export default VideoComponent;
