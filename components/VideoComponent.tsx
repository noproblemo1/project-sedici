"use client"; // This marks the component as a Client Component

import { useState, useRef } from "react";

export default function VideoComponent() {
  const [muted, setMuted] = useState(true); // State to control mute/unmute
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Mute/unmute handler for video
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="video-container mt-8">
      <h2 className="text-lg text-muted-foreground sm:text-xl mb-4">
        Sedici.me Tutorial Video
      </h2>
      <video
        ref={videoRef}
        className="w-full max-w-none"
        width="100%" // makes the video responsive
        height="auto"
        controls
        autoPlay
        loop
        poster="/poster.jpeg" // Path to poster image in the public folder
      >
        <source src="/instructions.mp4" type="video/mp4" />
        <source src="/instructions.mp4" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <button
        onClick={toggleMute}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors"
      >
        {muted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}
