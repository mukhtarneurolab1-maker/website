"use client";

import { useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/browser";

const MAX_SIDE = 2000;
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Scale large photos down and re-encode them before upload, so storage holds a web-sized copy. */
async function shrinkImage(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp|heic|heif|avif)$/.test(file.type)) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return file;
  }

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size < 500 * 1024) {
    bitmap.close();
    return file;
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const encode = (type: string) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.85));
  let blob = await encode("image/webp");
  if (!blob || blob.type !== "image/webp") blob = await encode("image/jpeg");
  if (!blob || blob.size >= file.size) return file;

  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  const base = file.name.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${base}.${ext}`, { type: blob.type });
}

export function ImageUpload({
  name,
  label,
  defaultValue = "",
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const picked = event.target.files?.[0];
    if (!picked) return;
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Image storage needs Supabase keys in .env.local.");
      return;
    }

    setBusy(true);
    setError(null);
    const file = await shrinkImage(picked);
    if (file.size > MAX_UPLOAD_BYTES) {
      setBusy(false);
      setError("This image is still over 5 MB after resizing. Please use a smaller file.");
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${name}/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type || undefined,
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
        type="text"
        inputMode="url"
        placeholder="/images/... or https://..."
        value={url}
        required={required}
        onChange={(event) => setUrl(event.target.value)}
      />
      <p className="admin-hint">
        Leave this as-is to keep the current image. Upload a new file or paste a path only if you want to replace it.
      </p>
      {busy ? <p className="admin-hint">Uploading…</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}
      {url ? <img className="admin-preview" src={url} alt="" /> : null}
    </div>
  );
}
