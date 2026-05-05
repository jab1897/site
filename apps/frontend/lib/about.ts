import { Locale } from "./i18n";

export type AboutContent = {
  intro: string;
  caption1: string;
  para1: string;
  para2: string;
  caption2: string;
  para3: string;
  caption3: string;
  para4: string;
  faith: string;
  tppf: string;
  caption4: string;
  schoolsPara: string;
  accountabilityPara: string;
  policyPara: string;
  valuesPara: string;
  motivationPara: string;
  leadershippara: string;
  overlayText: string;
  callPara: string;
  closingLine: string;
};

const content: Record<Locale, AboutContent> = {
  en: {
    intro:
      "Jorge Borrego's story is rooted in resilience, faith, and an unshakable belief in the promise of Texas.",
    caption1: "From the very beginning, Jorge learned to fight for a better future.",
    para1:
      "Raised in difficult circumstances, Jorge understands firsthand what it means to fight for opportunity. With a father incarcerated and an unstable home environment, he grew up surrounded by challenges that could have defined his future. Instead, they strengthened his resolve. Through discipline, faith, and hard work, Jorge became the first in his family to graduate from college, breaking a cycle and building a new foundation for his own family.",
    para2:
      "At 18 years old, Jorge moved to San Antonio to attend The University of Texas at San Antonio. UTSA was more than a university to him. It was a turning point. He earned a Bachelor's degree in Mathematics, sharpening the analytical thinking and problem solving skills that now guide his approach to public policy and fiscal responsibility.",
    caption2:
      "UTSA was a turning point that shaped Jorge his discipline and direction. Where he found the love of his life.",
    para3:
      "While at UTSA, he met the woman who would become his wife, a fifth generation San Antonian whose family roots run deep in this community. Together, they chose to build their life here and raise their children in the city they love.",
    caption3: "Faith, family, and traditional values are at the root of Jorge and Lexie's marriage.",
    para4: "San Antonio became home.",
    faith:
      "Jorge's Catholic faith shapes his worldview and anchors his priorities. It informs his belief in the dignity of every person, the importance of strong families, and the responsibility to serve others before oneself. Faith is not a slogan for Jorge. It is a daily guide that influences how he leads, how he treats people, and how he approaches public service.",
    tppf:
      "After college, Jorge dedicated his career to advancing conservative policy that expands opportunity and protects working families. At the Texas Public Policy Foundation, he played a key role in passing the largest school choice program in the nation's history. Since its launch, over 100,000 Texas families have applied for the program, demonstrating overwhelming demand for educational freedom and parental empowerment.",
    caption4:
      "Results matter. Parents deserve the freedom to choose the best path for their children.",
    schoolsPara:
      "Jorge believes in strong public schools, but he also believes parents deserve the ability to choose the best educational path for their children.",
    accountabilityPara:
      "His work strengthened accountability in public education while expanding opportunity for families who felt unheard or overlooked. For Jorge, education reform is deeply personal. He knows what it means to need a better path forward.",
    policyPara:
      "Throughout his policy career, Jorge has championed parental rights, government transparency, fiscal discipline, and responsible budgeting. He believes taxpayer dollars should be respected and that families struggling with rising property taxes deserve real relief. In House District 118, where many families are working hard to make ends meet, Jorge understands that economic stability is not theoretical. It is about keeping your home, growing your small business, and building a future for your children.",
    valuesPara:
      "Jorge stands firmly for protecting Second Amendment rights, backing local law enforcement, securing the border, defending life, and keeping inappropriate materials out of classrooms. He believes Texas must remain a state where faith, freedom, and family are protected rather than undermined. At the same time, he recognizes that San Antonio voters expect practical solutions that improve daily life, strengthen neighborhoods, and create real opportunity.",
    motivationPara:
      "As a husband and father, Jorge's motivation is simple. He wants his children and every child in San Antonio to grow up in a safe community, attend strong schools, and inherit a Texas that is freer and more prosperous than the one we have today.",
    leadershippara:
      "Jorge Borrego represents a new generation of leadership grounded in principle and prepared to govern. He did not inherit influence or political power. He earned his way forward through hard work, faith, and perseverance. He is running to serve the people of House District 118, not special interests, not insiders, and not career politicians.",
    overlayText: "Faith, family, and work define our mission.",
    callPara:
      "For Jorge, public service is a calling rooted in gratitude for the opportunities Texas gave him.",
    closingLine: "And he is ready to fight for yours."
  },

  es: {
    intro:
      "La historia de Jorge Borrego está arraigada en la resiliencia, la fe y una convicción inquebrantable en las oportunidades que ofrece Texas.",
    caption1: "Desde el principio, Jorge aprendió a luchar por un futuro mejor.",
    para1:
      "Criado en circunstancias difíciles, Jorge entiende de primera mano lo que significa luchar por una oportunidad. Con su padre encarcelado y un entorno familiar inestable, creció rodeado de desafíos que podrían haber marcado su futuro. En cambio, lo fortalecieron. A través de la disciplina, la fe y el trabajo arduo, Jorge fue el primero de su familia en graduarse de la universidad, rompiendo un ciclo y construyendo una nueva base para su propia familia.",
    para2:
      "A los 18 años, Jorge se mudó a San Antonio para asistir a la Universidad de Texas en San Antonio. La UTSA fue más que una universidad para él. Fue un punto de inflexión. Obtuvo una licenciatura en Matemáticas, desarrollando el pensamiento analítico y la capacidad para resolver problemas que ahora guían su enfoque hacia las políticas públicas y la responsabilidad fiscal.",
    caption2:
      "La UTSA fue un punto de inflexión que marcó la disciplina y el rumbo de Jorge. Donde encontró al amor de su vida.",
    para3:
      "Mientras cursaba sus estudios en la UTSA, conoció a quien se convertiría en su esposa, una sanantoniense de quinta generación cuyas raíces familiares están profundamente arraigadas en esta comunidad. Juntos decidieron construir su vida aquí y criar a sus hijos en la ciudad que aman.",
    caption3: "La fe, la familia y los valores tradicionales son la base del matrimonio de Jorge y Lexie.",
    para4: "San Antonio se convirtió en su hogar.",
    faith:
      "La fe católica de Jorge moldea su visión del mundo y ancla sus prioridades. Le informa su creencia en la dignidad de cada persona, la importancia de familias sólidas y la responsabilidad de servir a los demás antes que a uno mismo. La fe no es un eslogan para Jorge. Es una guía diaria que influye en cómo lidera, cómo trata a las personas y cómo aborda el servicio público.",
    tppf:
      "Después de la universidad, Jorge dedicó su carrera a promover políticas conservadoras que amplían las oportunidades y protegen a las familias trabajadoras. En la Fundación de Políticas Públicas de Texas, desempeñó un papel clave en la aprobación del programa de elección de escuelas más grande en la historia del país. Desde su lanzamiento, más de 100,000 familias texanas han solicitado el programa, lo que demuestra una demanda abrumadora de libertad educativa y empoderamiento de los padres.",
    caption4:
      "Los resultados importan. Los padres merecen la libertad de elegir el mejor camino para sus hijos.",
    schoolsPara:
      "Jorge cree en escuelas públicas sólidas, pero también cree que los padres merecen la capacidad de elegir el mejor camino educativo para sus hijos.",
    accountabilityPara:
      "Su trabajo fortaleció la rendición de cuentas en la educación pública mientras expandía las oportunidades para las familias que se sentían ignoradas. Para Jorge, la reforma educativa es algo muy personal. Él sabe lo que significa necesitar un mejor camino hacia adelante.",
    policyPara:
      "A lo largo de su carrera en políticas públicas, Jorge ha defendido los derechos de los padres, la transparencia gubernamental, la disciplina fiscal y la elaboración de presupuestos responsables. Cree que los fondos de los contribuyentes deben respetarse y que las familias que luchan con el aumento de los impuestos sobre la propiedad merecen un alivio real. En el Distrito 118, donde muchas familias trabajan arduamente para llegar a fin de mes, Jorge entiende que la estabilidad económica no es teórica. Se trata de conservar su hogar, hacer crecer su pequeño negocio y construir un futuro para sus hijos.",
    valuesPara:
      "Jorge defiende firmemente la protección de los derechos de la Segunda Enmienda, el apoyo a los cuerpos de seguridad locales, la seguridad fronteriza, la defensa de la vida y la exclusión de materiales inapropiados en las aulas. Cree que Texas debe seguir siendo un estado donde la fe, la libertad y la familia sean protegidas, no socavadas. Al mismo tiempo, reconoce que los votantes de San Antonio esperan soluciones prácticas que mejoren la vida diaria, fortalezcan los vecindarios y creen oportunidades reales.",
    motivationPara:
      "Como esposo y padre, la motivación de Jorge es sencilla. Quiere que sus hijos y todos los niños de San Antonio crezcan en una comunidad segura, asistan a buenas escuelas y hereden un Texas más libre y próspero que el que tenemos hoy.",
    leadershippara:
      "Jorge Borrego representa una nueva generación de liderazgo fundamentado en principios y preparado para gobernar. No heredó influencia ni poder político. Se abrió camino a través del trabajo arduo, la fe y la perseverancia. Se postula para servir al pueblo del Distrito 118. No a intereses especiales, no a grupos de poder en Austin, y no a políticos de carrera.",
    overlayText: "La fe, la familia y el trabajo definen nuestra misión.",
    callPara:
      "Para Jorge, el servicio público es un llamado arraigado en la gratitud por las oportunidades que Texas le brindó.",
    closingLine: "Y está listo para luchar por las de usted."
  }
};

export function getAboutContent(locale: Locale): AboutContent {
  return content[locale];
}
