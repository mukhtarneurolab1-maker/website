"use client";

import { useState } from "react";
import { ImageUpload } from "./ImageUpload";

type Mode = "black" | "custom";

function initialMode(imageUrl: string): Mode {
  if (!imageUrl || imageUrl.startsWith("/images/lab/")) return "black";
  return "custom";
}

function initialCustomUrl(imageUrl: string): string {
  if (!imageUrl || imageUrl.startsWith("/images/lab/")) return "";
  return imageUrl;
}

export function PublicationThumbnailField({
  defaultValue = "",
}: {
  defaultValue?: string;
}) {
  const [mode, setMode] = useState<Mode>(() => initialMode(defaultValue));
  const customUrl = initialCustomUrl(defaultValue);

  return (
    <div className="admin-field">
      <span className="admin-field-label">Thumbnail</span>
      <div className="admin-thumb-choices">
        <label className="admin-check">
          <input
            type="radio"
            name="thumb_mode"
            value="black"
            checked={mode === "black"}
            onChange={() => setMode("black")}
          />
          Keep black placeholder
        </label>
        <label className="admin-check">
          <input
            type="radio"
            name="thumb_mode"
            value="custom"
            checked={mode === "custom"}
            onChange={() => setMode("custom")}
          />
          Use a custom image
        </label>
      </div>

      {mode === "black" ? (
        <>
          <input type="hidden" name="image_url" value="" />
          <div className="admin-black-thumb" aria-hidden="true">
            <svg className="pub-thumb-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
          <p className="admin-hint">New publications use the black thumbnail by default.</p>
        </>
      ) : (
        <ImageUpload name="image_url" label="Custom thumbnail" defaultValue={customUrl} />
      )}
    </div>
  );
}
