import { redirect } from "next/navigation";

export default function DonatePage({ params }: { params: { locale: string } }) {
  // One click donate: go straight to WinRed. Keep amount selection on WinRed.
  // If you later want to track nav clicks, we can change this to hit the API redirect endpoint instead.
  redirect("https://secure.winred.com/jorge-borrego-campaign/donate-today");
}
