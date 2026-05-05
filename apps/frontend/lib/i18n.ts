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
