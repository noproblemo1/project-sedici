"use client"; // This marks the component as a Client Component

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player"; // Assuming Player is imported correctly

export default function VideoComponent() {
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state
  const [volume, setVolume] = useState(1); // Track the volume (0 to 1)
  const [muted, setMuted] = useState(false); // Track mute/unmute state
  const [playbackRate, setPlaybackRate] = useState(1); // Track the video speed (normal speed)
  const videoRef = useRef<HTMLDivElement | null>(null); // Ref for the div containing the video
  const playerRef = useRef<Player | null>(null); // Ref for the Vimeo Player instance

  // Initialize the Vimeo player and handle its events
  useEffect(() => {
    if (videoRef.current) {
      const player = new Player(videoRef.current, {
        id: 1036990750, // The Vimeo video ID
        width: "640",
        loop: true, // Enable loop
        autoplay: false, // No autoplay
        controls: false, // Disable default controls to implement custom controls
        muted: false, // Start unmuted
        byline: false, // Hide byline
        title: false, // Hide title
        portrait: false, // Hide portrait
      });

      // Listen for play and pause events
      player.on("play", () => setIsPlaying(true));
      player.on("pause", () => setIsPlaying(false));

      // Store player instance
      playerRef.current = player;

      // Cleanup function when the component unmounts
      return () => {
        // Clear the player reference to allow proper cleanup
        playerRef.current = null; // Reset reference to null
      };
    }
  }, []); // Empty dependency array to run this effect only once

  // Custom play/pause toggle
  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
  };

  // Handle mute/unmute toggle
  const toggleMute = () => {
    if (playerRef.current) {
      const newMuteState = !muted;
      playerRef.current.setVolume(newMuteState ? 0 : volume); // Set volume to 0 for mute, else restore the current volume
      setMuted(newMuteState); // Update the local muted state
    }
  };

  // Set volume and update background based on the volume
  const changeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume); // Update the player volume
      if (newVolume > 0) setMuted(false); // Unmute if volume is adjusted
    }
  };

  // Set playback speed
  const changeSpeed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpeed = parseFloat(event.target.value);
    setPlaybackRate(newSpeed);
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(newSpeed); // Update the playback rate (speed)
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (playerRef.current) {
      playerRef.current.requestFullscreen(); // Request fullscreen mode
    }
  };

  // Calculate the background style for the volume slider with new color #660000
  const volumeBackground = `linear-gradient(to right, #660000 ${volume * 100}%, #ddd ${volume * 100}%)`;

  return (
    <div className="video-container mt-8">
      <h2 className="text-lg text-muted-foreground sm:text-xl mb-4">
        Sedici.me Tutorial Video
      </h2>
      <div
        ref={videoRef}
        className="video-wrapper"
        style={{ position: "relative", width: "100%", height: "100%" }}
      />

      {/* Custom Controls */}
      <div className="controls mt-4 flex justify-between items-center w-full max-w-[640px]">
        {/* Play/Pause Button */}
        <button onClick={togglePlayPause} className="play-pause-btn">
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Mute/Unmute Button */}
        <button onClick={toggleMute} className="mute-unmute-btn">
          {muted ? "Unmute" : "Mute"}
        </button>

        {/* Volume Control */}
        <div className="volume-control-container">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={changeVolume}
            className="volume-control"
            style={{ background: volumeBackground }} // Apply dynamic background with new color
          />
        </div>

        {/* Playback Speed */}
        <select
          value={playbackRate}
          onChange={changeSpeed}
          className="speed-control"
        >
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>

        {/* Fullscreen Button */}
        <button onClick={toggleFullscreen} className="fullscreen-btn">
          Fullscreen
        </button>
      </div>

      {/* Add the CSS Styling to customize the volume slider */}
      <style jsx>{`
        .volume-control {
          -webkit-appearance: none;
          width: 100px;
          height: 8px;
          border-radius: 5px;
          outline: none;
          transition: background 0.3s;
        }

        .volume-control::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #660000; /* Updated color for the thumb */
          cursor: pointer;
        }

        .volume-control::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #660000; /* Updated color for the thumb */
          cursor: pointer;
        }

        .volume-control:focus {
          background: #ccc; /* Add color change when focused */
        }

        .controls {
          width: 640px; /* Controls match the video width */
          display: flex;
          justify-content: space-between;
        }

        .play-pause-btn,
        .mute-unmute-btn,
        .fullscreen-btn {
          background: #660000;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
        }

        .play-pause-btn:hover,
        .mute-unmute-btn:hover,
        .fullscreen-btn:hover {
          background: #992222;
        }

        .fullscreen-btn {
          margin-left: 15px;
        }

        .speed-control {
          padding: 0.3rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
