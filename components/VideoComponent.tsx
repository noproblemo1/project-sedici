"use client"; // This marks the component as a Client Component

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player"; // Assuming Player is imported correctly

export default function VideoComponent() {
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the video is playing
  const videoRef = useRef<HTMLDivElement | null>(null); // Ref for the div element containing the video
  const playerRef = useRef<Player | null>(null); // Ref for the Vimeo Player instance

  // Initialize the Vimeo player and attach event listeners
  useEffect(() => {
    if (videoRef.current) {
      const player = new Player(videoRef.current, {
        id: 1036990750, // The Vimeo video ID
        width: "640",
        loop: true, // Enable loop
        autoplay: false, // Do not autoplay the video
        controls: true, // Show controls (play, pause, etc.)
        muted: false, // Start unmuted
        byline: false, // Hide byline
        title: false, // Hide title
        portrait: false, // Hide portrait
      });

      // Listen for play and pause events to update the state
      player.on("play", () => setIsPlaying(true));
      player.on("pause", () => setIsPlaying(false));

      // Store the player instance in the ref for potential later use (e.g., for controls)
      playerRef.current = player;

      // Cleanup on component unmount
      return () => {
        if (playerRef.current) {
          playerRef.current.destroy(); // Destroy the player instance to prevent memory leaks
        }
      };
    }
  }, []); // Empty dependency array to ensure this effect only runs once when the component mounts

  return (
    <div className="video-container mt-8">
      <h2 className="text-lg text-muted-foreground sm:text-xl mb-4">
        Sedici.me Tutorial Video
      </h2>
      {/* Div element to hold the Vimeo player */}
      <div
        ref={videoRef}
        className="video-wrapper"
        style={{ position: "relative", width: "100%", height: "100%" }}
      />
    </div>
  );
}
