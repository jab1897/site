export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const labels = {
  en: {
    donate: "Donate",
    volunteer: "Volunteer",
    join: "Join our team",
    nav: { home: "Home", about: "About", issues: "Issues", endorsements: "Endorsements", involved: "Get involved", donate: "Donate", privacy: "Privacy", terms: "Terms" },
    home: {
      kicker: "Texas House District 118",
      name: "Jorge Borrego",
      slogan: "A conservative fighter for San Antonio",
      summary:
        "Jorge Borrego is fighting for safe neighborhoods, strong schools, and lower taxes for working families. He is rooted in faith, family, and service, and he is ready to lead with steady conservative values for San Antonio.",
      primaryCta: "Donate",
      secondaryCta: "Join our team",
      imageAlt: "Jorge Borrego with his family"
    }
  },
  es: {
    donate: "Donar",
    volunteer: "Voluntario",
    join: "Únete al equipo",
    nav: { home: "Inicio", about: "Acerca de", issues: "Temas", endorsements: "Respaldos", involved: "Participa", donate: "Donar", privacy: "Privacidad", terms: "Términos" },
    home: {
      kicker: "Distrito 118 de la Cámara de Texas",
      name: "Jorge Borrego",
      slogan: "Un luchador conservador por San Antonio",
      summary:
        "Jorge Borrego lucha por vecindarios seguros, escuelas fuertes y menos impuestos para las familias trabajadoras. Está guiado por la fe, la familia y el servicio, y está listo para liderar con valores conservadores firmes para San Antonio.",
      primaryCta: "Donar",
      secondaryCta: "Únete al equipo",
      imageAlt: "Jorge Borrego con su familia"
    }
  }
};
