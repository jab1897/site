"use client";

import { useEffect, useState } from "react";
import {
  CountdownState,
  ELECTION_DAY_START_MS,
  ELECTION_DAY_END_MS,
  ELECTION_POLLS_CLOSE_MS,
  getCountdownState
} from "@/lib/config";

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
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const state: CountdownState = getCountdownState(nowMs);

  if (state === "post_election") return null;

  if (state === "election_day") {
    return (
      <div className="bg-red px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-white md:text-sm">
        Polls open until 7 PM.{" "}
        <a
          href="https://teamrv-mvp.sos.texas.gov/MVP/mvp.do"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Find your polling place
        </a>
      </div>
    );
  }

  return (
    <div className="bg-red px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-white md:text-sm">
      General Election Countdown{" "}
      <span className="ml-2 tracking-[0.08em]">
        {formatRemaining(ELECTION_POLLS_CLOSE_MS - nowMs)}
      </span>
    </div>
  );
}
