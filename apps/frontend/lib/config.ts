export const flags = {
  showGalleryInNav: false,
  enableComparison: false,
  showEarlyVotingBanner: true
};

export const WINRED_DONATE_URL = "https://secure.winred.com/jorge-borrego-campaign/donate-today";

export const donationAmounts = ["5000", "1000", "500", "250", "100", "50", "25", "Other"];

// General Election: November 3, 2026.
// Texas observes CST (UTC-6) on election day; DST ends November 1, 2026.
//
// Election day start (midnight CST Nov 3)  = 2026-11-03T06:00:00Z
// Polls close (7 PM CST Nov 3)             = 2026-11-04T01:00:00Z
// Election day end (midnight CST Nov 4)    = 2026-11-04T06:00:00Z

export const ELECTION_POLLS_CLOSE_MS = Date.UTC(2026, 10, 4, 1, 0, 0);
export const ELECTION_DAY_START_MS   = Date.UTC(2026, 10, 3, 6, 0, 0);
export const ELECTION_DAY_END_MS     = Date.UTC(2026, 10, 4, 6, 0, 0);

export type CountdownState = "pre_election" | "election_day" | "post_election";

export function getCountdownState(nowMs: number): CountdownState {
  if (nowMs >= ELECTION_DAY_END_MS) return "post_election";
  if (nowMs >= ELECTION_DAY_START_MS) return "election_day";
  return "pre_election";
}
