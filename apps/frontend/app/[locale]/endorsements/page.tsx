import Image from "next/image";
import Link from "next/link";

export default function EndorsementsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || "en";
  const isEs = locale === "es";

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {isEs ? "Endosos" : "Endorsements"}
        </h1>
        <p className="mt-2 text-base text-neutral-700">
          {isEs
            ? "Agradecido por el apoyo de líderes, organizaciones y defensores conservadores."
            : "Grateful for the support of conservative leaders, organizations, and advocates."}
        </p>
      </div>

      {/* Featured */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-extrabold">
              {isEs ? "Respaldo Destacado" : "Featured Endorsement"}
            </h2>
            <p className="mt-1 text-neutral-700">
              {isEs
                ? "El respaldo más importante primero."
                : "Top endorsement first."}
            </p>
          </div>

          <div className="w-full md:w-[520px]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border">
              <Image
                src="/images/endorsements/abbott.jpg"
                alt="Governor Greg Abbott Endorses Jorge Borrego"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Elected Officials */}
      <section className="mt-10">
        <h2 className="text-lg font-extrabold">
          {isEs ? "Funcionarios Electos" : "Elected Officials"}
        </h2>
        <p className="mt-1 text-neutral-700">
          {isEs
            ? "Más respaldos de funcionarios electos se agregarán pronto."
            : "More elected official endorsements will be added soon."}
        </p>

        {/* Placeholder grid for future official endorsements */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 text-sm text-neutral-600">
            {isEs ? "Próximamente" : "Coming soon"}
          </div>
          <div className="rounded-xl border bg-white p-5 text-sm text-neutral-600">
            {isEs ? "Próximamente" : "Coming soon"}
          </div>
          <div className="rounded-xl border bg-white p-5 text-sm text-neutral-600">
            {isEs ? "Próximamente" : "Coming soon"}
          </div>
        </div>
      </section>

      {/* PACs and Organizations */}
      <section className="mt-10">
        <h2 className="text-lg font-extrabold">
          {isEs ? "Comités y Organizaciones" : "PACs and Organizations"}
        </h2>
        <p className="mt-1 text-neutral-700">
          {isEs
            ? "Agradecido por el apoyo de aliados conservadores."
            : "Grateful for support from conservative allies."}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* SAFA */}
          <div className="overflow-hidden rounded-xl border bg-white">
            <div className="relative aspect-[1/1]">
              <Image
                src="/images/endorsements/sa-voter-guide.png"
                alt="San Antonio Family Association PAC endorsement"
                fill
                className="object-contain p-3"
              />
            </div>
          </div>

          {/* TREPAC */}
          <div className="overflow-hidden rounded-xl border bg-white">
            <div className="relative aspect-[1/1]">
              <Image
                src="/images/endorsements/trepac.png"
                alt="TREPAC endorsement"
                fill
                className="object-contain p-3"
              />
            </div>
          </div>

          {/* THSC */}
          <div className="overflow-hidden rounded-xl border bg-white">
            <div className="relative aspect-[1/1]">
              <Image
                src="/images/endorsements/thsc.png"
                alt="Texas Home School Coalition endorsement"
                fill
                className="object-contain p-3"
              />
            </div>
          </div>

          {/* TLR */}
          <div className="overflow-hidden rounded-xl border bg-white">
            <div className="relative aspect-[1/1]">
              <Image
                src="/images/endorsements/tlr.jpg"
                alt="Texans for Lawsuit Reform PAC endorsement"
                fill
                className="object-contain p-3"
              />
            </div>
          </div>

          {/* AFC */}
          <div className="overflow-hidden rounded-xl border bg-white">
            <div className="relative aspect-[1/1]">
              <Image
                src="/images/endorsements/afc.jpg"
                alt="AFC Victory Fund endorsement"
                fill
                className="object-contain p-3"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-10">
        <Link className="text-sm font-semibold text-red-700 hover:underline" href={`/${locale}`}>
          {isEs ? "Volver al inicio" : "Back to home"}
        </Link>
      </div>
    </main>
  );
}
