"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";

const INTRO_SRC =
  "https://www.dropbox.com/scl/fi/3ga1vxe0ihwu32rk7ehh1/General-Elect-Raw.mp4?rlkey=4t8prt4g586rrtykzh0sa00au&st=ayutewxo&raw=1";

type Props = {
  commercialMp4: string;
  commercialWebm?: string;
  commercialPoster: string;
  className?: string;
};

export function VideoSequencePlayer({ commercialMp4, commercialWebm, commercialPoster, className }: Props) {
  const introRef = useRef<HTMLVideoElement>(null);
  const commercialRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"intro" | "prompt" | "commercial">("intro");
  const [muted, setMuted] = useState(true);

  const handleIntroEnded = () => setPhase("prompt");

  const playCommercial = () => {
    setPhase("commercial");
    const vid = commercialRef.current;
    if (!vid) return;
    vid.muted = false;
    setMuted(false);
    vid.play().catch(() => {
      vid.muted = true;
      setMuted(true);
      vid.play().catch(() => {});
    });
  };

  const toggleMute = () => {
    const vid = phase === "intro" ? introRef.current : commercialRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <div className={`relative lg:col-start-2 lg:row-span-2 lg:row-start-1 overflow-hidden rounded-2xl border border-navy/10 shadow ${className ?? ""}`}>
      {/* Intro video */}
      <video
        ref={introRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleIntroEnded}
        className={`w-full ${phase !== "intro" ? "hidden" : ""}`}
      >
        <source src={INTRO_SRC} type="video/mp4" />
      </video>

      {/* Commercial video (pre-rendered, hidden until needed) */}
      <video
        ref={commercialRef}
        playsInline
        preload="metadata"
        poster={commercialPoster}
        className={`w-full ${phase !== "commercial" ? "hidden" : ""}`}
      >
        {commercialWebm && <source src={commercialWebm} type="video/webm" />}
        <source src={commercialMp4} type="video/mp4" />
      </video>

      {/* Prompt overlay after intro ends */}
      {phase === "prompt" && (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-navy/90 text-white">
          <p className="text-lg font-semibold uppercase tracking-wide">Watch Our Commercial</p>
          <button
            type="button"
            onClick={playCommercial}
            className="flex items-center gap-2 rounded-full bg-red px-6 py-3 font-bold text-white shadow-lg transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Play size={20} aria-hidden="true" />
            Play Now
          </button>
        </div>
      )}

      {/* Mute toggle (visible during intro and commercial, not on prompt screen) */}
      {phase !== "prompt" && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute bottom-4 right-4 rounded-full bg-navy/80 p-2.5 text-white shadow transition hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={20} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
