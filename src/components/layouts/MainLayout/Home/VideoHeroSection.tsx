"use client";
import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const VideoHeroSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      {/* Video Hero Section */}
      <div className="relative w-full max-w-7xl mx-auto h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-2xl">
        {/* Video Element - First frame will show */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          muted={isMuted}
          playsInline
          preload="metadata"
        >
          <source src="/assets/home/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play Button Overlay - Only when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayPause}
              className="group flex items-center justify-center size-20 rounded-full border-2 border-white bg-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-110 cursor-pointer"
              aria-label="Play video"
            >
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </button>
          </div>
        )}

        {/* Bottom Controls - Show when playing */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                className="flex items-center justify-center size-10 cursor-pointer rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                <Pause className="w-5 h-5 text-white" fill="white" />
              </button>

              {/* Mute/Unmute Button */}
              <button
                onClick={handleMuteToggle}
                className="flex items-center justify-center size-10 cursor-pointer rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoHeroSection;
