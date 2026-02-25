import AdminAnalyticsDashboard from "@/components/AdminAnalyticsDashboard";
import { Locale } from "@/lib/i18n";

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <div className="container py-12 space-y-6">
      <AdminAnalyticsDashboard />
    </div>
  );
}
