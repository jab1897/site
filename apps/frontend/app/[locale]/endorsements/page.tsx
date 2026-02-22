import Image from "next/image";

export default function EndorsementsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || "en";
  const isEs = locale === "es";
  const electedOfficials = [
    { name: "Helen Kerwin", title: "State Representative", descriptor: "Texas House District 58" },
    { name: "Briscoe Cain", title: "State Representative", descriptor: "Texas House District 128" },
    { name: "Carrie Isaac", title: "State Representative", descriptor: "Texas House District 73" },
    { name: "Shelley Luther", title: "State Representative", descriptor: "Texas House District 62" },
    { name: "Joanne Shofner", title: "State Representative", descriptor: "Texas House District 11" },
    { name: "Cody Vasut", title: "State Representative", descriptor: "Texas House District 25" },
    { name: "Wes Virdell", title: "State Representative", descriptor: "Texas House District 53" },
    { name: "Brent Money", title: "State Representative", descriptor: "Texas House District 2" },
    { name: "Mike Olcott", title: "State Representative", descriptor: "Texas House District 60" },
    { name: "J.M. Lozano", title: "State Representative", descriptor: "Texas House District 43" },
    { name: "Hillary Hickland", title: "State Representative", descriptor: "Texas House District 55" },
    { name: "Don McLaughlin", title: "State Representative", descriptor: "Texas House District 80" },
    { name: "Alan Schoolcraft", title: "State Representative", descriptor: "Texas House District 44" },
    { name: "Valoree Swanson", title: "State Representative", descriptor: "Texas House District 123" },
    { name: "Terri Leo-Wilson", title: "State Representative", descriptor: "Texas House District 23" },
    { name: "Daniel Alders", title: "State Representative", descriptor: "Texas House District 6" },
    { name: "Walter West", title: "SREC Member", descriptor: "Senate District 19" },
    { name: "Kelly Perry", title: "SREC Member", descriptor: "Senate District 19" },
    { name: "James Dickey", title: "Former RPT Chairman", descriptor: "Republican Party of Texas" }
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy">{isEs ? "Respaldos" : "Endorsements"}</h1>
        <p className="mt-2 text-base text-neutral-700">
          {isEs
            ? "Agradecido por el apoyo de líderes conservadores y organizaciones de confianza."
            : "Grateful for support from trusted conservative leaders and organizations."}
        </p>
      </div>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-navy">{isEs ? "Gobernador Abbott" : "Governor Abbott"}</h2>
        <p className="mt-1 text-neutral-700">{isEs ? "Respaldo destacado" : `Governor Abbott proudly endorsed Jorge Borrego for House District 118! "Jorge Borrego is a determined conservative who will work to make South San Antonio safer and more affordable."`}</p>
        <div className="mt-5 relative aspect-[16/8] overflow-hidden rounded-xl border">
          <Image src="/assets/endorsements/abbott.jpg" alt="Governor Greg Abbott endorses Jorge Borrego" fill className="object-cover" priority />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-navy">{isEs ? "Funcionarios electos" : "Elected Officials"}</h2>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {electedOfficials.map((official) => (
            <div key={official.name} className="space-y-0.5 leading-tight">
              <p className="text-sm font-extrabold uppercase tracking-wide text-red">{official.name}</p>
              <p className="text-sm font-bold text-navy">{official.title}</p>
              {official.descriptor ? <p className="text-xs text-neutral-500">{official.descriptor}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-extrabold text-navy">{isEs ? "Comités y organizaciones" : "PACs and organizations"}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            ["/assets/endorsements/sa-voter-guide.png", "San Antonio Family Association PAC endorsement"],
            ["/assets/endorsements/trepac.png", "TREPAC endorsement"],
            ["/assets/endorsements/thsc.png", "Texas Home School Coalition endorsement"],
            ["/assets/endorsements/tlr.jpg", "Texans for Lawsuit Reform PAC endorsement"],
            ["/assets/endorsements/afc.jpg", "AFC Victory Fund endorsement"]
          ].map(([src, alt]) => (
            <div key={src} className="overflow-hidden rounded-xl border bg-white">
              <div className="relative aspect-[1/1]">
                <Image src={src} alt={alt} fill className="object-contain p-3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
