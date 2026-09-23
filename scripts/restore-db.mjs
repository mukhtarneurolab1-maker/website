/**
 * Put a backup from backups/YYYY-MM-DD back into Supabase.
 *
 *   CONFIRM_RESTORE=restore npm run restore
 *   CONFIRM_RESTORE=restore BACKUP_DATE=2026-10-01 npm run restore
 *
 * Replaces research, publications, awards, and blogs with that snapshot,
 * then uploads the saved media files again.
 */

import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadLocalEnv, supabaseUrl } from "./load-env.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadLocalEnv(root);

const TABLES = ["research_items", "publications", "awards", "blogs"];

function latestBackupDate() {
  const dir = path.join(root, "backups");
  if (!existsSync(dir)) return "";
  const dates = readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  return dates.at(-1) || "";
}

async function upsertAll(supabase, table, rows) {
  const size = 100;
  for (let index = 0; index < rows.length; index += size) {
    const chunk = rows.slice(index, index + size);
    const { error } = await supabase.from(table).upsert(chunk, { onConflict: "id" });
    if (error) throw new Error(`${table}: ${error.message}`);
  }
}

async function deleteMissing(supabase, table, ids) {
  if (ids.length === 0) {
    const { error } = await supabase.from(table).delete().not("id", "is", null);
    if (error) throw new Error(`${table} clear: ${error.message}`);
    return;
  }
  const { error } = await supabase.from(table).delete().not("id", "in", `(${ids.join(",")})`);
  if (error) throw new Error(`${table} prune: ${error.message}`);
}

async function main() {
  if (process.env.CONFIRM_RESTORE !== "restore") {
    console.error('Refusing to restore. Set CONFIRM_RESTORE=restore to replace the live tables.');
    process.exit(1);
  }

  const url = supabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }

  const stamp = process.env.BACKUP_DATE || latestBackupDate();
  const jsonPath = path.join(root, "backups", stamp, "database.json");
  if (!stamp || !existsSync(jsonPath)) {
    console.error(`No backup found at backups/${stamp || "(none)"}/database.json`);
    process.exit(1);
  }

  const dump = JSON.parse(readFileSync(jsonPath, "utf8"));
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  for (const table of TABLES) {
    const rows = dump.tables?.[table];
    if (!Array.isArray(rows)) throw new Error(`${table} is missing from the backup`);
    await upsertAll(supabase, table, rows);
    await deleteMissing(
      supabase,
      table,
      rows.map((row) => row.id).filter(Boolean),
    );
    console.log(`${table}: restored ${rows.length} rows`);
  }

  const mediaDir = path.join(root, "backups", stamp, "media");
  let uploaded = 0;
  for (const objectPath of dump.media || []) {
    const file = path.join(mediaDir, objectPath);
    if (!existsSync(file)) {
      console.warn("skip missing media", objectPath);
      continue;
    }
    const body = await readFile(file);
    const { error } = await supabase.storage.from("media").upload(objectPath, body, {
      upsert: true,
    });
    if (error) {
      console.warn("skip media", objectPath, error.message);
      continue;
    }
    uploaded += 1;
  }
  console.log(`media: uploaded ${uploaded} files from ${stamp}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
