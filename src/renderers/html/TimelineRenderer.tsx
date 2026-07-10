"use client";

import type { TopoObjectRendererProps } from "../../components/ObjectViewer";

export function TimelineRenderer({ object }: TopoObjectRendererProps) {
  const timeline = object.timeline;

  if (!timeline?.length) {
    return <p>No timeline found.</p>;
  }

  return (
    <ol>
      {timeline.map((event, index) => (
        <li key={event.id ?? index}>
          {event.date ? <time>{event.date}</time> : null}
          <strong>{event.title}</strong>
          {event.description ? <p>{event.description}</p> : null}
        </li>
      ))}
    </ol>
  );
}
