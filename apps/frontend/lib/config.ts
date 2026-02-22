export const flags = {
  showGalleryInNav: false,
  enableComparison: false,
  showEarlyVotingBanner: true
};

export const electionCalendar = {
  primary: { label: "Primary Election Countdown", month: 3, day: 3 },
  general: { label: "General Election Countdown", month: 11, day: 3 }
} as const;

export const WINRED_DONATE_URL = "https://secure.winred.com/jorge-borrego-campaign/donate-today";

export function getElectionBanner() {
  const now = new Date();
  const year = now.getFullYear();
  const primary = new Date(year, electionCalendar.primary.month - 1, electionCalendar.primary.day, 0, 0, 0);
  const general = new Date(year, electionCalendar.general.month - 1, electionCalendar.general.day, 0, 0, 0);

  if (now < primary) return { label: electionCalendar.primary.label, targetDate: primary };
  if (now < general) return { label: electionCalendar.general.label, targetDate: general };

  const nextPrimary = new Date(year + 1, electionCalendar.primary.month - 1, electionCalendar.primary.day, 0, 0, 0);
  return { label: electionCalendar.primary.label, targetDate: nextPrimary };
}

export const donationAmounts = ["5000", "1000", "500", "250", "100", "50", "25", "Other"];
