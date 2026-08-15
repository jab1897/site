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
      title: "Lower the Cost of Living for Families Across District 118",
      bullets: [
        "Fight rising prices on groceries, gas, utilities, insurance, and everyday essentials.",
        "Keep Texas the strongest economy in America so working families can get ahead.",
        "Support policies that create good jobs and protect the paychecks families work hard to earn."
      ],
      image: "/images/family/walking-away.jpg",
      imageAlt: "A Texas family walking together, representing working families getting ahead",
    },
    {
      title: "Criminals Off the Street",
      bullets: [
        "Keep violent criminals off our streets and out of our communities.",
        "Back law enforcement with the resources and support needed to stop dangerous offenders.",
        "Put victims, families, and neighborhood safety first."
      ],
      image: "/images/priorities/law-enforcement.jpg",
      imageAlt: "Smiling police officer talking with a family in a neighborhood",
    },
    {
      title: "Protecting Kids from Fentanyl",
      bullets: [
        "Lead the fight to get deadly fentanyl off our streets and away from our children.",
        "Give law enforcement the tools to target fentanyl dealers and traffickers.",
        "Expand prevention and awareness so families understand the danger before tragedy strikes."
      ],
      image: "/images/priorities/protect-children.jpg",
      imageAlt: "Two young students with backpacks walking to school holding hands",
    },
    {
      title: "Cutting Property Taxes",
      bullets: [
        "Stop local bureaucrats from driving property taxes higher year after year.",
        "Bring down property tax rates so families can keep more of what they earn.",
        "Protect homeowners from being taxed out of the homes they already own."
      ],
      image: "/images/priorities/property-taxes.jpg",
      imageAlt: "Texas home and tax tag graphic for lower property taxes",
    },
    {
      title: "Banning Men from Competing Against Girls",
      bullets: [
        "Ban men from competing in girls' sports.",
        "Protect fair competition and athletic opportunities for girls.",
        "Keep girls' sports for girls."
      ],
      image: "/images/priorities/faith-family.jpg",
      imageAlt: "Texas flag inspired graphic representing Texas values",
    },
    {
      title: "Teacher Pay Raises",
      bullets: [
        "Raise pay for public school librarians, counselors, nurses, and teachers.",
        "Put more education dollars into the people who work directly with students.",
        "Make Texas a place where great educators can build a career and stay in our schools."
      ],
      image: "/images/priorities/classroom.jpg",
      imageAlt: "Teacher reading to students at desks in a classroom with an American flag",
    }
  ],
  es: [
    {
      title: "Bajar el Costo de Vida para las Familias del Distrito 118",
      bullets: [
        "Luchar contra el alza de precios en la despensa, la gasolina, los servicios, el seguro y los gastos diarios.",
        "Mantener a Texas como la economía más fuerte del país para que las familias trabajadoras salgan adelante.",
        "Apoyar políticas que generen buenos empleos y protejan el cheque que tanto cuesta ganar."
      ],
      image: "/images/family/walking-away.jpg",
      imageAlt: "Una familia de Texas caminando junta, que representa a las familias trabajadoras saliendo adelante",
    },
    {
      title: "Sacar a los Criminales de Nuestras Calles",
      bullets: [
        "Mantener a los criminales violentos fuera de nuestras calles y comunidades.",
        "Respaldar a la policía con los recursos y el apoyo que necesita para detener a delincuentes peligrosos.",
        "Poner primero a las víctimas, las familias y la seguridad de nuestros vecindarios."
      ],
      image: "/images/priorities/law-enforcement.jpg",
      imageAlt: "Oficial de policía sonriendo mientras conversa con una familia",
    },
    {
      title: "Proteger a Nuestros Hijos del Fentanilo",
      bullets: [
        "Liderar la lucha para sacar el fentanilo mortal de nuestras calles y mantenerlo lejos de nuestros hijos.",
        "Dar a la policía las herramientas para perseguir a quienes venden y trafican fentanilo.",
        "Ampliar la prevención y la información para que las familias conozcan el peligro antes de que ocurra una tragedia."
      ],
      image: "/images/priorities/protect-children.jpg",
      imageAlt: "Dos estudiantes con mochilas caminando a la escuela tomados de la mano",
    },
    {
      title: "Reducir los Impuestos a la Propiedad",
      bullets: [
        "Detener a los burócratas locales que año tras año hacen subir los impuestos a la propiedad.",
        "Reducir las tasas de impuestos a la propiedad para que las familias conserven más de lo que ganan.",
        "Proteger a los propietarios para que los impuestos no los obliguen a perder la casa que ya tienen."
      ],
      image: "/images/priorities/property-taxes.jpg",
      imageAlt: "Casa de Texas y etiqueta fiscal",
    },
    {
      title: "Prohibir que los Hombres Compitan en Deportes Femeninos",
      bullets: [
        "Prohibir que los hombres compitan en deportes femeninos.",
        "Proteger la competencia justa y las oportunidades deportivas para las niñas y jóvenes.",
        "Mantener los deportes femeninos para las mujeres y las niñas."
      ],
      image: "/images/priorities/faith-family.jpg",
      imageAlt: "Gráfico inspirado en la bandera de Texas que representa los valores de Texas",
    },
    {
      title: "Aumentar el Sueldo de los Maestros",
      bullets: [
        "Aumentar el sueldo de maestros, bibliotecarios, consejeros y enfermeras de las escuelas públicas.",
        "Poner más recursos educativos en las personas que trabajan directamente con los estudiantes.",
        "Hacer de Texas un estado donde los buenos educadores puedan hacer carrera y quedarse en nuestras escuelas."
      ],
      image: "/images/priorities/classroom.jpg",
      imageAlt: "Maestra leyendo a estudiantes en un salón de clases con bandera estadounidense",
    }
  ]
};

export const donateCopyPath = (locale: Locale) => `/content/${locale}/donate.mdx`;
