import React, { useRef, useState } from "react";

const VideoPlayer = ({ src, poster, title }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-black rounded-2xl overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        className="w-full h-auto cursor-pointer"
        poster={poster}
        // onClick={togglePlayPause}
        controls
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black bg-opacity-75 py-2 px-4 rounded-lg">
        <button
          onClick={togglePlayPause}
          className="bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:bg-orange-600 transition duration-300"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <span className="text-white text-sm font-semibold">{title}</span>
      </div> */}
    </div>
  );
};

export default VideoPlayer;
