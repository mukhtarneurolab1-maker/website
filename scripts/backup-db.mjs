/**
 * Snapshot research, publications, awards, blogs, and the media bucket.
 *
 *   npm run backup
 *
 * Writes backups/YYYY-MM-DD/database.json and backups/YYYY-MM-DD/media/.
 * Needs SUPABASE_SERVICE_ROLE_KEY (Project Settings → API).
 */

import { createClient } from "@supabase/supabase-js";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadLocalEnv, supabaseUrl } from "./load-env.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadLocalEnv(root);

const TABLES = ["research_items", "publications", "awards", "blogs"];

async function fetchAll(supabase, table) {
  const pageSize = 1000;
  const rows = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .range(from, from + pageSize - 1);
    if (error) throw new Error(`${table}: ${error.message}`);
    rows.push(...(data || []));
    if (!data || data.length < pageSize) break;
  }
  return rows;
}

async function listMedia(supabase, prefix = "") {
  const { data, error } = await supabase.storage.from("media").list(prefix || undefined, {
    limit: 1000,
    sortBy: { column: "name", order: "asc" },
  });
  if (error) {
    console.warn("storage list skipped:", error.message);
    return [];
  }
  const files = [];
  for (const item of data || []) {
    const full = prefix ? `${prefix}/${item.name}` : item.name;
    if (item.id) files.push(full);
    else files.push(...(await listMedia(supabase, full)));
  }
  return files;
}

async function main() {
  const url = supabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
        "Add the service_role key from Supabase → Project Settings → API.",
    );
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const stamp = new Date().toISOString().slice(0, 10);
  const dir = path.join(root, "backups", stamp);
  await mkdir(dir, { recursive: true });

  const dump = {
    taken_at: new Date().toISOString(),
    tables: {},
    media: [],
  };

  for (const table of TABLES) {
    dump.tables[table] = await fetchAll(supabase, table);
    console.log(`${table}: ${dump.tables[table].length} rows`);
  }

  dump.media = await listMedia(supabase);
  if (dump.media.length) {
    const mediaDir = path.join(dir, "media");
    await mkdir(mediaDir, { recursive: true });
    for (const objectPath of dump.media) {
      const { data, error } = await supabase.storage.from("media").download(objectPath);
      if (error || !data) {
        console.warn("skip media", objectPath, error?.message);
        continue;
      }
      const dest = path.join(mediaDir, objectPath);
      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, Buffer.from(await data.arrayBuffer()));
    }
  }
  console.log(`media: ${dump.media.length} files`);

  const jsonPath = path.join(dir, "database.json");
  await writeFile(jsonPath, JSON.stringify(dump, null, 2));
  console.log(`Wrote ${path.relative(root, jsonPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
