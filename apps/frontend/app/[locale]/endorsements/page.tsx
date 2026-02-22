import Image from "next/image";

export default function EndorsementsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || "en";
  const isEs = locale === "es";

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
        <p className="mt-1 text-neutral-700">{isEs ? "Respaldo destacado" : "Featured endorsement"}</p>
        <div className="mt-5 relative aspect-[16/8] overflow-hidden rounded-xl border">
          <Image src="/assets/endorsements/abbott.jpg" alt="Governor Greg Abbott endorses Jorge Borrego" fill className="object-cover" priority />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-extrabold text-navy">{isEs ? "Funcionarios electos" : "Elected officials"}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 text-sm text-neutral-700">Governor Greg Abbott</div>
          <div className="rounded-xl border bg-white p-5 text-sm text-neutral-600">{isEs ? "Más respaldos pronto" : "More endorsements soon"}</div>
          <div className="rounded-xl border bg-white p-5 text-sm text-neutral-600">{isEs ? "Más respaldos pronto" : "More endorsements soon"}</div>
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
