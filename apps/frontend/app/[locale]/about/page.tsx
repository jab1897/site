import { Locale } from "@/lib/i18n";

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <div className="container py-12 space-y-6">
      <h1 className="text-3xl font-bold">About Jorge Borrego</h1>

      <section className="space-y-6 text-lg leading-8">
        <p>
          Jorge Borrego’s story is rooted in resilience, faith, and an
          unshakable belief in the promise of Texas.
        </p>

        <p>
          Raised in difficult circumstances, Jorge understands firsthand what it
          means to fight for opportunity. With a father incarcerated and an
          unstable home environment, he grew up surrounded by challenges that
          could have defined his future. Instead, they strengthened his resolve.
          Through discipline, faith, and hard work, Jorge became the first in
          his family to graduate from college, breaking a cycle and building a
          new foundation for his own family.
        </p>

        <p>
          At 18 years old, Jorge moved to San Antonio to attend The University
          of Texas at San Antonio. UTSA was more than a university to him. It
          was a turning point. He earned a Bachelor’s degree in Mathematics,
          sharpening the analytical thinking and problem solving skills that now
          guide his approach to public policy and fiscal responsibility. While
          at UTSA, he met the woman who would become his wife, a fifth
          generation San Antonian whose family roots run deep in this community.
          Together, they chose to build their life here and raise their children
          in the city they love.
        </p>

        <p>San Antonio became home.</p>

        <p>
          Jorge’s Catholic faith shapes his worldview and anchors his
          priorities. It informs his belief in the dignity of every person, the
          importance of strong families, and the responsibility to serve others
          before oneself. Faith is not a slogan for Jorge. It is a daily guide
          that influences how he leads, how he treats people, and how he
          approaches public service.
        </p>

        <p>
          After college, Jorge dedicated his career to advancing conservative
          policy that expands opportunity and protects working families. At the
          Texas Public Policy Foundation, he played a key role in passing the
          largest school choice program in the nation’s history. Since its
          launch, over 100,000 Texas families have applied for the program,
          demonstrating overwhelming demand for educational freedom and parental
          empowerment. Jorge believes in strong public schools, but he also
          believes parents deserve the ability to choose the best educational
          path for their children.
        </p>

        <p>
          His work strengthened accountability in public education while
          expanding opportunity for families who felt unheard or overlooked. For
          Jorge, education reform is deeply personal. He knows what it means to
          need a better path forward.
        </p>

        <p>
          Throughout his policy career, Jorge has championed parental rights,
          government transparency, fiscal discipline, and responsible budgeting.
          He believes taxpayer dollars should be respected and that families
          struggling with rising property taxes deserve real relief. In House
          District 118, where many families are working hard to make ends meet,
          Jorge understands that economic stability is not theoretical. It is
          about keeping your home, growing your small business, and building a
          future for your children.
        </p>

        <p>
          Jorge stands firmly for protecting Second Amendment rights, backing
          local law enforcement, securing the border, defending life, and
          keeping inappropriate materials out of classrooms. He believes Texas
          must remain a state where faith, freedom, and family are protected
          rather than undermined. At the same time, he recognizes that San
          Antonio voters expect practical solutions that improve daily life,
          strengthen neighborhoods, and create real opportunity.
        </p>

        <p>
          As a husband and father, Jorge’s motivation is simple. He wants his
          children and every child in San Antonio to grow up in a safe
          community, attend strong schools, and inherit a Texas that is freer
          and more prosperous than the one we have today.
        </p>

        <p>
          Jorge Borrego represents a new generation of leadership grounded in
          principle and prepared to govern. He did not inherit influence or
          political power. He earned his way forward through hard work, faith,
          and perseverance. He is running to serve the people of House District
          118, not special interests, not insiders, and not career politicians.
        </p>

        <p>
          For Jorge, public service is a calling rooted in gratitude for the
          opportunities Texas gave him.
        </p>

        <p>And he is ready to fight for yours.</p>
      </section>

      <div className="flex gap-3">
        <a href={`/${params.locale}/donate`} className="bg-red text-white px-4 py-2">
          Donate
        </a>
        <a href={`/${params.locale}/get-involved`} className="border px-4 py-2">
          Volunteer
        </a>
      </div>
    </div>
  );
}
