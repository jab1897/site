import { describe, it, expect } from "vitest";
import {
  getCountdownState,
  ELECTION_DAY_START_MS,
  ELECTION_POLLS_CLOSE_MS,
  ELECTION_DAY_END_MS
} from "./config";

describe("getCountdownState", () => {
  it("returns pre_election before election day starts", () => {
    // One second before midnight CST on Nov 3, 2026
    expect(getCountdownState(ELECTION_DAY_START_MS - 1000)).toBe("pre_election");

    // Well before the election
    const july2026 = Date.UTC(2026, 6, 1, 0, 0, 0);
    expect(getCountdownState(july2026)).toBe("pre_election");
  });

  it("returns election_day from midnight CST Nov 3 through midnight CST Nov 4", () => {
    // Exactly at midnight CST Nov 3 (election day start)
    expect(getCountdownState(ELECTION_DAY_START_MS)).toBe("election_day");

    // Noon CST on election day
    const noonCST = ELECTION_DAY_START_MS + 18 * 60 * 60 * 1000;
    expect(getCountdownState(noonCST)).toBe("election_day");

    // Exactly at polls-close time (7 PM CST) still counts as election_day
    expect(getCountdownState(ELECTION_POLLS_CLOSE_MS)).toBe("election_day");

    // One second before election day ends
    expect(getCountdownState(ELECTION_DAY_END_MS - 1000)).toBe("election_day");
  });

  it("returns post_election from midnight CST Nov 4 onward", () => {
    // Exactly at midnight CST Nov 4
    expect(getCountdownState(ELECTION_DAY_END_MS)).toBe("post_election");

    // The next day
    const nov5 = ELECTION_DAY_END_MS + 24 * 60 * 60 * 1000;
    expect(getCountdownState(nov5)).toBe("post_election");
  });
});
