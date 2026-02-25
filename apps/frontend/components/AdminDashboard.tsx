"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

const ADMIN_EMAIL = "jorge@jorgefortexas.com";
const ADMIN_TOKEN_KEY = "admin_token";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

type AdminMetrics = {
  totalLeads: number;
  smsOptIns: number;
  winredClicks: number;
};

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [adminKey, setAdminKey] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [dataError, setDataError] = useState("");
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!storedToken) {
      return;
    }

    setToken(storedToken);
    setIsAuthed(true);
  }, []);

  const adminFetch = useCallback(
    async (path: string, authToken: string, init?: RequestInit) => {
      if (!authToken) {
        throw new Error("No admin token");
      }

      const response = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init?.headers || {}),
          Authorization: `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        throw new Error("Admin request failed");
      }

      return response;
    },
    []
  );

  const loadAdminData = useCallback(async (authToken: string) => {
    let nextDataError = "";

    try {
      const metricsResponse = await adminFetch("/api/admin/metrics", authToken);
      const data = await metricsResponse.json();
      setMetrics({
        totalLeads: Number(data.totalLeads ?? 0),
        smsOptIns: Number(data.smsOptIns ?? 0),
        winredClicks: Number(data.winredClicks ?? 0)
      });
    } catch {
      setMetrics(null);
      nextDataError = "Metrics unavailable";
    }

    try {
      const leadsResponse = await adminFetch("/api/admin/leads", authToken);
      const leadsData = (await leadsResponse.json()) as Lead[];
      setLeads(leadsData);
    } catch {
      setLeads([]);
      nextDataError = nextDataError ? `${nextDataError}. Leads unavailable` : "Leads unavailable";
    }

    setDataError(nextDataError);
  }, [adminFetch]);

  const metricValue = (value: number | undefined) => (Number.isFinite(value) ? value : 0);


  useEffect(() => {
    if (!token) {
      return;
    }

    void loadAdminData(token);
  }, [isAuthed, loadAdminData, token]);

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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          passwordHash: adminKey
        })
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

  return (
    <section className="space-y-6">
      {!isAuthed ? (
        <>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium">
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium">
                Admin Key
              </label>
              <input
                id="admin-password"
                type="password"
                value={adminKey}
                onChange={(event) => setAdminKey(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <button type="submit" className="rounded-md bg-black px-4 py-2 text-white">
              Login
            </button>
          </form>
          {loginError ? <p className="text-sm text-red-600">{loginError}</p> : null}
        </>
      ) : (
        <>
          {dataError ? <p className="text-sm text-red-600">{dataError}</p> : null}

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-md border p-4">
              <dt className="text-sm text-gray-500">Total leads</dt>
              <dd className="text-2xl font-semibold">{metricValue(metrics?.totalLeads)}</dd>
            </div>
            <div className="rounded-md border p-4">
              <dt className="text-sm text-gray-500">SMS opt-ins</dt>
              <dd className="text-2xl font-semibold">{metricValue(metrics?.smsOptIns)}</dd>
            </div>
            <div className="rounded-md border p-4">
              <dt className="text-sm text-gray-500">WinRed clicks</dt>
              <dd className="text-2xl font-semibold">{metricValue(metrics?.winredClicks)}</dd>
            </div>
          </dl>

          {leads.length ? (
            <ul className="space-y-2">
              {leads.map((lead) => (
                <li key={lead.id} className="rounded-md border p-3 text-sm">
                  <div className="font-semibold">{lead.name}</div>
                  <div>{lead.email}</div>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}
    </section>
  );
}
