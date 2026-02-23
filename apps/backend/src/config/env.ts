import "dotenv/config";

export const env = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "dev_secret",
  adminEmail: process.env.ADMIN_EMAIL || "admin@example.com",
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || "admin",
  leadsNotifyEmail: process.env.LEADS_NOTIFY_EMAIL || "info@jorgefortexas.com",
  volunteerNotifyEmail: process.env.VOLUNTEER_NOTIFY_EMAIL || "info@jorgefortexas.com",
  resendApiKey: process.env.RESEND_API_KEY || ""
};
