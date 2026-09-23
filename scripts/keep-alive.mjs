/**
 * Poke the live database so a free-plan Supabase project does not pause.
 * Inactive projects freeze after seven days with no traffic.
 *
 *   npm run keep-alive
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadLocalEnv, supabaseUrl } from "./load-env.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadLocalEnv(root);

const url = supabaseUrl();
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL, and a key (SUPABASE_SERVICE_ROLE_KEY or the publishable key).",
  );
  process.exit(1);
}

const endpoint = `${url}/rest/v1/research_items?select=id&limit=1`;
const response = await fetch(endpoint, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/json",
  },
});

if (!response.ok) {
  const body = await response.text();
  console.error(`Keep-alive failed: ${response.status} ${body}`);
  process.exit(1);
}

const rows = await response.json();
console.log(
  `Database awake. Read ${Array.isArray(rows) ? rows.length : 0} research row(s).`,
);
