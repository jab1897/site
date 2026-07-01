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
      title: "Cut Your Property Taxes for Good",
      bullets: [
        "Increase the homestead exemption so more of your home's value is protected from taxation.",
        "Cap runaway appraisal increases so families are not taxed out of homes they already own.",
        "Hold local governments accountable when their spending drives tax bills higher."
      ],
      image: "/images/priorities/property-taxes.jpg",
      imageAlt: "Texas home and tax tag graphic for lower property taxes",
    },
    {
      title: "Keep Repeat Violent Criminals Off Our Streets",
      bullets: [
        "Keep repeat violent offenders behind bars, not back on the street to commit more crimes.",
        "Back law enforcement with the resources, training, and public support they need.",
        "Put victims, families, and neighborhood safety ahead of soft-on-crime politics."
      ],
      image: "/images/priorities/law-enforcement.jpg",
      imageAlt: "Smiling police officer talking with a family in a neighborhood",
    },
    {
      title: "Fund Public Schools, Reward Great Teachers, and Expand Career Training",
      bullets: [
        "Reward great teachers with higher pay and make sure education dollars reach the classroom.",
        "Expand career training and apprenticeship programs so students graduate ready for good jobs with less debt.",
        "Support strong public schools while giving parents more options when their child needs something different.",
        "Keep age-inappropriate content out of classrooms and defend parents' right to set standards for their children."
      ],
      image: "/images/priorities/classroom.jpg",
      imageAlt: "Teacher reading to students at desks in a classroom with an American flag",
    },
    {
      title: "Protect Children Online",
      bullets: [
        "Limit children's access to harmful social media content.",
        "Increase penalties for online predators who target Texas kids.",
        "Support school safety upgrades so students can learn in secure classrooms."
      ],
      image: "/images/priorities/protect-children.jpg",
      imageAlt: "Two young students with backpacks walking to school holding hands",
    },
    {
      title: "Secure the Border and Keep Texas Communities Safe",
      bullets: [
        "Support technology and resources that help secure the Texas border.",
        "Remove criminals who have no legal right to be here.",
        "Treat border security as part of protecting families, neighborhoods, and taxpayers."
      ],
      image: "/images/issues/border-wall.jpg",
      imageAlt: "Steel border wall stretching across the Texas desert toward the horizon at sunset",
    },
    {
      title: "Make Government Listen to Texans, Not Taxpayer-Funded Lobbyists",
      bullets: [
        "End the practice of forcing taxpayers to fund lobbyists who lobby against the people paying the bills.",
        "Make public dollars serve families first, not Austin insiders.",
        "Increase transparency so taxpayers know who is influencing their government."
      ],
      image: "/images/priorities/lobbyists.jpg",
      imageAlt: "Capitol dome and document representing government accountability",
    },
    {
      title: "Faith, Family, and Texas Values",
      bullets: [
        "Protect faith, family, personal responsibility, and the values that hold strong communities together.",
        "Defend the right of law-abiding Texans to keep and bear arms.",
        "Stand with parents, taxpayers, law enforcement, and working families across District 118."
      ],
      image: "/images/priorities/faith-family.jpg",
      imageAlt: "Texas flag inspired graphic representing faith, family, and Texas values",
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
      title: "Reducir los Impuestos a la Propiedad de Forma Permanente",
      bullets: [
        "Aumentar la exención de vivienda familiar para proteger más el valor de su casa.",
        "Limitar los aumentos desmedidos en las valuaciones para que las familias no pierdan la casa que ya tienen.",
        "Hacer responsables a los gobiernos locales cuando su gasto excesivo sube la factura de impuestos."
      ],
      image: "/images/priorities/property-taxes.jpg",
      imageAlt: "Casa de Texas y etiqueta fiscal",
    },
    {
      title: "Mantener a los Criminales Violentos Reincidentes Fuera de Nuestras Calles",
      bullets: [
        "Mantener tras las rejas a los delincuentes violentos reincidentes, no de vuelta en la calle.",
        "Respaldar a la policía con los recursos, la capacitación y el apoyo que merece.",
        "Poner a las víctimas, las familias y la seguridad del vecindario antes que la política blanda contra el crimen."
      ],
      image: "/images/priorities/law-enforcement.jpg",
      imageAlt: "Oficial de policía sonriendo mientras conversa con una familia",
    },
    {
      title: "Financiar Nuestras Escuelas Públicas, Premiar a los Buenos Maestros y Expandir la Capacitación Laboral",
      bullets: [
        "Premiar a los mejores maestros con mejor salario y asegurar que el dinero llegue al salón de clases.",
        "Expandir los programas de capacitación laboral y aprendizaje para que los estudiantes se gradúen listos para un buen trabajo, con menos deuda.",
        "Apoyar escuelas públicas fuertes y, al mismo tiempo, dar a los padres más opciones cuando su hijo necesite algo diferente.",
        "Mantener fuera de las aulas el contenido inapropiado para la edad y defender el derecho de los padres a poner las normas para sus hijos."
      ],
      image: "/images/priorities/classroom.jpg",
      imageAlt: "Maestra leyendo a estudiantes en un salón de clases con bandera estadounidense",
    },
    {
      title: "Proteger a Nuestros Hijos en Internet",
      bullets: [
        "Limitar el acceso de los niños a contenido dañino en las redes sociales.",
        "Aumentar las penas para los depredadores en línea que buscan dañar a los niños de Texas.",
        "Apoyar mejoras de seguridad escolar para que los estudiantes aprendan en aulas seguras."
      ],
      image: "/images/priorities/protect-children.jpg",
      imageAlt: "Dos estudiantes con mochilas caminando a la escuela tomados de la mano",
    },
    {
      title: "Asegurar la Frontera y Mantener Seguras a las Comunidades de Texas",
      bullets: [
        "Apoyar la tecnología y los recursos que ayudan a asegurar la frontera de Texas.",
        "Sacar de nuestras calles a los criminales que no tienen derecho legal a estar aquí.",
        "Tratar la seguridad fronteriza como parte de proteger a las familias, los vecindarios y a los contribuyentes."
      ],
      image: "/images/issues/border-wall.jpg",
      imageAlt: "Muro fronterizo de acero extendiéndose por el desierto de Texas hacia el horizonte al atardecer",
    },
    {
      title: "Hacer que el Gobierno Escuche a los Texanos, No a los Lobbyistas Pagados con Nuestros Impuestos",
      bullets: [
        "Terminar con la práctica de obligar a los contribuyentes a pagar lobbyistas que trabajan en contra de quienes pagan la cuenta.",
        "Asegurar que el dinero público sirva primero a las familias, no a los intereses de Austin.",
        "Aumentar la transparencia para que los contribuyentes sepan quién influye en su gobierno."
      ],
      image: "/images/priorities/lobbyists.jpg",
      imageAlt: "Cúpula del capitolio y documento que representan rendición de cuentas",
    },
    {
      title: "Fe, Familia y Valores de Texas",
      bullets: [
        "Proteger la fe, la familia, la responsabilidad personal y los valores que mantienen unidas a nuestras comunidades.",
        "Defender el derecho de los texanos que respetan la ley a poseer y portar armas.",
        "Respaldar a los padres, los contribuyentes, la policía y las familias trabajadoras en todo el Distrito 118."
      ],
      image: "/images/priorities/faith-family.jpg",
      imageAlt: "Gráfico inspirado en la bandera de Texas que representa la fe, la familia y los valores de Texas",
    }
  ]
};

export const donateCopyPath = (locale: Locale) => `/content/${locale}/donate.mdx`;
