import AdminAnalyticsDashboard from "@/components/AdminAnalyticsDashboard";
import styles from "@/components/admin/AdminDashboard.module.css";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className={`container py-12 ${styles.pageContainer}`}>
      <div className={styles.accentBar} aria-hidden="true" />
      <AdminAnalyticsDashboard />
    </div>
  );
}
