import { Locale } from "./i18n";

export type AboutContent = {
  para1: string;
  caption1: string;
  para2: string;
  caption2: string;
  para3: string;
  caption3: string;
  para4: string;
  caption4: string;
  para5: string;
  overlayText: string;
};

const content: Record<Locale, AboutContent> = {
  en: {
    para1:
      "Jorge Borrego knows what it means to start with little and build something through faith, work, and sacrifice.",
    caption1: "From the very beginning, Jorge learned to fight for a better future.",
    para2:
      "Raised in El Paso, Jorge grew up in a working-class family that knew hard times firsthand. When his father was incarcerated, his family faced instability, eviction, and the kind of uncertainty too many families quietly carry. His mother worked long hours to hold the family together, and Jorge never forgot the sacrifices she made so he could have a chance at a better life.",
    caption2: "UTSA was a turning point — where Jorge found his direction and the love of his life.",
    para3:
      "Education helped open that door. Jorge worked his way through the University of Texas at San Antonio, becoming the first in his family to graduate from college. He later earned a graduate degree in public policy and built a career fighting for stronger schools, lower taxes, better career opportunities, and more accountable government across Texas.",
    caption3: "Faith, family, and Texas values are at the root of Jorge and Lexie's marriage.",
    para4:
      "Today, Jorge is a husband, father, small business owner, licensed real estate professional, and Republican candidate for Texas House District 118. He is running because he knows what rising costs, unsafe neighborhoods, weak schools, and unaccountable government can do to families who are already working as hard as they can.",
    caption4: "Jorge is fighting for stronger schools and more opportunity for every family.",
    para5:
      "Jorge is fighting for the families of District 118 — not Austin insiders, not taxpayer-funded lobbyists, and not political operatives. His focus is simple: lower costs, safer communities, stronger schools, and a fair shot for every family willing to work for a better future.",
    overlayText: "Faith, family, and work define our mission."
  },

  es: {
    para1:
      "Jorge Borrego sabe lo que significa empezar con poco y construir algo a través de la fe, el trabajo y el sacrificio.",
    caption1: "Desde el principio, Jorge aprendió a luchar por un futuro mejor.",
    para2:
      "Criado en El Paso, Jorge creció en una familia trabajadora que conoció tiempos difíciles de cerca. Cuando encarcelaron a su padre, su familia enfrentó inestabilidad, desalojos y la clase de incertidumbre que muchas familias cargan en silencio. Su madre trabajó largas horas para mantener unida a la familia, y Jorge nunca olvidó los sacrificios que ella hizo para darle la oportunidad de una vida mejor.",
    caption2: "La UTSA fue un punto de inflexión, donde Jorge encontró su rumbo y al amor de su vida.",
    para3:
      "La educación abrió esa puerta. Jorge trabajó para pagar sus estudios en la Universidad de Texas en San Antonio, convirtiéndose en el primero de su familia en graduarse de la universidad. Más tarde obtuvo una maestría en políticas públicas y construyó una carrera luchando por escuelas más fuertes, impuestos más bajos, mejores oportunidades laborales y un gobierno más responsable en todo Texas.",
    caption3: "La fe, la familia y los valores de Texas son la base del matrimonio de Jorge y Lexie.",
    para4:
      "Hoy, Jorge es esposo, padre, dueño de un negocio propio, profesional de bienes raíces con licencia y candidato Republicano para la Cámara de Representantes de Texas, Distrito 118. Se postula porque sabe lo que el alza de costos, la inseguridad, las escuelas débiles y un gobierno irresponsable le pueden hacer a familias que ya trabajan tan duro como pueden.",
    caption4: "Jorge lucha por escuelas más fuertes y más oportunidades para cada familia.",
    para5:
      "Jorge lucha por las familias del Distrito 118, no por los intereses de Austin, los lobbyistas pagados con nuestros impuestos ni los operadores políticos. Su enfoque es simple: bajar los costos, comunidades más seguras, escuelas más fuertes y una oportunidad justa para cada familia dispuesta a trabajar por un mejor futuro.",
    overlayText: "La fe, la familia y el trabajo definen nuestra misión."
  }
};

export function getAboutContent(locale: Locale): AboutContent {
  return content[locale];
}
