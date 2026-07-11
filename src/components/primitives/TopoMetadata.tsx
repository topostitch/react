import type { CSSProperties } from "react";
import type { TopoObject } from "@topostitch/core";

export interface TopoMetadataProps {
  object: TopoObject;
  heading?: string;
  headingId?: string;
  className?: string;
  style?: CSSProperties;
  exclude?: string[];
}

export function TopoMetadata({
  object,
  heading = "Metadata",
  headingId = "topo-metadata-heading",
  className,
  style,
  exclude = [],
}: TopoMetadataProps) {
  const entries = Object.entries(object.metadata ?? {}).filter(
    ([key]) => !exclude.includes(key),
  );

  if (entries.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby={headingId} className={className} style={style}>
      <h2
        id={headingId}
        style={{
          margin: "0 0 16px",
          fontSize: 20,
        }}
      >
        {heading}
      </h2>

      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "max-content minmax(0, 1fr)",
          gap: "10px 16px",
          margin: 0,
        }}
      >
        {entries.map(([key, value]) => (
          <div key={key} style={{ display: "contents" }}>
            <dt style={{ fontWeight: 700 }}>{formatLabel(key)}</dt>

            <dd
              style={{
                margin: 0,
                overflowWrap: "anywhere",
              }}
            >
              {formatValue(value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function formatLabel(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
