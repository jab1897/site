"use client";

import { useEffect, useRef, useState } from "react";
import { videoEndorsements } from "@/lib/endorsements";
import { VideoEndorsement } from "@/components/VideoEndorsement";

// Temporary on-device diagnostics for the endorsement player: each variant adds one piece of the real
// player so a phone test shows which piece stops playback. Remove once the cause is confirmed.

const e = videoEndorsements.lujan;
const EVENTS = ["loadstart", "loadedmetadata", "canplay", "play", "playing", "waiting", "stalled", "pause", "ended", "error"];

function useMediaLog(container: React.RefObject<HTMLDivElement | null>) {
  const [log, setLog] = useState<string[]>([]);
  useEffect(() => {
    const video = container.current?.querySelector("video");
    if (!video) return;
    const t0 = performance.now();
    const add = (line: string) => setLog((l) => [...l, `${((performance.now() - t0) / 1000).toFixed(1)}s ${line}`]);
    const handlers = EVENTS.map((name) => {
      const h = () =>
        add(name === "error" ? `error code=${video.error?.code} ${video.error?.message ?? ""}` : `${name} t=${video.currentTime.toFixed(1)}`);
      video.addEventListener(name, h);
      return [name, h] as const;
    });
    const originalPlay = video.play.bind(video);
    video.play = () => {
      add("play() called");
      const p = originalPlay();
      p?.then(() => add("play() resolved"), (err: DOMException) => add(`play() REJECTED ${err?.name}: ${err?.message}`));
      return p;
    };
    add(`ready ua=${navigator.userAgent.slice(0, 60)}…`);
    return () => handlers.forEach(([n, h]) => video.removeEventListener(n, h));
  }, [container]);
  return log;
}

function Variant({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const log = useMediaLog(ref);
  return (
    <section className="rounded-xl border border-navy/15 p-4">
      <h2 className="text-lg font-black text-navy">
        {id}. {title}
      </h2>
      <div ref={ref} className="mx-auto mt-3 max-w-[240px]">
        {children}
      </div>
      <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded bg-slate-100 p-2 text-[11px] leading-snug text-slate-800">
        {log.length ? log.join("\n") : "waiting…"}
      </pre>
    </section>
  );
}

function OldOverlayPlayer() {
  // Reproduces the previous player: custom button overlay, controls toggled on at tap time, preload="none".
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  return (
    <div className="relative w-full" style={{ aspectRatio: e.aspect }}>
      <video ref={ref} className="absolute inset-0 h-full w-full bg-black" src={e.video} poster={e.poster} controls={started} playsInline preload="none">
        <track kind="captions" src={e.captions.en} srcLang="en" label="English" />
        <track kind="captions" src={e.captions.es} srcLang="es" label="Español" />
      </video>
      {!started && (
        <button
          type="button"
          className="absolute inset-0 flex items-center justify-center bg-black/20 text-lg font-bold text-white"
          onClick={() => {
            ref.current?.play()?.catch(() => {});
            setStarted(true);
          }}
        >
          ▶ Tap
        </button>
      )}
    </div>
  );
}

export function VideoDiagnostics({ locale }: { locale: "en" | "es" }) {
  return (
    <div className="space-y-6">
      <Variant id="A" title="Plain native player">
        <video src={e.video} controls playsInline className="w-full bg-black" />
      </Variant>
      <Variant id="B" title="A + caption tracks">
        <video src={e.video} controls playsInline className="w-full bg-black">
          <track kind="captions" src={e.captions.en} srcLang="en" label="English" />
          <track kind="captions" src={e.captions.es} srcLang="es" label="Español" />
        </video>
      </Variant>
      <Variant id="C" title="B + poster + preload=metadata">
        <video src={e.video} poster={e.poster} preload="metadata" controls playsInline className="w-full bg-black">
          <track kind="captions" src={e.captions.en} srcLang="en" label="English" />
          <track kind="captions" src={e.captions.es} srcLang="es" label="Español" />
        </video>
      </Variant>
      <Variant id="D" title="New site player (what the homepage now uses)">
        <VideoEndorsement endorsement={e} locale={locale} />
      </Variant>
      <Variant id="E" title="Old player (custom tap button over the video)">
        <OldOverlayPlayer />
      </Variant>
    </div>
  );
}
