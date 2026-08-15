import { Locale } from "./i18n";

export type PriorityItem = {
  title: string;
  /** Short, scannable bullets used on the homepage priority cards. */
  homepageBullets: string[];
  /** Fuller policy-brief bullets used on the issues page. */
  issuesBullets: string[];
  image: string;
  imageAlt: string;
};

export const priorities: Record<Locale, PriorityItem[]> = {
  en: [
    {
      title: "Lower the Cost of Living for Families Across District 118",
      homepageBullets: [
        "Fight rising prices on groceries, gas, utilities, insurance, and everyday essentials.",
        "Keep Texas the strongest economy in America so working families can get ahead.",
        "Support policies that create good jobs and protect the paychecks families work hard to earn."
      ],
      issuesBullets: [
        "Fight rising prices on groceries, gas, utilities, insurance, and other everyday essentials that are putting pressure on working families.",
        "Support policies that grow good-paying jobs, expand opportunity, and help families keep more of what they earn.",
        "Reduce the burden government places on families and small businesses so South Texans can get ahead instead of just getting by.",
        "Keep Texas economically strong so House District 118 remains a place where hard work still leads to opportunity."
      ],
      image: "/images/family/walking-away.jpg",
      imageAlt: "A Texas family walking together, representing working families getting ahead",
    },
    {
      title: "Criminals Off the Street",
      homepageBullets: [
        "Keep violent criminals off our streets and out of our communities.",
        "Back law enforcement with the resources and support needed to stop dangerous offenders.",
        "Put victims, families, and neighborhood safety first."
      ],
      issuesBullets: [
        "Keep violent criminals off our streets and out of our communities by backing laws that prioritize public safety over leniency for dangerous offenders.",
        "Support law enforcement with the tools, staffing, and cooperation they need to arrest repeat offenders and protect our neighborhoods.",
        "Stand with victims and law-abiding families by making sure public safety decisions put communities first.",
        "Fight for a justice system that protects innocent families, strengthens neighborhood security, and holds violent criminals accountable."
      ],
      image: "/images/priorities/law-enforcement.jpg",
      imageAlt: "Smiling police officer talking with a family in a neighborhood",
    },
    {
      title: "Protecting Kids from Fentanyl",
      homepageBullets: [
        "Lead the fight to get deadly fentanyl off our streets and away from our children.",
        "Give law enforcement the tools to target fentanyl dealers and traffickers.",
        "Expand prevention and awareness so families understand the danger before tragedy strikes."
      ],
      issuesBullets: [
        "Lead the fight to get deadly fentanyl off our streets and away from our children before more families suffer preventable tragedy.",
        "Support stronger enforcement against traffickers and dealers who profit from poisoning our communities.",
        "Increase coordination between law enforcement, schools, and community institutions so families are better protected and better informed.",
        "Promote education and prevention efforts so parents and students understand how deadly fentanyl is, even in extremely small amounts."
      ],
      image: "/images/priorities/protect-children.jpg",
      imageAlt: "Two young students with backpacks walking to school holding hands",
    },
    {
      title: "Cutting Property Taxes",
      homepageBullets: [
        "Stop local bureaucrats from driving property taxes higher year after year.",
        "Bring down property tax rates so families can keep more of what they earn.",
        "Protect homeowners from being taxed out of the homes they already own."
      ],
      issuesBullets: [
        "Stop local bureaucrats from driving property taxes higher year after year through unchecked spending and higher appraisals.",
        "Bring down property tax rates so families, seniors, and homeowners can keep more of the money they work hard to earn.",
        "Protect homeowners from being taxed out of the homes they already own.",
        "Support lasting property tax relief, not temporary political fixes, so taxpayers can count on real long-term savings."
      ],
      image: "/images/priorities/property-taxes.jpg",
      imageAlt: "Texas home and tax tag graphic for lower property taxes",
    },
    {
      title: "Banning Men from Competing Against Girls",
      homepageBullets: [
        "Ban men from competing in girls' sports.",
        "Protect fair competition and athletic opportunities for girls.",
        "Keep girls' sports for girls."
      ],
      issuesBullets: [
        "Support banning biological males from competing in girls' sports in order to protect fairness, safety, and equal opportunity.",
        "Defend the integrity of girls' athletics so female students are not forced to lose playing time, recognition, scholarships, or competitive opportunities.",
        "Protect the right of girls to compete on a level playing field.",
        "Stand for common-sense policies that keep girls' sports for girls."
      ],
      image: "/images/priorities/girls-basketball.svg",
      imageAlt: "Girls' high school basketball team huddling together on the court in their gym",
    },
    {
      title: "Teacher Pay Raises",
      homepageBullets: [
        "Raise pay for public school librarians, counselors, nurses, and teachers.",
        "Put more education dollars into the people who work directly with students.",
        "Make Texas a place where great educators can build a career and stay in our schools."
      ],
      issuesBullets: [
        "Support pay raises for public school teachers, librarians, counselors, nurses, and other school professionals who serve students every day.",
        "Make sure more education dollars reach the classroom and the people doing the actual work of educating and supporting children.",
        "Help Texas recruit and retain strong educators by making our schools places where talented professionals can build a lasting career.",
        "Recognize that stronger schools begin with supporting the people who work directly with students."
      ],
      image: "/images/priorities/classroom.jpg",
      imageAlt: "Teacher reading to students at desks in a classroom with an American flag",
    }
  ],
  es: [
    {
      title: "Bajar el Costo de Vida para las Familias del Distrito 118",
      homepageBullets: [
        "Luchar contra el alza de precios en la despensa, la gasolina, los servicios, el seguro y los gastos diarios.",
        "Mantener a Texas como la economía más fuerte del país para que las familias trabajadoras salgan adelante.",
        "Apoyar políticas que generen buenos empleos y protejan el cheque que tanto cuesta ganar."
      ],
      issuesBullets: [
        "Luchar contra el alza de precios en la despensa, la gasolina, los servicios públicos, el seguro y otros gastos diarios que presionan a las familias trabajadoras.",
        "Apoyar políticas que generen empleos bien pagados, amplíen las oportunidades y ayuden a las familias a conservar más de lo que ganan.",
        "Reducir la carga que el gobierno impone a las familias y a los pequeños negocios para que el sur de Texas pueda salir adelante y no solo sobrevivir.",
        "Mantener a Texas económicamente fuerte para que el Distrito 118 siga siendo un lugar donde el trabajo duro todavía abre oportunidades."
      ],
      image: "/images/family/walking-away.jpg",
      imageAlt: "Una familia de Texas caminando junta, que representa a las familias trabajadoras saliendo adelante",
    },
    {
      title: "Sacar a los Criminales de Nuestras Calles",
      homepageBullets: [
        "Mantener a los criminales violentos fuera de nuestras calles y comunidades.",
        "Respaldar a la policía con los recursos y el apoyo que necesita para detener a delincuentes peligrosos.",
        "Poner primero a las víctimas, las familias y la seguridad de nuestros vecindarios."
      ],
      issuesBullets: [
        "Mantener a los criminales violentos fuera de nuestras calles y comunidades, respaldando leyes que ponen la seguridad pública por encima de la indulgencia con delincuentes peligrosos.",
        "Apoyar a la policía con las herramientas, el personal y la cooperación que necesita para arrestar a delincuentes reincidentes y proteger nuestros vecindarios.",
        "Estar del lado de las víctimas y de las familias que respetan la ley, asegurando que las decisiones de seguridad pública pongan primero a nuestras comunidades.",
        "Luchar por un sistema de justicia que proteja a las familias inocentes, fortalezca la seguridad de los vecindarios y haga responsables a los criminales violentos."
      ],
      image: "/images/priorities/law-enforcement.jpg",
      imageAlt: "Oficial de policía sonriendo mientras conversa con una familia",
    },
    {
      title: "Proteger a Nuestros Hijos del Fentanilo",
      homepageBullets: [
        "Liderar la lucha para sacar el fentanilo mortal de nuestras calles y mantenerlo lejos de nuestros hijos.",
        "Dar a la policía las herramientas para perseguir a quienes venden y trafican fentanilo.",
        "Ampliar la prevención y la información para que las familias conozcan el peligro antes de que ocurra una tragedia."
      ],
      issuesBullets: [
        "Liderar la lucha para sacar el fentanilo mortal de nuestras calles y mantenerlo lejos de nuestros hijos, antes de que más familias sufran una tragedia evitable.",
        "Apoyar una aplicación más firme de la ley contra los traficantes y vendedores que se lucran envenenando a nuestras comunidades.",
        "Aumentar la coordinación entre la policía, las escuelas y las instituciones comunitarias para que las familias estén mejor protegidas y mejor informadas.",
        "Promover la educación y la prevención para que padres y estudiantes entiendan lo mortal que es el fentanilo, incluso en cantidades pequeñísimas."
      ],
      image: "/images/priorities/protect-children.jpg",
      imageAlt: "Dos estudiantes con mochilas caminando a la escuela tomados de la mano",
    },
    {
      title: "Reducir los Impuestos a la Propiedad",
      homepageBullets: [
        "Detener a los burócratas locales que año tras año hacen subir los impuestos a la propiedad.",
        "Reducir las tasas de impuestos a la propiedad para que las familias conserven más de lo que ganan.",
        "Proteger a los propietarios para que los impuestos no los obliguen a perder la casa que ya tienen."
      ],
      issuesBullets: [
        "Detener a los burócratas locales que año tras año hacen subir los impuestos a la propiedad con gastos sin control y valuaciones más altas.",
        "Reducir las tasas de impuestos a la propiedad para que las familias, los adultos mayores y los propietarios conserven más del dinero que tanto les cuesta ganar.",
        "Proteger a los propietarios para que los impuestos no los obliguen a perder la casa que ya tienen.",
        "Apoyar un alivio duradero en los impuestos a la propiedad, no arreglos políticos temporales, para que los contribuyentes cuenten con ahorros reales a largo plazo."
      ],
      image: "/images/priorities/property-taxes.jpg",
      imageAlt: "Casa de Texas y etiqueta fiscal",
    },
    {
      title: "Prohibir que los Hombres Compitan en Deportes Femeninos",
      homepageBullets: [
        "Prohibir que los hombres compitan en deportes femeninos.",
        "Proteger la competencia justa y las oportunidades deportivas para las niñas y jóvenes.",
        "Mantener los deportes femeninos para las mujeres y las niñas."
      ],
      issuesBullets: [
        "Apoyar la prohibición de que los hombres biológicos compitan en deportes femeninos, para proteger la justicia, la seguridad y la igualdad de oportunidades.",
        "Defender la integridad del atletismo femenino para que las estudiantes no pierdan tiempo de juego, reconocimientos, becas ni oportunidades de competir.",
        "Proteger el derecho de las niñas y jóvenes a competir en igualdad de condiciones.",
        "Defender políticas de sentido común que mantengan los deportes femeninos para las mujeres y las niñas."
      ],
      image: "/images/priorities/girls-basketball.svg",
      imageAlt: "Equipo femenino de baloncesto de preparatoria reunido en la cancha de su gimnasio",
    },
    {
      title: "Aumentar el Sueldo de los Maestros",
      homepageBullets: [
        "Aumentar el sueldo de maestros, bibliotecarios, consejeros y enfermeras de las escuelas públicas.",
        "Poner más recursos educativos en las personas que trabajan directamente con los estudiantes.",
        "Hacer de Texas un estado donde los buenos educadores puedan hacer carrera y quedarse en nuestras escuelas."
      ],
      issuesBullets: [
        "Apoyar aumentos de sueldo para maestros, bibliotecarios, consejeros, enfermeras y demás profesionales de las escuelas públicas que sirven a los estudiantes todos los días.",
        "Asegurar que más recursos educativos lleguen al salón de clases y a las personas que realmente educan y apoyan a nuestros hijos.",
        "Ayudar a Texas a reclutar y retener buenos educadores, haciendo de nuestras escuelas lugares donde los profesionales talentosos puedan construir una carrera duradera.",
        "Reconocer que las escuelas más fuertes comienzan apoyando a las personas que trabajan directamente con los estudiantes."
      ],
      image: "/images/priorities/classroom.jpg",
      imageAlt: "Maestra leyendo a estudiantes en un salón de clases con bandera estadounidense",
    }
  ]
};

export const donateCopyPath = (locale: Locale) => `/content/${locale}/donate.mdx`;
