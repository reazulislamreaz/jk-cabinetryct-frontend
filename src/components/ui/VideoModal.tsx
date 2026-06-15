"use client";
import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const VideoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setIsLoading(true);
    sessionStorage.setItem("videoModalClosed", "true");

    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

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

  const handleVideoLoadStart = () => {
    setIsLoading(true);
  };

  const handleVideoCanPlay = () => {
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.volume = 1.0;
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 cursor-pointer  z-10 flex items-center justify-center size-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all text-white"
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Container */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
            onLoadStart={handleVideoLoadStart}
            onCanPlay={handleVideoCanPlay}
            onError={handleVideoError}
            muted={isMuted}
            playsInline
            preload="auto"
            autoPlay={false}
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-white mt-4 text-sm">Loading video...</p>
              </div>
            </div>
          )}

          {/* Play Button Overlay - Only when paused and video is loaded */}
          {!isPlaying && !isLoading && (
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
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
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
      </div>
    </div>
  );
};

export default VideoModal;
