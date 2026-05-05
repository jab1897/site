"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type VideoWithSoundToggleProps = {
  poster: string;
  mp4: string;
  webm: string;
  className?: string;
};

export function VideoWithSoundToggle({ poster, mp4, webm, className }: VideoWithSoundToggleProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!video.paused) {
      video.play().catch(() => {});
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
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-4 right-4 rounded-full bg-navy/80 p-2.5 text-white shadow transition hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted
          ? <VolumeX size={20} aria-hidden="true" />
          : <Volume2 size={20} aria-hidden="true" />
        }
      </button>
    </div>
  );
}
