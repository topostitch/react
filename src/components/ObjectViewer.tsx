"use client";

import type React from "react";
import type { TopoObject } from "@topostitch/core";
import type { TopoRenderer, TopoView } from "../types/TopoView";
import { getRenderer } from "../renderers/registry";
import { getDefaultRenderer } from "../renderers/defaults";

export interface TopoObjectRendererProps<TOptions = unknown> {
  object: TopoObject;
  view?: TopoView;
  renderer?: TopoRenderer;
  options?: TOptions;
}

export type TopoObjectRenderer<TOptions = unknown> = (
  props: TopoObjectRendererProps<TOptions>,
) => React.ReactNode;

export interface ObjectViewerProps {
  object: TopoObject;
  view?: TopoView;
  renderer?: TopoRenderer;
  options?: unknown;
}

export function ObjectViewer({
  object,
  view = "card",
  renderer,
  options,
}: ObjectViewerProps) {
  const resolvedRenderer = renderer ?? getDefaultRenderer(view);
  const Renderer = getRenderer(view, resolvedRenderer);

  if (!Renderer) {
    return (
      <p>
        No renderer registered for view "{view}" with renderer "
        {resolvedRenderer}".
      </p>
    );
  }

  return (
    <>
      {Renderer({
        object,
        view,
        renderer: resolvedRenderer,
        options,
      })}
    </>
  );
}
