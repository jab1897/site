"use client";

import { useEffect, useMemo, useState } from "react";
import { getElectionBanner } from "@/lib/config";

function formatRemaining(ms: number) {
  if (ms <= 0) return "0d : 00h : 00m : 00s";

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d : ${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`;
}

export function ElectionCountdown() {
  const [now, setNow] = useState(() => Date.now());
  const banner = useMemo(() => getElectionBanner(), [now]);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="bg-red px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-white md:text-sm">
      {banner.label} <span className="ml-2 tracking-[0.08em]">{formatRemaining(banner.targetDate.getTime() - now)}</span>
    </div>
  );
}
