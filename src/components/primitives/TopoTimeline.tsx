import type { CSSProperties } from "react";
import type { TopoObject } from "@topostitch/core";

export interface TopoTimelineProps {
  object: TopoObject;
  heading?: string;
  headingId?: string;
  className?: string;
  style?: CSSProperties;
}

export function TopoTimeline({
  object,
  heading = "Timeline",
  headingId = "topo-timeline-heading",
  className,
  style,
}: TopoTimelineProps) {
  if (!object.timeline?.length) {
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

      <ol
        style={{
          margin: 0,
          paddingLeft: 20,
        }}
      >
        {object.timeline.map((event) => (
          <li key={event.id ?? event.title} style={{ marginBottom: 16 }}>
            <article>
              {event.date ? (
                <time
                  dateTime={event.date}
                  style={{
                    display: "block",
                    marginBottom: 4,
                    fontSize: 13,
                    opacity: 0.65,
                  }}
                >
                  {event.date}
                </time>
              ) : null}

              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                }}
              >
                {event.title}
              </h3>

              {event.description ? (
                <p
                  style={{
                    margin: "6px 0 0",
                    lineHeight: 1.5,
                  }}
                >
                  {event.description}
                </p>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
