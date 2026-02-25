"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

const ADMIN_EMAIL = "jorge@jorgefortexas.com";
const ADMIN_TOKEN_KEY = "admin_token";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

type AdminMetrics = {
  totalLeads: number;
  totalSmsOptIns: number;
  totalWinRedClicks: number;
  daily: Array<{ day: string; leads: number; clicks: number }>;
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
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    setToken(localStorage.getItem(ADMIN_TOKEN_KEY));
  }, []);

  const adminFetch = useCallback(
    async (path: string, init?: RequestInit) => {
      if (!token) {
        throw new Error("No admin token");
      }

      const response = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init?.headers || {}),
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Admin request failed");
      }

      return response;
    },
    [token]
  );

  const loadAdminData = useCallback(async () => {
    try {
      const [metricsResponse, leadsResponse] = await Promise.all([
        adminFetch("/api/admin/metrics"),
        adminFetch("/api/admin/leads")
      ]);

      const [metricsData, leadsData] = await Promise.all([metricsResponse.json(), leadsResponse.json()]);
      setMetrics(metricsData);
      setLeads(leadsData);
    } catch {
      setError("Invalid admin credentials");
    }
  }, [adminFetch]);

  useEffect(() => {
    if (!token) {
      return;
    }

    void loadAdminData();
  }, [loadAdminData, token]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!API_BASE) {
      setError("Missing NEXT_PUBLIC_API_URL in Vercel environment variables.");
      return;
    }

    try {
      setError(null);

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
        throw new Error("Login failed");
      }

      const data = (await response.json()) as { token: string };
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setToken(data.token);
      void loadAdminData();
    } catch {
      setError("Invalid admin credentials");
    }
  };

  return (
    <section className="space-y-6">
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

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {metrics ? (
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-md border p-4">
            <dt className="text-sm text-gray-500">Total leads</dt>
            <dd className="text-2xl font-semibold">{metrics.totalLeads}</dd>
          </div>
          <div className="rounded-md border p-4">
            <dt className="text-sm text-gray-500">SMS opt-ins</dt>
            <dd className="text-2xl font-semibold">{metrics.totalSmsOptIns}</dd>
          </div>
          <div className="rounded-md border p-4">
            <dt className="text-sm text-gray-500">WinRed clicks</dt>
            <dd className="text-2xl font-semibold">{metrics.totalWinRedClicks}</dd>
          </div>
        </dl>
      ) : null}

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
    </section>
  );
}
