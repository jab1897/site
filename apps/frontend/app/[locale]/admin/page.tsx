import AdminDashboard from "@/components/AdminDashboard";
import { Locale } from "@/lib/i18n";

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <div className="container py-12 space-y-6">
      <h1 className="text-3xl font-bold">Admin</h1>
      <AdminDashboard />
    </div>
  );
}
