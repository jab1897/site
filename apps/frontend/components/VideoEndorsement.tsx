"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Share2 } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { ELECTION_INFO_URL, VideoEndorsement as Endorsement, voteCopy, votingPhase, VotingPhase } from "@/lib/endorsements";

// Fired whenever any campaign video starts playing so the others can pause or mute.
export const VIDEO_PLAY_EVENT = "campaign-video:play";

const PLAY_LABEL = { en: "Play video: endorsement from", es: "Reproducir video: respaldo de" } as const;
const REPLAY = { en: "Replay", es: "Repetir" } as const;
const OPEN_DIRECT = { en: "Video not playing? Open it directly", es: "¿No se reproduce? Abra el video aquí" } as const;
const SHARE = { en: "Share", es: "Compartir" } as const;
const COPIED = { en: "Link copied", es: "Enlace copiado" } as const;
const VOTE_FOR = { en: "Vote Jorge Borrego", es: "Vote por Jorge Borrego" } as const;
const WATCH_NEXT = { en: "Watch", es: "Vea el mensaje de" } as const;
const WATCH_NEXT_SUFFIX = { en: "’s message →", es: " →" } as const;

type Props = {
  endorsement: Endorsement;
  locale: Locale;
  next?: { label: string; href: string };
  className?: string;
};

export function VideoEndorsement({ endorsement: e, locale, next, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionsSet = useRef(false);
  // Driven only by media events, so the UI never claims "playing" before playback has started.
  const [phase, setPhase] = useState<"idle" | "playing" | "ended" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [vote, setVote] = useState<VotingPhase>("early");

  useEffect(() => {
    const onOtherPlay = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== e.id) videoRef.current?.pause();
    };
    window.addEventListener(VIDEO_PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(VIDEO_PLAY_EVENT, onOtherPlay);
  }, [e.id]);

  // Captions are switched on once playback has started rather than with a `default` track:
  // iOS Safari can stall starting a video while it loads a default caption track.
  const showCaptions = () => {
    const tracks = videoRef.current?.textTracks;
    if (!tracks || captionsSet.current) return;
    captionsSet.current = true;
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      if (track.language === locale && e.burnedInCaptions !== locale) {
        track.mode = "showing";
      }
    }
  };

  const replay = () => {
    const video = videoRef.current;
    setPhase("idle");
    if (!video) return;
    video.currentTime = 0;
    video.play()?.catch((err: DOMException) => {
      // The native controls stay visible, so the viewer can still start it by hand.
      console.warn("[VideoEndorsement] replay play() rejected", e.id, err?.name, err?.message);
    });
  };

  const share = async () => {
    const url = `${window.location.origin}/${locale}/endorsements#${e.id}`;
    if (navigator.share) {
      await navigator.share({ title: `${e.name} endorses Jorge Borrego`, url }).catch(() => {});
      return;
    }
    await navigator.clipboard?.writeText(url).then(() => setCopied(true), () => {});
  };

  const copy = voteCopy[vote];

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-navy shadow-xl ${className ?? ""}`}
      style={{ aspectRatio: e.aspect }}
    >
      {/* Native controls are always on: the viewer taps the browser's own play button, which is the
          one start-up path iOS Safari and in-app browsers reliably allow. Nothing is layered over it. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full bg-black object-contain"
        src={e.video}
        poster={e.poster}
        controls
        playsInline
        preload="metadata"
        aria-label={`${PLAY_LABEL[locale]} ${e.name}`}
        onPlay={() => {
          setVote(votingPhase());
          setPhase("playing");
          window.dispatchEvent(new CustomEvent(VIDEO_PLAY_EVENT, { detail: e.id }));
        }}
        onPlaying={showCaptions}
        onEnded={() => setPhase("ended")}
        onError={() => {
          console.warn("[VideoEndorsement] media error", e.id, videoRef.current?.error?.code, videoRef.current?.error?.message);
          setPhase("error");
        }}
      >
        {(["en", "es"] as const).map((lang) => (
          <track
            key={lang}
            kind="captions"
            src={e.captions[lang]}
            srcLang={lang}
            label={lang === "en" ? "English" : "Español"}
          />
        ))}
      </video>

      {phase === "idle" && (
        <span aria-hidden="true" className="pointer-events-none absolute left-0 top-[8%] max-w-[85%] border-l-4 border-red bg-navy px-3 py-1.5 text-left text-white">
          <span className="block text-base font-black uppercase leading-tight tracking-wide">{e.name}</span>
          <span className="block text-xs font-semibold text-slate-300">{e.title[locale]}</span>
        </span>
      )}

      {phase === "error" && (
        <a
          href={e.video}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-x-0 top-0 z-10 bg-navy/90 px-3 py-2 text-center text-sm font-semibold text-white underline"
        >
          {OPEN_DIRECT[locale]}
        </a>
      )}

      {phase === "ended" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-navy to-[#1b2b57] p-5 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f3b5bd]">{copy.kicker[locale]}</p>
          <p className="text-2xl font-black uppercase leading-tight">{VOTE_FOR[locale]}</p>
          <a
            href={ELECTION_INFO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-red px-4 py-2.5 text-sm font-bold text-white shadow hover:brightness-95"
          >
            {copy.cta[locale]}
          </a>
          {next && (
            <a href={next.href} className="text-sm font-semibold underline underline-offset-2">
              {`${WATCH_NEXT[locale]} ${next.label}${WATCH_NEXT_SUFFIX[locale]}`}
            </a>
          )}
          <div className="mt-1 flex gap-4 text-xs text-slate-300">
            <button type="button" onClick={replay} className="inline-flex items-center gap-1 underline underline-offset-2">
              <RotateCcw size={12} aria-hidden="true" /> {REPLAY[locale]}
            </button>
            <button type="button" onClick={share} className="inline-flex items-center gap-1 underline underline-offset-2">
              <Share2 size={12} aria-hidden="true" /> {copied ? COPIED[locale] : SHARE[locale]}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function VoteCta({ locale, onDark = false }: { locale: Locale; onDark?: boolean }) {
  // Starts on the early-voting copy (what the static page was built with), then corrects to today's date.
  const [vote, setVote] = useState<VotingPhase>("early");
  useEffect(() => setVote(votingPhase()), []);
  const copy = voteCopy[vote];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={ELECTION_INFO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-red px-5 py-3 font-bold text-white shadow hover:brightness-95"
      >
        {copy.cta[locale]}
      </a>
      {copy.note[locale] && <p className={`text-sm ${onDark ? "text-slate-300" : "text-slate-600"}`}>{copy.note[locale]}</p>}
    </div>
  );
}
