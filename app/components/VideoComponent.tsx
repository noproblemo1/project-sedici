// app/components/VideoComponent.tsx

"use client"; // This marks the component as a Client Component

import { useState, useRef } from "react"

export default function VideoComponent() {
  const [muted, setMuted] = useState(true) // State to control mute/unmute
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Mute/unmute handler for video
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }

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
        poster="/components/poster.jpeg" // Path to poster image in the public folder
      >
        <source src="/components/instructions.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        onClick={toggleMute}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        {muted ? "Unmute" : "Mute"}
      </button>
    </div>
  )
}
