export const flags = {
  showGalleryInNav: false,
  enableComparison: false,
  showEarlyVotingBanner: true
};

export const electionBanner = {
  primaryLabel: "Primary Election",
  primaryDate: "March 3",
  generalLabel: "General Election",
  generalDate: "November 3"
};

export function getElectionBanner() {
  const now = new Date();
  const year = now.getFullYear();
  const switchDate = new Date(`${year}-03-04T00:00:00`);
  return now >= switchDate
    ? { label: electionBanner.generalLabel, date: electionBanner.generalDate }
    : { label: electionBanner.primaryLabel, date: electionBanner.primaryDate };
}

export const donationAmounts = ["5000", "1000", "500", "250", "100", "50", "25", "Other"];
