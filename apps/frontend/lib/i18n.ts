export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const labels = {
  en: {
    donate: "Donate",
    volunteer: "Volunteer",
    join: "Count me in!",
    nav: {
      home: "Home",
      about: "About",
      issues: "Issues",
      endorsements: "Endorsements",
      involved: "Get involved",
      donate: "Donate",
      privacy: "Privacy",
      terms: "Terms"
    },
    home: {
      kicker: "Republican for Texas House District 118",
      name: "Jorge Borrego",
      slogan: "Fighting to lower costs, cut property taxes, and keep families across House District 118 safe.",
      summary:
        "Jorge Borrego is running to give every family in House District 118 a fair shot to get ahead. Rooted in faith, family, and service, Jorge will bring working-class Republican leadership to Austin — focused on affordability, safe neighborhoods, strong schools, and a government that puts Texans first.",
      primaryCta: "Donate",
      secondaryCta: "Join Our Team",
      imageAlt: "Jorge Borrego with his family",
      meetHeading: "Meet Jorge Borrego",
      meetSubhead: "For Texas House District 118",
      meetBody: [
        "Jorge Borrego is the Republican candidate for Texas House District 118, running to give every family a fair shot to get ahead.",
        "Raised in a working-class family that knew hard times firsthand, Jorge understands what it means to fight for opportunity and earn everything through hard work. Through faith, discipline, and personal responsibility, he became the first in his family to graduate from college and built a career fighting for stronger schools, lower taxes, and more accountable government across Texas.",
        "A husband, father, and small business owner, Jorge believes faith, family, and service are the foundation of strong communities. He is focused on lowering the cost of living, cutting property taxes, keeping neighborhoods safe, funding public schools, and protecting children.",
        "Jorge Borrego is running to serve the families of House District 118 — not Austin insiders, not taxpayer-funded lobbyists, and not career politicians."
      ],
      learnMore: "Learn More",
      prioritiesHeading: "Priorities",
      choiceHeading: "The Choice in This Race",
      choiceBody: [
        "Jorge Borrego is running to put families across House District 118 first — lowering costs, cutting property taxes, keeping neighborhoods safe, and making sure state government listens to real Texans.",
        "This race will draw political money and pressure from outside the district. Jorge will answer to the families of House District 118, not Austin insiders, taxpayer-funded lobbyists, or political operatives."
      ],
      donateHeadline: "Help Jorge fight for lower costs, safer neighborhoods, stronger schools, and a government that puts Texans first.",
      donateSubhead: "Your donation today of any amount helps Jorge reach more voters across District 118.",
      donateButton: "Donate Today"
    },
    getInvolved: {
      pageHeading: "Get involved",
      pageSubhead: "Help us connect with neighbors across District 118 and build momentum for election day.",
      formHeading: "Join the team",
      formSubhead: "Sign up for updates and tell us how you want to help.",
      labels: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email address",
        phone: "Phone number (recommended)",
        zip: "ZIP code",
        interest: "How would you like to help?",
        updatesOptIn: "Sign me up for campaign updates",
        smsConsent:
          "By providing my mobile number, I consent to receive informational text messages from the campaign. Message frequency may vary. Msg and data rates may apply. Text STOP to opt-out. Text HELP for help. See our",
        smsConsentPrivacy: "Privacy Policy",
        smsConsentTerms: "Terms",
        privacy: "We respect your privacy and will never sell your information."
      },
      interests: {
        updates: "Updates",
        blockWalking: "Block walking",
        phoneBanking: "Phone banking",
        volunteerPoll: "Volunteer at a poll",
        hostEvent: "Host an event"
      },
      submit: "Submit",
      submitting: "Submitting...",
      success: "Thank you. We will be in touch soon.",
      donate: "Donate",
      backHome: "Back to home",
      errors: {
        firstName: "First name must be at least 2 characters.",
        lastName: "Last name must be at least 2 characters.",
        email: "A valid email address is required.",
        zip: "ZIP code is required.",
        server: "Something went wrong. Please try again."
      }
    },
    leadsForm: {
      heading: "Sign Up For Updates",
      labels: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Cell Phone",
        zip: "Zip Code"
      },
      thankYou: "Thanks for joining. We will be in touch soon.",
      error: "Something went wrong. Please try again."
    },
    pages: {
      privacy: {
        heading: "Privacy Policy",
        body: "The Jorge Borrego Campaign is committed to protecting your privacy. Information you provide through this website, including your name, email address, and phone number, is used solely to communicate with you about the campaign and may be shared with authorized campaign staff and vendors. We do not sell your information to third parties. For questions, contact info@jorgefortexas.com."
      },
      terms: {
        heading: "Terms of Use",
        body: "By using this website you agree to these terms. This site is operated by the Jorge Borrego Campaign for informational and political purposes. Content is provided in good faith and may change without notice. Donations are processed through WinRed. For questions, contact info@jorgefortexas.com."
      }
    }
  },

  es: {
    donate: "Donar",
    volunteer: "Voluntario",
    join: "¡Cuenten conmigo!",
    nav: {
      home: "Inicio",
      about: "Acerca de",
      issues: "Temas",
      endorsements: "Respaldos",
      involved: "Participa",
      donate: "Donar",
      privacy: "Privacidad",
      terms: "Términos"
    },
    home: {
      kicker: "Republicano para la Cámara de Representantes de Texas, Distrito 118",
      name: "Jorge Borrego",
      slogan: "Luchando para bajar los costos, reducir los impuestos a la propiedad y mantener seguras a las familias del Distrito 118.",
      summary:
        "Jorge Borrego está luchando para que cada familia del Distrito 118 tenga una oportunidad justa de salir adelante. Con raíces en la fe, la familia y el servicio, Jorge llevará a Austin un liderazgo Republicano de familias trabajadoras, enfocado en el costo de vida, vecindarios seguros, escuelas fuertes y un gobierno que ponga primero a los texanos.",
      primaryCta: "Donar",
      secondaryCta: "Únete al Equipo",
      imageAlt: "Jorge Borrego con su familia",
      meetHeading: "Conoce a Jorge Borrego",
      meetSubhead: "Para la Cámara de Representantes de Texas, Distrito 118",
      meetBody: [
        "Jorge Borrego es el candidato Republicano para la Cámara de Representantes de Texas, Distrito 118, y se postula para que cada familia tenga una oportunidad justa de salir adelante.",
        "Criado en una familia trabajadora que conoció tiempos difíciles de cerca, Jorge entiende lo que significa luchar por una oportunidad y ganarse todo con trabajo duro. A través de la fe, la disciplina y la responsabilidad personal, fue el primero de su familia en graduarse de la universidad y construyó una carrera luchando por escuelas más fuertes, impuestos más bajos y un gobierno más responsable en todo Texas.",
        "Esposo, padre y dueño de un negocio propio, Jorge cree que la fe, la familia y el servicio son la base de comunidades fuertes. Está enfocado en bajar el costo de vida, reducir los impuestos a la propiedad, mantener seguros los vecindarios, financiar las escuelas públicas y proteger a los niños.",
        "Jorge Borrego se postula para servir a las familias del Distrito 118, no a los intereses de Austin, los lobbyistas pagados con nuestros impuestos ni los políticos de carrera."
      ],
      learnMore: "Conoce Más",
      prioritiesHeading: "Prioridades",
      choiceHeading: "La Decisión en Esta Elección",
      choiceBody: [
        "Jorge Borrego está luchando para poner primero a las familias del Distrito 118: bajar los costos, reducir los impuestos a la propiedad, mantener seguros nuestros vecindarios y asegurar que el gobierno estatal escuche a los texanos.",
        "Esta elección atraerá dinero político y presiones de fuera del distrito. Jorge responderá a las familias del Distrito 118, no a los intereses de Austin, los lobbyistas pagados con nuestros impuestos ni los operadores políticos."
      ],
      donateHeadline: "Ayuda a Jorge a luchar por costos más bajos, vecindarios más seguros, escuelas más fuertes y un gobierno que ponga primero a los texanos.",
      donateSubhead: "Tu donación de hoy, de cualquier cantidad, ayuda a Jorge a llegar a más votantes en todo el Distrito 118.",
      donateButton: "Donar hoy"
    },
    getInvolved: {
      pageHeading: "Participa",
      pageSubhead: "Ayúdenos a conectar con vecinos del Distrito 118 y a construir impulso para el día de las elecciones.",
      formHeading: "Únase al equipo",
      formSubhead: "Regístrese para actualizaciones e indíquenos cómo desea ayudar.",
      labels: {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo electrónico",
        phone: "Número de teléfono (recomendado)",
        zip: "Código postal",
        interest: "¿Cómo desea ayudar?",
        updatesOptIn: "Inscríbame en las actualizaciones de la campaña",
        smsConsent:
          "Al proporcionar mi número de teléfono móvil, doy mi consentimiento para recibir mensajes de texto informativos de la campaña. La frecuencia de los mensajes puede variar. Se pueden aplicar tarifas de mensajes y datos. Envíe STOP para darse de baja. Envíe HELP para obtener ayuda. Consulte nuestra",
        smsConsentPrivacy: "Política de Privacidad",
        smsConsentTerms: "Términos",
        privacy: "Respetamos su privacidad y nunca venderemos su información."
      },
      interests: {
        updates: "Actualizaciones",
        blockWalking: "Recorrido de bloques",
        phoneBanking: "Llamadas telefónicas",
        volunteerPoll: "Voluntario en las urnas",
        hostEvent: "Organizar un evento"
      },
      submit: "Enviar",
      submitting: "Enviando...",
      success: "Gracias. Nos pondremos en contacto con usted pronto.",
      donate: "Donar",
      backHome: "Volver al inicio",
      errors: {
        firstName: "El nombre debe tener al menos 2 caracteres.",
        lastName: "El apellido debe tener al menos 2 caracteres.",
        email: "Se requiere una dirección de correo electrónico válida.",
        zip: "El código postal es obligatorio.",
        server: "Algo salió mal. Por favor, intente de nuevo."
      }
    },
    leadsForm: {
      heading: "Regístrese para Actualizaciones",
      labels: {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo electrónico",
        phone: "Teléfono celular",
        zip: "Código postal"
      },
      thankYou: "Gracias por unirse. Nos pondremos en contacto pronto.",
      error: "Algo salió mal. Por favor, intente de nuevo."
    },
    pages: {
      privacy: {
        heading: "Política de Privacidad",
        body: "La Campaña Jorge Borrego se compromete a proteger su privacidad. La información que usted proporciona a través de este sitio web, incluidos su nombre, dirección de correo electrónico y número de teléfono, se utiliza exclusivamente para comunicarnos con usted sobre la campaña y puede compartirse con el personal autorizado de la campaña y sus proveedores. No vendemos su información a terceros. Para preguntas, comuníquese con info@jorgefortexas.com."
      },
      terms: {
        heading: "Términos de Uso",
        body: "Al utilizar este sitio web, usted acepta estos términos. Este sitio es operado por la Campaña Jorge Borrego con fines informativos y políticos. El contenido se proporciona de buena fe y puede cambiar sin previo aviso. Las donaciones se procesan a través de WinRed. Para preguntas, comuníquese con info@jorgefortexas.com."
      }
    }
  }
};
