/**
 * Move uploaded photos that no item uses into a trash folder, and permanently
 * delete trash older than 10 days.
 *
 *   npm run clean-media             # dry run: only prints what it would do
 *   npm run clean-media -- --apply  # actually moves and deletes
 *
 * A photo counts as used when any row in any table (published or draft)
 * mentions its file name. Trash lives in media/trash/YYYY-MM-DD/<original path>;
 * to restore a photo, move it back to its original path in Supabase Storage.
 * Needs SUPABASE_SERVICE_ROLE_KEY so drafts are visible too.
 */

import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadLocalEnv, supabaseUrl } from "./load-env.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadLocalEnv(root);

const TABLES = ["research_items", "publications", "awards", "resources", "gallery_items"];
const BUCKET = "media";
const TRASH = "trash";
const KEEP_TRASH_DAYS = 10;
// Leave fresh uploads alone: an editor may have uploaded a photo but not saved the item yet.
const NEW_UPLOAD_GRACE_HOURS = 24;
const apply = process.argv.includes("--apply");

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

async function listFiles(supabase, prefix = "") {
  const { data, error } = await supabase.storage.from(BUCKET).list(prefix || undefined, {
    limit: 1000,
    sortBy: { column: "name", order: "asc" },
  });
  if (error) throw new Error(`storage list ${prefix || "/"}: ${error.message}`);
  const files = [];
  for (const item of data || []) {
    const full = prefix ? `${prefix}/${item.name}` : item.name;
    if (item.id) files.push({ path: full, createdAt: item.created_at, size: item.metadata?.size ?? 0 });
    else files.push(...(await listFiles(supabase, full)));
  }
  return files;
}

function kb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

async function main() {
  const url = supabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const rows = [];
  for (const table of TABLES) rows.push(...(await fetchAll(supabase, table)));
  const referenced = JSON.stringify(rows);

  const files = await listFiles(supabase);
  const now = Date.now();
  const today = new Date().toISOString().slice(0, 10);
  const graceMs = NEW_UPLOAD_GRACE_HOURS * 60 * 60 * 1000;
  const cutoff = new Date(now - KEEP_TRASH_DAYS * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const toTrash = files.filter(
    (file) =>
      !file.path.startsWith(`${TRASH}/`) &&
      !referenced.includes(path.posix.basename(file.path)) &&
      now - new Date(file.createdAt).getTime() > graceMs,
  );
  const toPurge = files.filter((file) => {
    if (!file.path.startsWith(`${TRASH}/`)) return false;
    const day = file.path.split("/")[1] || "";
    return /^\d{4}-\d{2}-\d{2}$/.test(day) && day < cutoff;
  });

  console.log(`${apply ? "APPLY" : "DRY RUN"}: ${files.length} file(s) in ${BUCKET}, ${rows.length} row(s) checked.`);
  console.log(`Unused → trash (${toTrash.length}):`);
  for (const file of toTrash) console.log(`  ${file.path}  ${kb(file.size)}`);
  console.log(`Trash older than ${KEEP_TRASH_DAYS} days → delete permanently (${toPurge.length}):`);
  for (const file of toPurge) console.log(`  ${file.path}  ${kb(file.size)}`);

  if (!apply) {
    console.log("Nothing changed. Run with --apply to move and delete.");
    return;
  }

  for (const file of toTrash) {
    const { error } = await supabase.storage.from(BUCKET).move(file.path, `${TRASH}/${today}/${file.path}`);
    if (error) throw new Error(`move ${file.path}: ${error.message}`);
  }
  if (toPurge.length) {
    const { error } = await supabase.storage.from(BUCKET).remove(toPurge.map((file) => file.path));
    if (error) throw new Error(`delete trash: ${error.message}`);
  }
  console.log(`Moved ${toTrash.length} to trash, permanently deleted ${toPurge.length}.`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
