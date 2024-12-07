const VideoComponent = () => {
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
        <iframe
          src="https://player.vimeo.com/video/1036990750?autoplay=0&loop=1&muted=1&controls=1&title=0&byline=0&portrait=0&badge=0"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Custom CSS to change play button color */}
      <style jsx>{`
        /* Vimeo iframe styling to target play button */
        .vimeo-video iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        
        /* Custom play button color */
        .vimeo-video iframe:focus {
          outline: none;
        }

        .vimeo-video iframe:hover {
          cursor: pointer;
        }

        .vimeo-video iframe::-webkit-media-controls-start-playback-button {
          background-color: red !important;
        }
      `}</style>
    </div>
  );
};

export default VideoComponent;
