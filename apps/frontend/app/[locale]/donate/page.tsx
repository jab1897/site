import fs from "node:fs";
import path from "node:path";
import { DonateButtons } from "@/components/DonateButtons";
import { Locale } from "@/lib/i18n";
export default function Page({ params }: { params: { locale: Locale } }) { const filePath = path.join(process.cwd(), "content", params.locale, "donate.mdx"); const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : "Missing donation copy file."; return <div className="container py-12"><h1 className="text-3xl font-bold">Donate</h1><pre className="bg-slate-50 p-4 whitespace-pre-wrap mt-4">{raw}</pre><div className="mt-6"><DonateButtons locale={params.locale} path="donate-page" /></div><div className="mt-6"><a href={`/${params.locale}/get-involved`} className="border px-4 py-2">Volunteer</a></div></div>; }
