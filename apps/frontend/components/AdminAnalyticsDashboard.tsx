"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import styles from "@/components/admin/AdminDashboard.module.css";

type DateRangeKey = "7d" | "30d" | "90d" | "all";

type AdminMetrics = {
  totalLeads: number;
  smsOptIns: number;
  winredClicks: number;
};

type Lead = {
  id?: string | number;
  name?: string;
  email?: string;
  phone?: string;
  smsOptIn?: boolean;
  sms_opt_in?: boolean;
  createdAt?: string;
  created_at?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  source_path?: string;
  referrer?: string;
  page?: string;
  status?: string;
  tags?: string[] | string;
  notes?: string;
  assigned_to?: string;
  [key: string]: unknown;
};

type TimeseriesPoint = {
  date: string;
  leads: number;
};

type AttributionPayload = {
  sources?: Record<string, number>;
  campaigns?: Record<string, number>;
  mediums?: Record<string, number>;
  pages?: Record<string, number>;
};

type PipelineCounts = {
  new: number;
  contacted: number;
  committed: number;
  volunteer: number;
  donor: number;
};

type Toast = { type: "success" | "error"; message: string };

const PIPELINE_STATUSES = ["new", "contacted", "committed", "volunteer", "donor"] as const;
type PipelineStatus = (typeof PIPELINE_STATUSES)[number];

const ADMIN_EMAIL = "jorge@jorgefortexas.com";
const ADMIN_TOKEN_KEY = "admin_token";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
const PAGE_SIZE = 25;
const EMPTY_PIPELINE_COUNTS: PipelineCounts = { new: 0, contacted: 0, committed: 0, volunteer: 0, donor: 0 };

const RANGE_OPTIONS: Array<{ label: string; value: DateRangeKey }> = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "All time", value: "all" }
];

function parseCreatedDate(lead: Lead): Date | null {
  const raw = lead.createdAt || lead.created_at;
  if (!raw) return null;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function rangeLabel(range: DateRangeKey): string {
  return RANGE_OPTIONS.find((item) => item.value === range)?.label ?? "All time";
}

function rangeStartDate(range: DateRangeKey): Date | null {
  if (range === "all") return null;
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  const start = new Date(now);
  start.setDate(now.getDate() - (days - 1));
  start.setHours(0, 0, 0, 0);
  return start;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function normalizeLeadStatus(value: unknown): PipelineStatus {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  return (PIPELINE_STATUSES as readonly string[]).includes(normalized) ? (normalized as PipelineStatus) : "new";
}

function toTagArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function deriveAttribution(leads: Lead[]): AttributionPayload {
  const sources: Record<string, number> = {};
  const campaigns: Record<string, number> = {};
  const mediums: Record<string, number> = {};
  const pages: Record<string, number> = {};

  const increment = (bucket: Record<string, number>, key: unknown) => {
    const normalized = typeof key === "string" ? key.trim() : "";
    if (!normalized) return;
    bucket[normalized] = (bucket[normalized] ?? 0) + 1;
  };

  leads.forEach((lead) => {
    increment(sources, lead.utm_source ?? lead.referrer);
    increment(campaigns, lead.utm_campaign);
    increment(mediums, lead.utm_medium);
    increment(pages, lead.source_path ?? lead.page);
  });

  return { sources, campaigns, mediums, pages };
}

function deriveTimeseries(leads: Lead[], range: DateRangeKey): TimeseriesPoint[] {
  const start = rangeStartDate(range);
  const counts: Record<string, number> = {};

  leads.forEach((lead) => {
    const created = parseCreatedDate(lead);
    if (!created) return;
    if (start && created < start) return;
    const dateKey = created.toISOString().slice(0, 10);
    counts[dateKey] = (counts[dateKey] ?? 0) + 1;
  });

  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, leadsCount]) => ({ date, leads: leadsCount }));
}

export default function AdminAnalyticsDashboard() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [adminKey, setAdminKey] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [selectedRange, setSelectedRange] = useState<DateRangeKey>("30d");
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  const [metricsError, setMetricsError] = useState("");
  const [leadsError, setLeadsError] = useState("");
  const [timeseriesError, setTimeseriesError] = useState("");
  const [attributionError, setAttributionError] = useState("");

  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [timeseries, setTimeseries] = useState<TimeseriesPoint[]>([]);
  const [attribution, setAttribution] = useState<AttributionPayload | null>(null);

  const [searchInput, setSearchInput] = useState("");
  const [selectedSourceInput, setSelectedSourceInput] = useState("all");
  const [smsOnlyInput, setSmsOnlyInput] = useState(false);
  const [hasPhoneOnlyInput, setHasPhoneOnlyInput] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [smsOnly, setSmsOnly] = useState(false);
  const [hasPhoneOnly, setHasPhoneOnly] = useState(false);
  const [activePipelineFilter, setActivePipelineFilter] = useState<PipelineStatus | "all">("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [saveLeadError, setSaveLeadError] = useState("");
  const [pipeline, setPipeline] = useState<PipelineCounts>(EMPTY_PIPELINE_COUNTS);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const [isApiConnected, setIsApiConnected] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!storedToken) return;
    setToken(storedToken);
    setIsAuthed(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timeout);
  }, [toast]);

  const adminFetch = useCallback(async (path: string, authToken: string, init?: RequestInit) => {
    if (!authToken) throw new Error("No admin token");
    const response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        ...(init?.headers || {})
      }
    });
    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }
    return response;
  }, []);

  const loadAdminData = useCallback(
    async (authToken: string) => {
      const start = rangeStartDate(selectedRange);
      const query = start ? `?start=${encodeURIComponent(start.toISOString())}` : "";

      setIsLoadingMetrics(true);
      setIsLoadingLeads(true);
      setMetricsError("");
      setLeadsError("");
      setTimeseriesError("");
      setAttributionError("");
      let hadPrimaryFailure = false;

      try {
        const metricsResponse = await adminFetch(`/api/admin/metrics${query}`, authToken);
        const data = await metricsResponse.json();
        setMetrics({
          totalLeads: Number(data.totalLeads ?? 0),
          smsOptIns: Number(data.smsOptIns ?? 0),
          winredClicks: Number(data.winredClicks ?? 0)
        });
      } catch {
        hadPrimaryFailure = true;
        setMetrics(null);
        setMetricsError("Metrics unavailable");
      } finally {
        setIsLoadingMetrics(false);
      }

      let nextLeads: Lead[] = [];
      try {
        const leadsResponse = await adminFetch(`/api/admin/leads${query}`, authToken);
        const data = (await leadsResponse.json()) as Lead[];
        nextLeads = Array.isArray(data) ? data : [];
        setLeads(nextLeads);
      } catch {
        hadPrimaryFailure = true;
        setLeads([]);
        setLeadsError("Leads unavailable");
      } finally {
        setIsLoadingLeads(false);
      }

      try {
        const pipelineResponse = await adminFetch(`/api/admin/pipeline`, authToken);
        const pipelineData = (await pipelineResponse.json()) as Partial<PipelineCounts>;
        setPipeline({
          new: Number(pipelineData.new ?? 0),
          contacted: Number(pipelineData.contacted ?? 0),
          committed: Number(pipelineData.committed ?? 0),
          volunteer: Number(pipelineData.volunteer ?? 0),
          donor: Number(pipelineData.donor ?? 0)
        });
      } catch {
        const fallback = { ...EMPTY_PIPELINE_COUNTS };
        nextLeads.forEach((lead) => {
          const status = normalizeLeadStatus(lead.status);
          fallback[status] += 1;
        });
        setPipeline(fallback);
      }

      try {
        const tsResponse = await adminFetch(`/api/admin/timeseries${query}`, authToken);
        const data = (await tsResponse.json()) as TimeseriesPoint[] | { points?: TimeseriesPoint[] };
        const points = Array.isArray(data) ? data : Array.isArray(data.points) ? data.points : [];
        if (points.length > 0) {
          setTimeseries(points);
        } else {
          setTimeseries(deriveTimeseries(nextLeads, selectedRange));
        }
      } catch {
        const derived = deriveTimeseries(nextLeads, selectedRange);
        setTimeseries(derived);
        if (!derived.length) {
          setTimeseriesError("Time series unavailable until timestamps are captured");
        }
      }

      try {
        const attributionResponse = await adminFetch(`/api/admin/attribution${query}`, authToken);
        const payload = (await attributionResponse.json()) as AttributionPayload;
        setAttribution(payload);
      } catch {
        const derived = deriveAttribution(nextLeads);
        setAttribution(derived);
        if (!Object.keys(derived.sources ?? {}).length) {
          setAttributionError("Attribution unavailable until UTM fields are captured");
        }
      }

      setIsApiConnected(!hadPrimaryFailure);
      setLastUpdatedAt(new Date());
    },
    [adminFetch, selectedRange]
  );

  useEffect(() => {
    if (!token || !isAuthed) return;
    void loadAdminData(token);
  }, [isAuthed, loadAdminData, token]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activePipelineFilter, hasPhoneOnly, searchText, selectedRange, selectedSource, smsOnly]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!API_BASE) {
      setLoginError("Missing NEXT_PUBLIC_API_URL in Vercel environment variables.");
      return;
    }

    try {
      setLoginError("");
      const response = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwordHash: adminKey })
      });

      if (!response.ok) {
        setLoginError("Invalid admin credentials");
        return;
      }

      const data = (await response.json()) as { token?: string };
      if (!data.token) {
        setLoginError("Login succeeded but token missing");
        return;
      }

      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setToken(data.token);
      setIsAuthed(true);
      setLoginError("");
    } catch {
      setLoginError("Invalid admin credentials");
    }
  };

  const sourceOptions = useMemo(() => {
    const unique = new Set<string>();
    leads.forEach((lead) => {
      const source = String(lead.utm_source || lead.source_path || lead.page || "").trim();
      if (source) unique.add(source);
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const start = rangeStartDate(selectedRange);
    const normalizedSearch = searchText.trim().toLowerCase();

    return leads
      .filter((lead) => {
        if (!start) return true;
        const created = parseCreatedDate(lead);
        return created ? created >= start : false;
      })
      .filter((lead) => (activePipelineFilter === "all" ? true : normalizeLeadStatus(lead.status) === activePipelineFilter))
      .filter((lead) => {
        if (!normalizedSearch) return true;
        const haystack = [lead.name, lead.email, lead.phone].filter(Boolean).join(" ").toLowerCase();
        return haystack.includes(normalizedSearch);
      })
      .filter((lead) => (smsOnly ? Boolean(lead.smsOptIn || lead.sms_opt_in) : true))
      .filter((lead) => (hasPhoneOnly ? Boolean(String(lead.phone ?? "").trim()) : true))
      .filter((lead) => {
        if (selectedSource === "all") return true;
        const source = String(lead.utm_source || lead.source_path || lead.page || "").trim();
        return source === selectedSource;
      })
      .sort((a, b) => (parseCreatedDate(b)?.getTime() ?? 0) - (parseCreatedDate(a)?.getTime() ?? 0));
  }, [activePipelineFilter, hasPhoneOnly, leads, searchText, selectedRange, selectedSource, smsOnly]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const pipelineTotal = Math.max(1, Object.values(pipeline).reduce((sum, value) => sum + value, 0));

  const applyFilters = () => {
    setSearchText(searchInput);
    setSelectedSource(selectedSourceInput);
    setSmsOnly(smsOnlyInput);
    setHasPhoneOnly(hasPhoneOnlyInput);
  };

  const clearFilters = () => {
    setSearchInput("");
    setSelectedSourceInput("all");
    setSmsOnlyInput(false);
    setHasPhoneOnlyInput(false);
    setSearchText("");
    setSelectedSource("all");
    setSmsOnly(false);
    setHasPhoneOnly(false);
    setActivePipelineFilter("all");
  };

  const updateLeadStatusInline = async (lead: Lead, status: PipelineStatus) => {
    if (!token) return;
    const leadId = lead.id;
    if (!leadId) return;

    const previousStatus = normalizeLeadStatus(lead.status);
    setLeads((current) =>
      current.map((item) => (item.id === leadId ? { ...item, status } : item))
    );
    setToast({ type: "success", message: "Lead status updated" });

    try {
      await adminFetch(`/api/admin/leads/${encodeURIComponent(String(leadId))}`, token, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
    } catch {
      setLeads((current) =>
        current.map((item) => (item.id === leadId ? { ...item, status: previousStatus } : item))
      );
      setToast({ type: "error", message: "Could not update lead status" });
    }
  };

  const downloadCsv = () => {
    const headers = ["name", "email", "phone", "smsOptIn", "sourceOrPage", "createdDate"];
    const rows = filteredLeads.map((lead) => {
      const source = (lead.utm_source as string) || (lead.source_path as string) || (lead.page as string) || "";
      const created = parseCreatedDate(lead);
      return [
        String(lead.name ?? ""),
        String(lead.email ?? ""),
        String(lead.phone ?? ""),
        lead.smsOptIn || lead.sms_opt_in ? "yes" : "no",
        source,
        created ? created.toISOString() : ""
      ];
    });

    const escaped = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","));
    const blob = new Blob([escaped.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admin-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthed) {
    return (
      <section className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Login</h1>
        <form onSubmit={handleLogin} className="mt-5 space-y-4">
          <div>
            <label htmlFor="admin-email" className="mb-1 block text-sm font-medium text-slate-700">
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="admin-key" className="mb-1 block text-sm font-medium text-slate-700">
              Admin Key
            </label>
            <input
              id="admin-key"
              type="password"
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>
          <button type="submit" className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            Login
          </button>
          {loginError ? <p className="text-sm text-red-600">{loginError}</p> : null}
        </form>
      </section>
    );
  }

  return (
    <section className={`space-y-5 pb-6 ${styles.dashboardRoot}`}>
      <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${styles.card}`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className={`text-3xl font-semibold ${styles.dashboardTitle}`}>Admin Dashboard</h1>
            <p className="mt-1 text-xs text-slate-500">
              Last updated: {lastUpdatedAt ? `${formatDate(lastUpdatedAt)} ${lastUpdatedAt.toLocaleTimeString()}` : "Waiting for first refresh"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${isApiConnected ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-rose-300 bg-rose-50 text-rose-700"}`}
              title={isApiConnected ? "Primary admin endpoints are responding." : "One or more primary admin endpoints failed on last refresh."}
            >
              {isApiConnected ? "API Connected" : "API Error"}
            </span>
            <select
              value={selectedRange}
              onChange={(event) => setSelectedRange(event.target.value as DateRangeKey)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              {RANGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => token && void loadAdminData(token)} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100">
              Refresh
            </button>
            <button type="button" onClick={downloadCsv} className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
              Download CSV
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${styles.card}`}>
        <h2 className={`text-lg font-semibold ${styles.sectionTitle}`}>Pipeline Overview</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-5">
          {PIPELINE_STATUSES.map((status) => {
            const isActive = activePipelineFilter === status;
            const percentage = Math.round((pipeline[status] / pipelineTotal) * 100);
            return (
              <button
                key={status}
                type="button"
                onClick={() => setActivePipelineFilter((current) => (current === status ? "all" : status))}
                className={`rounded-lg border px-3 py-3 text-left transition ${isActive ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white hover:border-slate-300"}`}
              >
                <p className={`text-xs uppercase tracking-wide ${isActive ? "text-slate-200" : "text-slate-500"}`}>{status}</p>
                <p className="mt-1 text-2xl font-semibold">{pipeline[status]}</p>
                <div className={`mt-2 h-1.5 rounded-full ${isActive ? "bg-slate-700" : "bg-slate-100"}`}>
                  <div className={`h-full rounded-full ${isActive ? "bg-sky-300" : "bg-sky-500"}`} style={{ width: `${Math.max(4, percentage)}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "Total leads", value: metrics?.totalLeads ?? 0 },
          { label: "SMS opt-ins", value: metrics?.smsOptIns ?? 0 },
          { label: "WinRed clicks", value: metrics?.winredClicks ?? 0 }
        ].map((card) => (
          <div key={card.label} className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${styles.card} min-h-[140px]`}>
            {isLoadingMetrics ? (
              <div className="space-y-3">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-10 w-20 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{card.value}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    +{timeseries[timeseries.length - 1]?.leads ?? 0} vs previous period
                  </span>
                  <span className="text-xs text-slate-500">{rangeLabel(selectedRange)}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_320px]">
        <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${styles.card}`}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${styles.sectionTitle}`}>Leads</h2>
            {leadsError ? (
              <button type="button" onClick={() => token && void loadAdminData(token)} className="rounded-md border border-rose-300 px-3 py-1.5 text-xs font-medium text-rose-700">
                Retry table
              </button>
            ) : null}
          </div>
          <div className="max-h-[560px] overflow-auto rounded-lg border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 z-10 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-3 py-2">Name</th><th className="px-3 py-2">Email</th><th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2">SMS</th><th className="px-3 py-2">Source</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingLeads
                  ? Array.from({ length: 8 }).map((_, index) => (
                      <tr key={`lead-skeleton-${index}`}><td className="px-3 py-3" colSpan={7}><span className="block h-5 w-full animate-pulse rounded bg-slate-100" /></td></tr>
                    ))
                  : paginatedLeads.length
                    ? paginatedLeads.map((lead, index) => {
                        const created = parseCreatedDate(lead);
                        const source = String(lead.utm_source || lead.source_path || lead.page || "—");
                        return (
                          <tr key={`${lead.id ?? "lead"}-${index}`} className="odd:bg-white even:bg-slate-50/50 hover:bg-sky-50/60">
                            <td className="max-w-[140px] truncate px-3 py-2 font-medium" title={String(lead.name ?? "—")}>{String(lead.name ?? "—")}</td>
                            <td className="max-w-[180px] truncate px-3 py-2" title={String(lead.email ?? "—")}>{String(lead.email ?? "—")}</td>
                            <td className="max-w-[130px] truncate px-3 py-2" title={String(lead.phone ?? "—")}>{String(lead.phone ?? "—")}</td>
                            <td className="px-3 py-2">{lead.smsOptIn || lead.sms_opt_in ? "Yes" : "No"}</td>
                            <td className="max-w-[160px] truncate px-3 py-2" title={source}>{source}</td>
                            <td className="px-3 py-2">
                              <select value={normalizeLeadStatus(lead.status)} onChange={(event) => void updateLeadStatusInline(lead, event.target.value as PipelineStatus)} className="rounded-md border border-slate-300 px-2 py-1 text-xs">
                                {PIPELINE_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                              </select>
                            </td>
                            <td className="px-3 py-2 text-xs text-slate-600">{created ? formatDate(created) : "—"}</td>
                          </tr>
                        );
                      })
                    : (
                      <tr>
                        <td className="px-3 py-12 text-center" colSpan={7}>
                          <p className="text-sm font-medium text-slate-700">No leads match these filters.</p>
                          <p className="mt-1 text-xs text-slate-500">Try broadening filters or clear them.</p>
                          {leadsError ? <p className="mt-2 text-xs text-rose-700">{leadsError}</p> : null}
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
            <p>
              Showing {filteredLeads.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0} to {Math.min(currentPage * PAGE_SIZE, filteredLeads.length)} of {filteredLeads.length}
            </p>
            <div className="flex items-center gap-2">
              <button type="button" disabled={currentPage <= 1} onClick={() => setCurrentPage((value) => Math.max(1, value - 1))} className="rounded border border-slate-300 px-2 py-1 disabled:opacity-50">Prev</button>
              <span>Page {currentPage} / {totalPages}</span>
              <button type="button" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((value) => Math.min(totalPages, value + 1))} className="rounded border border-slate-300 px-2 py-1 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>

        <aside className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${styles.card}`}>
          <h2 className={`text-lg font-semibold ${styles.sectionTitle}`}>Filters</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Search</label>
              <input type="search" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Name, email, phone" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Source</label>
              <select value={selectedSourceInput} onChange={(event) => setSelectedSourceInput(event.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
                <option value="all">All sources</option>
                {sourceOptions.map((source) => <option key={source} value={source}>{source}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={smsOnlyInput} onChange={(event) => setSmsOnlyInput(event.target.checked)} /> SMS opt-ins only</label>
            <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={hasPhoneOnlyInput} onChange={(event) => setHasPhoneOnlyInput(event.target.checked)} /> Has phone only</label>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={applyFilters} className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white">Apply</button>
              <button type="button" onClick={clearFilters} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium">Clear</button>
            </div>
          </div>

          {(metricsError || timeseriesError || attributionError) ? (
            <div className="mt-5 rounded-md border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
              {metricsError ? <p>{metricsError}</p> : null}
              {timeseriesError ? <p>{timeseriesError}</p> : null}
              {attributionError ? <p>{attributionError}</p> : null}
            </div>
          ) : null}
        </aside>
      </div>

      {toast ? (
        <div className={`fixed bottom-4 right-4 z-50 rounded-md px-4 py-2 text-sm font-medium text-white shadow-lg ${toast.type === "success" ? "bg-emerald-600" : "bg-rose-600"}`}>
          {toast.message}
        </div>
      ) : null}
    </section>
  );
}
