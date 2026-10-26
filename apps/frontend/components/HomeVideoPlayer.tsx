"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { VIDEO_PLAY_EVENT } from "@/components/VideoEndorsement";

const VIDEO_SRC = "/video/meet-jorge.mp4";

type Props = {
  poster: string;
  className?: string;
};

export function HomeVideoPlayer({ poster, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid && window.matchMedia("(prefers-reduced-motion: reduce)").matches) vid.pause();

    // Keep this background video quiet while an endorsement video is playing.
    const onEndorsementPlay = () => {
      if (!videoRef.current) return;
      videoRef.current.muted = true;
      setMuted(true);
    };
    window.addEventListener(VIDEO_PLAY_EVENT, onEndorsementPlay);
    return () => window.removeEventListener(VIDEO_PLAY_EVENT, onEndorsementPlay);
  }, []);

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <div className={`relative lg:col-start-2 lg:row-span-2 lg:row-start-1 overflow-hidden rounded-2xl border border-navy/10 shadow ${className ?? ""}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className="w-full"
        onClick={toggleMute}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-4 right-4 rounded-full bg-navy/80 p-2.5 text-white shadow transition hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX size={20} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
      </button>
    </div>
  );
}
