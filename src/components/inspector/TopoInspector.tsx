"use client";

import type { CSSProperties, ReactNode } from "react";

export type TopoInspectorState = "expanded" | "peek" | "collapsed";

export interface TopoInspectorProps {
  state: TopoInspectorState;
  title?: string;
  label?: string;
  children: ReactNode;
  onStateChange: (state: TopoInspectorState) => void;
  className?: string;
  style?: CSSProperties;
}

export function TopoInspector({
  state,
  title,
  label = "Inspector",
  children,
  onStateChange,
  className,
  style,
}: TopoInspectorProps) {
  const expanded = state === "expanded";
  const peek = state === "peek";
  const collapsed = state === "collapsed";

  return (
    <aside
      aria-label={label}
      data-state={state}
      className={className}
      style={{
        position: collapsed ? "absolute" : "relative",
        zIndex: 10,
        top: collapsed ? 16 : undefined,
        right: collapsed ? 16 : undefined,

        flex: expanded ? "0 0 min(380px, 36%)" : peek ? "0 0 88px" : "0 0 48px",

        width: expanded ? "min(380px, 36%)" : peek ? 88 : 48,
        minWidth: expanded ? 300 : peek ? 88 : 48,
        height: expanded ? "100%" : peek ? "100%" : 48,

        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.34)",
        borderRadius: collapsed ? 14 : 18,
        background: "rgba(255, 255, 255, 0.82)",
        color: "#111111",
        boxShadow: "0 18px 48px rgba(0, 0, 0, 0.22)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",

        transition: [
          "width 280ms ease",
          "min-width 280ms ease",
          "flex-basis 280ms ease",
          "height 280ms ease",
          "border-radius 280ms ease",
          "transform 280ms ease",
          "opacity 180ms ease",
        ].join(", "),

        ...style,
      }}
    >
      <header
        style={{
          position: expanded ? "sticky" : "relative",
          top: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: expanded ? "space-between" : "center",
          gap: 12,
          minHeight: 48,
          padding: expanded ? "8px 8px 8px 20px" : 6,
          background: expanded ? "rgba(255, 255, 255, 0.88)" : "transparent",
          backdropFilter: expanded ? "blur(18px)" : undefined,
        }}
      >
        {expanded ? (
          <strong
            style={{
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </strong>
        ) : null}

        <button
          type="button"
          aria-expanded={expanded}
          aria-label={expanded ? "Minimize inspector" : "Expand inspector"}
          title={expanded ? "Minimize inspector" : "Expand inspector"}
          onClick={() => onStateChange(expanded ? "peek" : "expanded")}
          style={{
            display: "grid",
            flex: "0 0 auto",
            width: 36,
            height: 36,
            padding: 0,
            placeItems: "center",
            border: "1px solid rgba(17, 17, 17, 0.16)",
            borderRadius: 10,
            background: "#ffffff",
            color: "#111111",
            font: "inherit",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          <span aria-hidden="true">{expanded ? "→" : "ⓘ"}</span>
        </button>
      </header>

      {peek ? (
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            height: "calc(100% - 48px)",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 0",
          }}
        >
          <span
            style={{
              maxHeight: "100%",
              overflow: "hidden",
              fontWeight: 700,
              lineHeight: 1,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            {title ?? label}
          </span>
        </div>
      ) : null}

      {expanded ? (
        <div
          style={{
            height: "calc(100% - 52px)",
            padding: "20px 24px 28px",
            overflowY: "auto",
            opacity: 1,
            animation: "topo-inspector-enter 180ms ease",
          }}
        >
          {children}
        </div>
      ) : null}

      {peek ? (
        <button
          type="button"
          aria-label="Collapse inspector completely"
          title="Collapse inspector completely"
          onClick={() => onStateChange("collapsed")}
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            display: "grid",
            width: 28,
            height: 28,
            padding: 0,
            placeItems: "center",
            border: 0,
            borderRadius: 8,
            background: "rgba(17, 17, 17, 0.08)",
            color: "#111111",
            cursor: "pointer",
          }}
        >
          <span aria-hidden="true">×</span>
        </button>
      ) : null}

      <style>
        {`
          @keyframes topo-inspector-enter {
            from {
              opacity: 0;
              transform: translateX(10px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            [data-state] {
              transition-duration: 0.01ms !important;
            }

            [data-state] * {
              animation-duration: 0.01ms !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </aside>
  );
}
