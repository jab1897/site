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

const PIPELINE_STATUSES = ["new", "contacted", "committed", "volunteer", "donor"] as const;
type PipelineStatus = (typeof PIPELINE_STATUSES)[number];

type LeadEditorState = {
  status: PipelineStatus;
  tags: string;
  notes: string;
  assignedTo: string;
};

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

function toEditorState(lead: Lead): LeadEditorState {
  return {
    status: normalizeLeadStatus(lead.status),
    tags: toTagArray(lead.tags).join(", "),
    notes: typeof lead.notes === "string" ? lead.notes : "",
    assignedTo: typeof lead.assigned_to === "string" ? lead.assigned_to : ""
  };
}
function mapToTopList(input: Record<string, number> | undefined): Array<{ label: string; count: number }> {
  if (!input) return [];
  return Object.entries(input)
    .map(([label, count]) => ({ label, count: Number(count) || 0 }))
    .filter((item) => item.label)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
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

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadEditor, setLeadEditor] = useState<LeadEditorState | null>(null);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [saveLeadError, setSaveLeadError] = useState("");
  const [pipeline, setPipeline] = useState<PipelineCounts>(EMPTY_PIPELINE_COUNTS);
  const [activePipelineFilter, setActivePipelineFilter] = useState<PipelineStatus | "all">("all");

  useEffect(() => {
    const storedToken = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!storedToken) return;
    setToken(storedToken);
    setIsAuthed(true);
  }, []);

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

      try {
        const metricsResponse = await adminFetch(`/api/admin/metrics${query}`, authToken);
        const data = await metricsResponse.json();
        setMetrics({
          totalLeads: Number(data.totalLeads ?? 0),
          smsOptIns: Number(data.smsOptIns ?? 0),
          winredClicks: Number(data.winredClicks ?? 0)
        });
      } catch {
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
          const derived = deriveTimeseries(nextLeads, selectedRange);
          setTimeseries(derived);
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
        if (
          !Object.keys(derived.sources ?? {}).length &&
          !Object.keys(derived.campaigns ?? {}).length &&
          !Object.keys(derived.mediums ?? {}).length &&
          !Object.keys(derived.pages ?? {}).length
        ) {
          setAttributionError("Attribution unavailable until UTM fields are captured");
        }
      }
    },
    [adminFetch, selectedRange]
  );

  useEffect(() => {
    if (!token || !isAuthed) return;
    void loadAdminData(token);
  }, [isAuthed, loadAdminData, token]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activePipelineFilter, searchText, selectedRange]);

  useEffect(() => {
    if (!selectedLead) {
      setLeadEditor(null);
      setSaveLeadError("");
      return;
    }
    setLeadEditor(toEditorState(selectedLead));
  }, [selectedLead]);

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

  const filteredLeads = useMemo(() => {
    const start = rangeStartDate(selectedRange);
    const normalizedSearch = searchText.trim().toLowerCase();

    const byRange = leads.filter((lead) => {
      if (!start) return true;
      const created = parseCreatedDate(lead);
      if (!created) return false;
      return created >= start;
    });

    const byPipeline = byRange.filter((lead) => {
      if (activePipelineFilter === "all") return true;
      return normalizeLeadStatus(lead.status) === activePipelineFilter;
    });

    const bySearch = byPipeline.filter((lead) => {
      if (!normalizedSearch) return true;
      const haystack = [lead.name, lead.email, lead.phone].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(normalizedSearch);
    });

    return bySearch.sort((a, b) => {
      const left = parseCreatedDate(a)?.getTime() ?? 0;
      const right = parseCreatedDate(b)?.getTime() ?? 0;
      return right - left;
    });
  }, [activePipelineFilter, leads, searchText, selectedRange]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const topSources = mapToTopList(attribution?.sources);
  const topCampaigns = mapToTopList(attribution?.campaigns);
  const topMediums = mapToTopList(attribution?.mediums);
  const topPages = mapToTopList(attribution?.pages);

  const lineMax = Math.max(...timeseries.map((point) => point.leads), 1);

  const downloadCsv = () => {
    const headers = ["name", "email", "phone", "smsOptIn", "sourceOrPage", "createdDate"];
    const rows = filteredLeads.map((lead) => {
      const source = (lead.utm_source as string) || (lead.source_path as string) || (lead.page as string) || "";
      const created = parseCreatedDate(lead);
      const values = [
        String(lead.name ?? ""),
        String(lead.email ?? ""),
        String(lead.phone ?? ""),
        lead.smsOptIn || lead.sms_opt_in ? "yes" : "no",
        source,
        created ? created.toISOString() : ""
      ];
      return values
        .map((value) => `"${value.replace(/"/g, '""')}"`)
        .join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `admin-leads-${selectedRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  const updateLeadInState = useCallback((updatedLead: Lead) => {
    setLeads((current) =>
      current.map((lead) => {
        if (String(lead.id) !== String(updatedLead.id)) return lead;
        return { ...lead, ...updatedLead };
      })
    );
    setSelectedLead((current) => {
      if (!current || String(current.id) !== String(updatedLead.id)) return current;
      return { ...current, ...updatedLead };
    });
  }, []);

  const saveLead = useCallback(async () => {
    if (!token || !selectedLead || !leadEditor) return;
    setIsSavingLead(true);
    setSaveLeadError("");

    try {
      const payload = {
        status: leadEditor.status,
        tags: toTagArray(leadEditor.tags),
        notes: leadEditor.notes,
        assignedTo: leadEditor.assignedTo
      };

      const response = await adminFetch(`/api/admin/leads/${selectedLead.id}`, token, {
        method: "PATCH",
        body: JSON.stringify(payload)
      });
      const updatedLead = (await response.json()) as Lead;
      updateLeadInState(updatedLead);
      await loadAdminData(token);
    } catch {
      setSaveLeadError("Failed to save lead updates");
    } finally {
      setIsSavingLead(false);
    }
  }, [adminFetch, leadEditor, loadAdminData, selectedLead, token, updateLeadInState]);

  const updateLeadStatusInline = useCallback(
    async (lead: Lead, status: PipelineStatus) => {
      if (!token) return;
      try {
        const response = await adminFetch(`/api/admin/leads/${lead.id}`, token, {
          method: "PATCH",
          body: JSON.stringify({ status })
        });
        const updatedLead = (await response.json()) as Lead;
        updateLeadInState(updatedLead);
        await loadAdminData(token);
      } catch {
        setLeadsError("Unable to update lead status");
      }
    },
    [adminFetch, loadAdminData, token, updateLeadInState]
  );
  const copyEmails = async () => {
    const emails = filteredLeads
      .map((lead) => (typeof lead.email === "string" ? lead.email.trim() : ""))
      .filter(Boolean)
      .join(", ");

    if (!emails) return;
    await navigator.clipboard.writeText(emails);
  };

  if (!isAuthed) {
    return (
      <section className={`space-y-4 ${styles.dashboardRoot}`}>
        <form onSubmit={handleLogin} className={`space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm ${styles.card}`}>
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-800">
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-800">
              Admin Key
            </label>
            <input
              id="admin-password"
              type="password"
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <button type="submit" className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900">
            Login
          </button>
        </form>
        {loginError ? <p className="text-sm text-red-600">{loginError}</p> : null}
      </section>
    );
  }

  return (
    <section className={`space-y-6 ${styles.dashboardRoot}`}>
      <div className={`flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between ${styles.card}`}>
        <h1 className={`text-4xl font-extrabold tracking-tight ${styles.dashboardTitle}`}>Admin Dashboard</h1>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedRange}
            onChange={(event) => setSelectedRange(event.target.value as DateRangeKey)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            {RANGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => token && void loadAdminData(token)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Refresh
          </button>
        </div>
      </div>


      <div className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm ${styles.card}`}>
        <h2 className={`text-xl font-semibold ${styles.sectionTitle}`}>Pipeline Overview</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE_STATUSES.map((status) => {
            const isActive = activePipelineFilter === status;
            const label = status[0].toUpperCase() + status.slice(1);
            return (
              <button
                key={status}
                type="button"
                onClick={() => setActivePipelineFilter((current) => (current === status ? "all" : status))}
                className={`rounded-md border px-3 py-4 text-left transition ${isActive ? "border-black bg-black text-white" : "border-gray-200 bg-white hover:bg-gray-50"}`}
              >
                <p className={`text-xs uppercase tracking-wide ${isActive ? "text-gray-200" : "text-gray-500"}`}>{label}</p>
                <p className="mt-1 text-2xl font-semibold">{pipeline[status]}</p>
              </button>
            );
          })}
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "Total leads", value: metrics?.totalLeads, error: metricsError },
          { label: "SMS opt-ins", value: metrics?.smsOptIns, error: metricsError },
          { label: "WinRed clicks", value: metrics?.winredClicks, error: metricsError }
        ].map((card) => (
          <div key={card.label} className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${styles.card}`}>
            <dt className={`text-sm font-medium text-gray-500 ${styles.subtleLabel}`}>{card.label}</dt>
            <dd className="mt-2 text-3xl font-semibold text-gray-900">
              {isLoadingMetrics ? <span className="inline-block h-8 w-20 animate-pulse rounded bg-gray-200" /> : Number(card.value ?? 0)}
            </dd>
            <p className="mt-2 text-xs text-gray-500">Range: {rangeLabel(selectedRange)}</p>
            {card.error ? <span className="mt-2 inline-block rounded bg-red-100 px-2 py-1 text-xs text-red-700">{card.error}</span> : null}
          </div>
        ))}
      </dl>

      <div className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm ${styles.card}`}>
        <h2 className={`text-xl font-semibold ${styles.sectionTitle}`}>Leads over time</h2>
        {timeseries.length > 0 ? (
          <div className="mt-4 h-64">
            <div className="flex h-48 items-end gap-2">
              {timeseries.map((point) => (
                <div key={point.date} className="flex flex-1 flex-col items-center justify-end gap-1">
                  <div
                    className="w-full rounded-t bg-black/80"
                    style={{ height: `${Math.max((point.leads / lineMax) * 100, 3)}%` }}
                    title={`${point.date}: ${point.leads}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>{timeseries[0]?.date}</span>
              <span>{timeseries[timeseries.length - 1]?.date}</span>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-gray-600">{timeseriesError || "Time series unavailable until timestamps are captured"}</p>
        )}
      </div>

      <div className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm ${styles.card}`}>
        <h2 className={`text-xl font-semibold ${styles.sectionTitle}`}>Attribution</h2>
        {(topSources.length || topCampaigns.length || topMediums.length || topPages.length) ? (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Top sources", data: topSources },
              { title: "Top campaigns", data: topCampaigns },
              { title: "Top mediums", data: topMediums },
              { title: "Top pages", data: topPages }
            ].map((group) => (
              <div key={group.title} className={`rounded-md border border-gray-200 p-3 ${styles.card}`}>
                <h3 className={`text-sm font-semibold text-gray-700 ${styles.sectionTitle}`}>{group.title}</h3>
                {group.data.length ? (
                  <ul className="mt-2 space-y-1 text-sm">
                    {group.data.map((item) => (
                      <li key={item.label} className="flex items-center justify-between gap-2">
                        <span className="truncate" title={item.label}>{item.label}</span>
                        <span className="font-semibold">{item.count}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-gray-500">No data</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-gray-600">{attributionError || "Attribution unavailable until UTM fields are captured"}</p>
        )}
      </div>

      <div className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm ${styles.card}`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className={`text-xl font-semibold ${styles.sectionTitle}`}>Leads</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={downloadCsv}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Download CSV
            </button>
            <button
              type="button"
              onClick={() => void copyEmails()}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Copy emails
            </button>
          </div>
        </div>

        <div className="mt-4">
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search name, email, phone"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">SMS opt in</th>
                <th className="px-3 py-2">Source/page</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Tags</th>
                <th className="px-3 py-2">Assigned</th>
                <th className="px-3 py-2">Created date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoadingLeads ? (
                <tr>
                  <td className="px-3 py-4 text-gray-500" colSpan={9}>Loading leads…</td>
                </tr>
              ) : paginatedLeads.length ? (
                paginatedLeads.map((lead, index) => {
                  const created = parseCreatedDate(lead);
                  const source = lead.utm_source || lead.source_path || lead.page || "—";
                  return (
                    <tr
                      key={`${lead.id ?? "lead"}-${index}`}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-3 py-2 font-medium">{String(lead.name ?? "—")}</td>
                      <td className="px-3 py-2">{String(lead.email ?? "—")}</td>
                      <td className="px-3 py-2">{String(lead.phone ?? "—")}</td>
                      <td className="px-3 py-2">{lead.smsOptIn || lead.sms_opt_in ? "Yes" : "No"}</td>
                      <td className="px-3 py-2">{String(source)}</td>
                      <td className="px-3 py-2" onClick={(event) => event.stopPropagation()}>
                        <select
                          value={normalizeLeadStatus(lead.status)}
                          onChange={(event) => void updateLeadStatusInline(lead, event.target.value as PipelineStatus)}
                          className="rounded border border-gray-300 px-2 py-1 text-xs"
                        >
                          {PIPELINE_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status[0].toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-1">
                          {toTagArray(lead.tags).length ? (
                            toTagArray(lead.tags).map((tag) => (
                              <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2">{typeof lead.assigned_to === "string" && lead.assigned_to ? lead.assigned_to : "—"}</td>
                      <td className="px-3 py-2">{created ? formatDate(created) : "—"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="px-3 py-4 text-gray-500" colSpan={9}>{leadsError || "No leads found for current filters."}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <p>
            Showing {filteredLeads.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–{Math.min(currentPage * PAGE_SIZE, filteredLeads.length)} of {filteredLeads.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}
              className="rounded border border-gray-300 px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((value) => Math.min(totalPages, value + 1))}
              className="rounded border border-gray-300 px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedLead ? (
        <div className="fixed inset-0 z-40 flex justify-end bg-black/30" onClick={() => setSelectedLead(null)}>
          <aside
            className="h-full w-full max-w-md overflow-y-auto bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold">Lead details</h3>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="rounded border border-gray-300 px-2 py-1 text-sm"
              >
                Close
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-2">
                <span className="font-medium text-gray-700">Name</span>
                <span className="col-span-2 break-all text-gray-900">{String(selectedLead.name ?? "—")}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-2">
                <span className="font-medium text-gray-700">Email</span>
                <span className="col-span-2 break-all text-gray-900">{String(selectedLead.email ?? "—")}</span>
              </div>
              {leadEditor ? (
                <>
                  <div>
                    <label className="mb-1 block font-medium text-gray-700">Status</label>
                    <select
                      value={leadEditor.status}
                      onChange={(event) => setLeadEditor((current) => (current ? { ...current, status: event.target.value as PipelineStatus } : current))}
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    >
                      {PIPELINE_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status[0].toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block font-medium text-gray-700">Tags (comma separated)</label>
                    <input
                      value={leadEditor.tags}
                      onChange={(event) => setLeadEditor((current) => (current ? { ...current, tags: event.target.value } : current))}
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-medium text-gray-700">Notes</label>
                    <textarea
                      value={leadEditor.notes}
                      onChange={(event) => setLeadEditor((current) => (current ? { ...current, notes: event.target.value } : current))}
                      className="min-h-28 w-full rounded border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-medium text-gray-700">Assigned to</label>
                    <input
                      value={leadEditor.assignedTo}
                      onChange={(event) => setLeadEditor((current) => (current ? { ...current, assignedTo: event.target.value } : current))}
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                  </div>
                  {saveLeadError ? <p className="text-sm text-red-600">{saveLeadError}</p> : null}
                  <button
                    type="button"
                    onClick={() => void saveLead()}
                    disabled={isSavingLead}
                    className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                  >
                    {isSavingLead ? "Saving..." : "Save"}
                  </button>
                </>
              ) : null}
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  );
}
