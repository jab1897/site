import { Locale } from "./i18n";

export type AboutContent = {
  para1: string;
  caption1: string;
  para2: string;
  para3: string;
  caption2: string;
  para4: string;
  caption3: string;
  para5: string;
  caption4: string;
  para6: string;
  overlayText: string;
};

const content: Record<Locale, AboutContent> = {
  en: {
    para1:
      "Jorge Borrego knows the American Dream is not a slogan. For his family, it was a promise worth fighting for.",
    caption1: "From the very beginning, Jorge learned to fight for a better future.",
    para2:
      "Raised in a working-class family, Jorge learned early what instability can do to a home. When his father was incarcerated, his family faced eviction, uncertainty, and the kind of hardship too many families carry quietly. His mother worked long hours to keep the family together, and Jorge never forgot what it meant to watch someone sacrifice everything so her children could have a better chance.",
    para3:
      "That experience shaped him. It taught him that strong families matter, that work matters, that faith matters, and that opportunity can change the direction of a life.",
    caption2: "UTSA was a turning point — where Jorge found his direction and the love of his life.",
    para4:
      "Education opened the door. Jorge worked his way through the University of Texas at San Antonio and became the first in his family to graduate from college. He later earned a graduate degree in public policy and built a career fighting for stronger schools, lower taxes, better career opportunities, and more accountable government across Texas.",
    caption3: "Faith, family, and Texas values are at the root of Jorge and Lexie's marriage.",
    para5:
      "Today, Jorge is a husband, father, small business owner, licensed real estate professional, and Republican candidate for Texas House District 118. He is running because he believes the promise that changed his life should still be alive for every family in Texas: if you work hard, play by the rules, and keep faith with your family, you should have a real chance to get ahead.",
    caption4: "Jorge believes the educators who serve our students deserve respect and better pay.",
    para6:
      "Jorge will carry that promise with him to Austin. He will fight to lower costs, cut property taxes, keep violent criminals off our streets, protect children from fentanyl, protect girls' sports, and raise pay for public school teachers and support staff.",
    overlayText: "Faith, family, and work define our mission."
  },

  es: {
    para1:
      "Jorge Borrego sabe que el Sueño Americano no es solo una frase. Para su familia, fue una promesa por la que valía la pena luchar.",
    caption1: "Desde el principio, Jorge aprendió a luchar por un futuro mejor.",
    para2:
      "Criado en una familia trabajadora, Jorge aprendió desde joven lo que la inestabilidad le puede hacer a un hogar. Cuando encarcelaron a su padre, su familia enfrentó desalojos, incertidumbre y la clase de dificultades que muchas familias cargan en silencio. Su madre trabajó largas horas para mantener unida a la familia, y Jorge nunca olvidó lo que significa ver a alguien sacrificarlo todo para que sus hijos tengan una mejor oportunidad.",
    para3:
      "Esa experiencia lo formó. Le enseñó que las familias fuertes importan, que el trabajo importa, que la fe importa y que una oportunidad puede cambiar el rumbo de una vida.",
    caption2: "La UTSA fue un punto de inflexión, donde Jorge encontró su rumbo y al amor de su vida.",
    para4:
      "La educación abrió esa puerta. Jorge trabajó para pagar sus estudios en la Universidad de Texas en San Antonio y se convirtió en el primero de su familia en graduarse de la universidad. Más tarde obtuvo una maestría en políticas públicas y construyó una carrera luchando por escuelas más fuertes, impuestos más bajos, mejores oportunidades laborales y un gobierno más responsable en todo Texas.",
    caption3: "La fe, la familia y los valores de Texas son la base del matrimonio de Jorge y Lexie.",
    para5:
      "Hoy, Jorge es esposo, padre, dueño de un negocio propio, profesional de bienes raíces con licencia y candidato Republicano para la Cámara de Representantes de Texas, Distrito 118. Se postula porque cree que la promesa que cambió su vida debe seguir viva para cada familia de Texas: que si trabajas duro, haces las cosas bien y mantienes la fe en tu familia, debes tener una oportunidad real de salir adelante.",
    caption4: "Jorge cree que los educadores que sirven a nuestros estudiantes merecen respeto y mejor sueldo.",
    para6:
      "Jorge llevará esa promesa con él a Austin. Luchará para bajar los costos, reducir los impuestos a la propiedad, sacar a los criminales violentos de nuestras calles, proteger a nuestros hijos del fentanilo, proteger los deportes femeninos y aumentar el sueldo de maestros y personal de apoyo de las escuelas públicas.",
    overlayText: "La fe, la familia y el trabajo definen nuestra misión."
  }
};

export function getAboutContent(locale: Locale): AboutContent {
  return content[locale];
}
