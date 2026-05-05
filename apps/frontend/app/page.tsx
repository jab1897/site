import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Index() {
  const pref = cookies().get("locale")?.value;
  redirect(pref === "es" ? "/es" : "/en");
}
