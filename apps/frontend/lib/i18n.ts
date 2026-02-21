export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const labels = {
  en: {
    donate: "Donate",
    volunteer: "Volunteer",
    join: "Join our team",
    nav: { home: "Home", about: "About", issues: "Issues", endorsements: "Endorsements", involved: "Get involved", donate: "Donate", privacy: "Privacy", terms: "Terms" }
  },
  es: {
    donate: "Donar",
    volunteer: "Voluntario",
    join: "Únete al equipo",
    nav: { home: "Inicio", about: "Acerca de", issues: "Temas", endorsements: "Respaldos", involved: "Participa", donate: "Donar", privacy: "Privacidad", terms: "Términos" }
  }
};
