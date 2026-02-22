import { Locale } from "./i18n";

export const priorities = {
  en: [
    "Ban taxpayer funded lobbyists",
    "Protect our second amendment rights",
    "Fight to permanently lower property taxes",
    "Defend our conservative values that make Texas strong and safe, and fight for San Antonio families",
    "Oppose the radical, woke indoctrination of our children and fight the liberal takeover of our education system",
    "Stand with local law enforcement and fight any efforts to defund the police",
    "Ban sexually explicit school materials and drag show performances in front of children"
  ],
  es: [
    "TODO: contenido en español",
    "TODO: contenido en español",
    "TODO: contenido en español",
    "TODO: contenido en español",
    "TODO: contenido en español",
    "TODO: contenido en español",
    "TODO: contenido en español"
  ]
};

export const endorsements = [
  { name: "Governor Greg Abbott", logo: "/assets/endorsements/greg-abbott-placeholder.png", category: "major" },
  { name: "Texas Homeschool Coalition", logo: "/assets/endorsements/tx-homeschool-placeholder.png", category: "community" },
  { name: "San Antonio Voter Guide PAC", logo: "/assets/endorsements/sa-voter-guide-placeholder.png", category: "grassroots" }
];

export const donateCopyPath = (locale: Locale) => `/content/${locale}/donate.mdx`;
