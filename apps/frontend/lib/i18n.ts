export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const labels = {
  en: {
    donate: "Donate",
    volunteer: "Volunteer",
    join: "Count me in!",
    nav: { home: "Home", about: "About", issues: "Issues", endorsements: "Endorsements", involved: "Get involved", donate: "Donate", privacy: "Privacy", terms: "Terms" },
    home: {
      kicker: "Texas House District 118",
      name: "Jorge Borrego",
      slogan: "A conservative fighter for San Antonio",
      summary:
        "Jorge Borrego is fighting for safe neighborhoods, strong schools, and lower taxes for working families. He is rooted in faith, family, and service, and he is ready to lead with steady conservative values for San Antonio.",
      primaryCta: "Donate",
      secondaryCta: "Join our team",
      imageAlt: "Jorge Borrego with his family",
      donateHeadline: "Jorge Borrego will defend our conservative values that make Texas strong and safe.",
      donateSubhead: "Your donation today of any amount helps Jorge reach more voters across District 118.",
      donateButton: "Donate Today"
    }
  },
  es: {
    donate: "Donar",
    volunteer: "Voluntario",
    join: "¡Cuenten conmigo!",
    nav: { home: "Inicio", about: "Acerca de", issues: "Temas", endorsements: "Respaldos", involved: "Participa", donate: "Donar", privacy: "Privacidad", terms: "Términos" },
    home: {
      kicker: "Distrito 118 de la Cámara de Texas",
      name: "Jorge Borrego",
      slogan: "Un luchador conservador por San Antonio",
      summary:
        "Jorge Borrego lucha por vecindarios seguros, escuelas fuertes y menos impuestos para las familias trabajadoras. Está guiado por la fe, la familia y el servicio, y está listo para liderar con valores conservadores firmes para San Antonio.",
      primaryCta: "Donar",
      secondaryCta: "Únete al equipo",
      imageAlt: "Jorge Borrego con su familia",
      donateHeadline: "Jorge Borrego defenderá los valores conservadores que mantienen a Texas fuerte y seguro.",
      donateSubhead: "Tu donación de hoy, de cualquier cantidad, ayuda a Jorge a llegar a más votantes en todo el Distrito 118.",
      donateButton: "Donar hoy"
    }
  }
};
