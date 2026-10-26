import { Locale } from "@/lib/i18n";

type L10n = Record<Locale, string>;

export type VideoEndorsement = {
  id: "lujan" | "maxwell";
  name: string;
  title: L10n;
  // Verbatim from the video. Spanish is a translation and is labeled as such.
  quote: L10n;
  video: string;
  poster: string;
  // width / height of the encoded video, so the player reserves the right space
  aspect: string;
  captions: L10n;
  // Captions already burned into the picture. That language's track is offered but not shown by default.
  burnedInCaptions?: Locale;
  durationLabel: string;
  transcript: Record<Locale, string[]>;
};

export const ELECTION_INFO_URL = "https://elections.bexar.gov/";

export const videoEndorsements: Record<VideoEndorsement["id"], VideoEndorsement> = {
  lujan: {
    id: "lujan",
    name: "John Lujan",
    title: {
      en: "State Representative, Texas House District 118",
      es: "Representante Estatal, Distrito 118 de la Cámara de Texas",
    },
    quote: {
      en: "“Our district in good hands would be Jorge Borrego.”",
      es: "“Nuestro distrito estaría en buenas manos con Jorge Borrego.” (traducido)",
    },
    video: "/video/endorsements/lujan.mp4",
    poster: "/images/endorsements/lujan-poster.jpg",
    aspect: "720 / 982",
    captions: {
      en: "/video/endorsements/lujan.en.vtt",
      es: "/video/endorsements/lujan.es.vtt",
    },
    durationLabel: "1:10",
    transcript: {
      en: [
        "Hello everybody, how you doing? It's my wife, Frida, and myself, State Representative John Lujan, and we're here to vote today. We're at Southside High School. This is where my boys graduated. Our family all knows this school district very well.",
        "We're here to vote, and I wanna tell everybody, we gotta keep our district in good hands, and our district in good hands would be Jorge Borrego. We've gotta get him in office. I know this is a very, very tough race, but we've gotta keep our momentum.",
        "Right now, I'm a state representative, and I've won the last two times, and we've got a lot of projects working, and I'm telling you, Jorge Borrego's gonna be the one to move those things and continue moving us in a positive direction. We don't wanna go backwards.",
        "I don't like talking bad about anybody, but Kristian Carranza's never had a job, never been in our community, hasn't worked in our community, and Jorge Borrego knows what to do in Austin, knows how to get things done, would be the best thing for our district.",
        "So I wanna encourage family, friends, people that have supported me in the past, please get out and vote, vote Jorge Borrego on the ballot, and let's keep things positive. Thank you very much.",
      ],
      es: [
        "¡Hola a todos! ¿Cómo están? Aquí estamos mi esposa, Frida, y yo, el representante estatal John Lujan, y venimos a votar hoy. Estamos en Southside High School. Aquí se graduaron mis hijos. Toda nuestra familia conoce muy bien este distrito escolar.",
        "Venimos a votar, y quiero decirles a todos: tenemos que mantener nuestro distrito en buenas manos, y nuestro distrito estaría en buenas manos con Jorge Borrego. Tenemos que llevarlo a ese puesto. Sé que es una contienda muy, muy difícil, pero tenemos que mantener el impulso.",
        "Ahora mismo soy representante estatal, he ganado las últimas dos veces y tenemos muchos proyectos en marcha. Les digo que Jorge Borrego es quien va a sacar adelante esos proyectos y seguir llevándonos en una dirección positiva. No queremos retroceder.",
        "No me gusta hablar mal de nadie, pero Kristian Carranza nunca ha tenido un trabajo, nunca ha estado en nuestra comunidad, no ha trabajado en nuestra comunidad, y Jorge Borrego sabe qué hacer en Austin, sabe cómo lograr resultados y sería lo mejor para nuestro distrito.",
        "Así que invito a familiares, amigos y a quienes me han apoyado en el pasado: por favor, salgan a votar, voten por Jorge Borrego en la boleta, y mantengamos las cosas en positivo. Muchas gracias.",
      ],
    },
  },
  maxwell: {
    id: "maxwell",
    name: "Tom Maxwell",
    title: {
      en: "Mayor of Universal City",
      es: "Alcalde de Universal City",
    },
    quote: {
      en: "“Jorge has assured me that he is going to continue with the programs for the future growth of Universal City.”",
      es: "“Jorge me ha asegurado que va a continuar con los programas para el crecimiento futuro de Universal City.” (traducido)",
    },
    video: "/video/endorsements/maxwell.mp4",
    poster: "/images/endorsements/maxwell-poster.jpg",
    aspect: "720 / 1280",
    captions: {
      en: "/video/endorsements/maxwell.en.vtt",
      es: "/video/endorsements/maxwell.es.vtt",
    },
    burnedInCaptions: "en",
    durationLabel: "1:21",
    transcript: {
      en: [
        "Good morning. I'm Tom Maxwell. I'm mayor of Universal City, Texas, and I encourage you to get out and vote. This is our voting season right now, early voting, and you can vote in any polling place in Bexar County.",
        "This year is a very important election. It is time to get out because John Lujan is no longer the lead of House District 118. I mention John Lujan because he is stepping down from House District 118, and we need strong leadership to come in and replace him. John has been really good to Universal City and for Universal City. He works well with the county agents and county elected officials throughout.",
        "We need someone to replace that man, and that man is Jorge Borrego. Jorge has assured me that he is going to continue with the programs for the future growth of Universal City. And I'm proud to announce that he is also sponsored and supported by John Lujan.",
        "So I do encourage you to get out and vote. If not today, you've got until October 30th, and voting day is on November 3rd.",
        "Like Mayor Tom Maxwell said, early voting is starting now. Come out, cast your ballot, and let's keep this seat red so we could keep the growth here in the northeast part of Bexar County and protect our rural communities. Thank you.",
      ],
      es: [
        "Buenos días. Soy Tom Maxwell, alcalde de Universal City, Texas, y los invito a salir a votar. Esta es nuestra temporada de votación, la votación anticipada, y pueden votar en cualquier centro de votación del Condado de Bexar.",
        "Esta elección es muy importante. Es hora de salir a votar porque John Lujan ya no estará al frente del Distrito 118 de la Cámara. Menciono a John Lujan porque deja su puesto en el Distrito 118, y necesitamos un liderazgo fuerte que llegue a reemplazarlo. John ha sido muy bueno con Universal City y para Universal City. Trabaja bien con los funcionarios y los electos del condado.",
        "Necesitamos a alguien que reemplace a ese hombre, y ese hombre es Jorge Borrego. Jorge me ha asegurado que va a continuar con los programas para el crecimiento futuro de Universal City. Y me enorgullece anunciar que también cuenta con el respaldo y el apoyo de John Lujan.",
        "Así que los invito a salir a votar. Si no es hoy, tienen hasta el 30 de octubre, y el día de la elección es el 3 de noviembre.",
        "Como dijo el alcalde Tom Maxwell, la votación anticipada ya comenzó. Salgan, emitan su voto, y mantengamos este distrito republicano para seguir creciendo aquí en el noreste del Condado de Bexar y proteger a nuestras comunidades rurales. Gracias.",
      ],
    },
  },
};

// Early voting closes Fri Oct 30; Election Day is Tue Nov 3, 2026 (Central time).
const EARLY_VOTING_ENDS = Date.parse("2026-10-31T05:00:00Z");
const ELECTION_DAY_ENDS = Date.parse("2026-11-04T07:00:00Z");

export type VotingPhase = "early" | "electionDay" | "after";

export function votingPhase(now = Date.now()): VotingPhase {
  if (now < EARLY_VOTING_ENDS) return "early";
  if (now < ELECTION_DAY_ENDS) return "electionDay";
  return "after";
}

export const voteCopy: Record<VotingPhase, { kicker: L10n; cta: L10n; note: L10n }> = {
  early: {
    kicker: { en: "Early voting ends Friday, Oct 30", es: "La votación anticipada termina el viernes 30 de octubre" },
    cta: { en: "Vote early: find your polling place", es: "Vote temprano: encuentre su lugar de votación" },
    note: {
      en: "Any Bexar County voter can vote at any early-voting site.",
      es: "Cualquier votante del Condado de Bexar puede votar en cualquier sitio de votación anticipada.",
    },
  },
  electionDay: {
    kicker: { en: "Election Day is Tuesday, Nov 3", es: "El día de la elección es el martes 3 de noviembre" },
    cta: { en: "Find your polling place", es: "Encuentre su lugar de votación" },
    note: {
      en: "Polls are open 7 a.m. to 7 p.m. on Election Day.",
      es: "Las casillas abren de 7 a.m. a 7 p.m. el día de la elección.",
    },
  },
  after: {
    kicker: { en: "Thank you for voting", es: "Gracias por votar" },
    cta: { en: "Bexar County election results", es: "Resultados de la elección del Condado de Bexar" },
    note: { en: "", es: "" },
  },
};
