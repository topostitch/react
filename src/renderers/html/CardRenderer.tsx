"use client";

import type { TopoObjectRendererProps } from "../../components/ObjectViewer";

export function CardRenderer({ object }: TopoObjectRendererProps) {
  return (
    <article>
      <h2>{object.title}</h2>
      {object.description ? <p>{object.description}</p> : null}
    </article>
  );
}
