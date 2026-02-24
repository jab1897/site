import { Locale } from "./i18n";

export type PriorityItem = {
  title: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export const priorities: Record<Locale, PriorityItem[]> = {
  en: [
    {
      title: "Ban taxpayer funded lobbyists",
      bullets: [
        "End the practice of forcing taxpayers to subsidize influence peddling.",
        "Increase transparency so public dollars serve families, not insiders."
      ],
      image: "/images/priorities/lobbyists.jpg",
      imageAlt: "Capitol dome and document representing government accountability",
    },
    {
      title: "Protect our second amendment rights",
      bullets: [
        "Defend law-abiding Texans' right to keep and bear arms.",
        "Oppose new burdens that punish responsible gun owners."
      ],
      image: "/images/priorities/second-amendment.jpg",
      imageAlt: "Constitution and star imagery representing second amendment rights",
    },
    {
      title: "Fight to permanently lower property taxes",
      bullets: [
        "Push for lasting tax relief so families can keep more of what they earn.",
        "Hold local governments accountable for runaway spending."
      ],
      image: "/images/priorities/property-taxes.jpg",
      imageAlt: "Texas home and tax tag graphic for lower property taxes",
    },
    {
      title: "Defend our conservative values that make Texas strong and safe, and fight for San Antonio families",
      bullets: [
        "Protect faith, family, freedom, and personal responsibility.",
        "Champion policies that keep neighborhoods safe and prosperous."
      ],
      image: "/images/priorities/faith-family.jpg",
      imageAlt: "Texas flag inspired graphic representing conservative values",
    },
    {
      title: "Oppose the radical, woke indoctrination of our children and fight the liberal takeover of our education system",
      bullets: [
        "Put parents in charge of what their children learn.",
        "Focus schools on academics, discipline, and opportunity."
      ],
      image: "/images/priorities/classroom.jpg",
      imageAlt: "Classroom chalkboard and books representing education priorities",
    },
    {
      title: "Stand with local law enforcement and fight any efforts to defund the police",
      bullets: [
        "Back officers with resources, training, and public support.",
        "Reject policies that weaken public safety in our communities."
      ],
      image: "/images/priorities/law-enforcement.jpg",
      imageAlt: "Police badge and shield representing support for law enforcement",
    },
    {
      title: "Ban sexually explicit school materials and drag show performances in front of children",
      bullets: [
        "Keep age-inappropriate content out of schools and children's spaces.",
        "Defend parents' rights to protect their kids and set standards."
      ],
      image: "/images/priorities/protect-children.jpg",
      imageAlt: "Books and child-safe shield symbol representing child protection",
    }
  ],
  es: [
    {
      title: "Prohibir cabilderos financiados por contribuyentes",
      bullets: ["Terminar con el uso de dinero público para beneficiar intereses especiales.", "Aumentar la transparencia para que los recursos sirvan a las familias."],
      image: "/images/priorities/lobbyists.jpg",
      imageAlt: "Cúpula del capitolio y documento que representan rendición de cuentas",
    },
    {
      title: "Proteger nuestros derechos de la segunda enmienda",
      bullets: ["Defender el derecho de los texanos respetuosos de la ley a portar armas.", "Oponerse a cargas injustas para propietarios responsables."],
      image: "/images/priorities/second-amendment.jpg",
      imageAlt: "Constitución y estrella que representan derechos de la segunda enmienda",
    },
    {
      title: "Luchar para bajar permanentemente los impuestos a la propiedad",
      bullets: ["Impulsar alivio fiscal permanente para las familias.", "Exigir responsabilidad al gasto gubernamental local."],
      image: "/images/priorities/property-taxes.jpg",
      imageAlt: "Casa de Texas y etiqueta fiscal",
    },
    {
      title: "Defender nuestros valores conservadores que mantienen a Texas fuerte y seguro, y luchar por las familias de San Antonio",
      bullets: ["Proteger fe, familia, libertad y responsabilidad personal.", "Impulsar políticas para vecindarios seguros y prósperos."],
      image: "/images/priorities/faith-family.jpg",
      imageAlt: "Gráfico inspirado en la bandera de Texas",
    },
    {
      title: "Oponerse al adoctrinamiento radical de nuestros hijos y frenar la toma liberal del sistema educativo",
      bullets: ["Poner a los padres al mando de la educación de sus hijos.", "Enfocar escuelas en aprendizaje y disciplina."],
      image: "/images/priorities/classroom.jpg",
      imageAlt: "Pizarrón y libros",
    },
    {
      title: "Respaldar a la policía local y oponerse a cualquier intento de quitarle fondos",
      bullets: ["Apoyar a los oficiales con recursos y entrenamiento.", "Rechazar políticas que debiliten la seguridad pública."],
      image: "/images/priorities/law-enforcement.jpg",
      imageAlt: "Insignia y escudo de policía",
    },
    {
      title: "Prohibir material sexualmente explícito en escuelas y espectáculos para adultos frente a menores",
      bullets: ["Mantener contenido inapropiado fuera de los espacios infantiles.", "Defender el derecho de los padres a proteger a sus hijos."],
      image: "/images/priorities/protect-children.jpg",
      imageAlt: "Libros y escudo de protección infantil",
    }
  ]
};

export const endorsements = [
  { name: "Governor Greg Abbott", logo: "/assets/endorsements/greg-abbott-placeholder.png", category: "major" },
  { name: "Texas Homeschool Coalition", logo: "/assets/endorsements/tx-homeschool-placeholder.png", category: "community" },
  { name: "San Antonio Voter Guide PAC", logo: "/assets/endorsements/sa-voter-guide-placeholder.png", category: "grassroots" }
];

export const donateCopyPath = (locale: Locale) => `/content/${locale}/donate.mdx`;
