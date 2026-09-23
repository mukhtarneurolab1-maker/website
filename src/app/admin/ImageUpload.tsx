"use client";

import { useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/browser";

export function ImageUpload({
  name,
  label,
  defaultValue = "",
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Image storage needs Supabase keys in .env.local.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Please use an image under 5 MB.");
      return;
    }

    setBusy(true);
    setError(null);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${name}/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });
    setBusy(false);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    setUrl(supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
  }

  return (
    <div className="admin-field">
      <label htmlFor={`${name}-file`}>{label}</label>
      <input type="hidden" name={name} value={url} />
      <input id={`${name}-file`} type="file" accept="image/*" onChange={onFile} disabled={busy} />
      <input
        className="admin-url"
        type="url"
        placeholder="Or paste an image URL"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
      {busy ? <p className="admin-hint">Uploading…</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}
      {url ? <img className="admin-preview" src={url} alt="" /> : null}
    </div>
  );
}
