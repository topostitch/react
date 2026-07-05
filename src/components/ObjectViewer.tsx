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

export interface ObjectViewerProps<TOptions = unknown> {
  object: TopoObject;
  renderer: TopoObjectRenderer<TOptions>;
  options?: TOptions;
}

export function ObjectViewer<TOptions = unknown>({
  object,
  renderer: Renderer,
  options,
}: ObjectViewerProps<TOptions>) {
  return <>{Renderer({ object, options })}</>;
}
