"use client";

import type React from "react";
import type { TopoObject } from "@topostitch/core";

export interface TopoObjectRendererProps<TOptions = unknown> {
  object: TopoObject;
  options?: TOptions;
}

export type TopoObjectRenderer<TOptions = unknown> = (
  props: TopoObjectRendererProps<TOptions>,
) => React.ReactNode;

export interface ObjectViewerProps {
  object: TopoObject;
  renderer: TopoObjectRenderer<any>;
  options?: unknown;
}

export function ObjectViewer({
  object,
  renderer: Renderer,
  options,
}: ObjectViewerProps) {
  return <>{Renderer({ object, options })}</>;
}
