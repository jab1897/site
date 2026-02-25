import AdminAnalyticsDashboard from "@/components/AdminAnalyticsDashboard";
import styles from "@/components/admin/AdminDashboard.module.css";
import { Locale } from "@/lib/i18n";

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <div className={`container py-12 ${styles.pageContainer}`}>
      <div className={styles.accentBar} aria-hidden="true" />
      <AdminAnalyticsDashboard />
    </div>
  );
}
