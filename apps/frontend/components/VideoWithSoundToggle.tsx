"use client";

import { useRef, useState } from "react";

type VideoWithSoundToggleProps = {
  poster: string;
  source: string;
  className?: string;
};

export function VideoWithSoundToggle({ poster, source, className }: VideoWithSoundToggleProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);

    if (!video.paused) {
      video.play().catch(() => {
        // Ignore autoplay-related play rejections after mute toggle.
      });
    }
  };

  return (
    <div className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className={className}
        onClick={toggleSound}
      >
        <source src={source} />
      </video>

      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-4 right-4 rounded-full bg-navy/80 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={muted ? "Turn video sound on" : "Turn video sound off"}
      >
        {muted ? "🔇 Sound Off" : "🔊 Sound On"}
      </button>
    </div>
  );
}
