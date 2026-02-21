import { LeadForm } from "@/components/LeadForm";
import { Locale } from "@/lib/i18n";
export default function Page({ params }: { params: { locale: Locale } }) { return <div className="container py-12"><h1 className="text-3xl font-bold">Get Involved</h1><div className="grid md:grid-cols-2 gap-4 my-6">{["Block walking","Phone banking","Digital","Events"].map(c=><div key={c} className="border p-4">{c} - placeholder</div>)}</div><LeadForm locale={params.locale} /><div className="mt-8"><a href={`/${params.locale}/donate`} className="bg-red text-white px-4 py-2">Donate</a></div></div>; }
