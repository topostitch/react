"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  TopoInspector,
  type TopoInspectorState,
} from "../inspector/TopoInspector";

export interface TopoObjectContainerProps {
  viewer: ReactNode;
  children: ReactNode;

  inspectorTitle?: string;
  inspectorLabel?: string;
  sectionLabel?: string;

  inspectorState?: TopoInspectorState;
  defaultInspectorState?: TopoInspectorState;

  height?: string;

  className?: string;
  style?: CSSProperties;

  onInspectorStateChange?: (state: TopoInspectorState) => void;
}

export function TopoObjectContainer({
  viewer,
  children,
  inspectorTitle,
  inspectorLabel = "Object information",
  sectionLabel = "Object workspace",
  inspectorState: controlledInspectorState,
  defaultInspectorState = "expanded",
  height = "700px",
  className,
  style,
  onInspectorStateChange,
}: TopoObjectContainerProps) {
  const [internalInspectorState, setInternalInspectorState] =
    useState<TopoInspectorState>(defaultInspectorState);

  const inspectorState = controlledInspectorState ?? internalInspectorState;

  function changeInspectorState(nextState: TopoInspectorState) {
    if (controlledInspectorState === undefined) {
      setInternalInspectorState(nextState);
    }

    onInspectorStateChange?.(nextState);
  }

  return (
    <section
      aria-label={sectionLabel}
      data-inspector-state={inspectorState}
      className={className}
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height,
        gap:
          inspectorState === "collapsed"
            ? 0
            : inspectorState === "peek"
              ? 12
              : 24,
        alignItems: "stretch",
        transition: "gap 280ms ease",
        ...style,
      }}
    >
      <figure
        aria-label="Interactive object viewer"
        style={{
          position: "relative",
          flex: "1 1 auto",
          minWidth: 0,
          height: "100%",
          margin: 0,
          overflow: "hidden",
          borderRadius: inspectorState === "collapsed" ? 24 : 18,
          background: "#111111",
          transition: "border-radius 280ms ease",
        }}
      >
        {viewer}
      </figure>

      <TopoInspector
        state={inspectorState}
        title={inspectorTitle}
        label={inspectorLabel}
        onStateChange={changeInspectorState}
      >
        {children}
      </TopoInspector>
    </section>
  );
}
