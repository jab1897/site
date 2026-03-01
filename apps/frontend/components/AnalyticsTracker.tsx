"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
const NODE_ENV = process.env.NODE_ENV;
const ENABLE_ANALYTICS_ENV = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS;
const ENABLE_ANALYTICS = ENABLE_ANALYTICS_ENV ? ENABLE_ANALYTICS_ENV !== "false" : NODE_ENV === "production";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!ENABLE_ANALYTICS || !API_BASE || !pathname) return;

    const search = searchParams?.toString() || "";
    const fullPath = `${pathname}${search ? `?${search}` : ""}`;
    const payload = JSON.stringify({
      path: fullPath,
      referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined
    });

    const endpoint = `${API_BASE}/api/track/pageview`;

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(endpoint, blob);
      return;
    }

    void fetch(endpoint, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: payload
    }).catch(() => {
      // no-op
    });
  }, [pathname, searchParams]);

  return null;
}
