import pg from "pg";
import { env } from "../config/env.js";

export const pool = new pg.Pool({ connectionString: env.databaseUrl || undefined });

export async function initDb() {
  await pool.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      sms_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
      locale TEXT NOT NULL,
      source TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      tags TEXT[],
      notes TEXT,
      assigned_to TEXT
    );
  `);

  await pool.query("ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';");
  await pool.query("ALTER TABLE leads ADD COLUMN IF NOT EXISTS tags TEXT[];");
  await pool.query("ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT;");
  await pool.query("ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_to TEXT;");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS donation_clicks (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      amount TEXT NOT NULL,
      locale TEXT NOT NULL,
      path TEXT NOT NULL,
      referrer TEXT,
      user_agent TEXT
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS volunteer_signups (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      zip TEXT NOT NULL,
      interest TEXT NOT NULL,
      updates_opt_in BOOLEAN NOT NULL DEFAULT TRUE,
      sms_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
      source_path TEXT NOT NULL,
      locale TEXT NOT NULL
    );
  `);
}
