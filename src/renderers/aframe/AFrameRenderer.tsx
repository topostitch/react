"use client";

import { createElement } from "react";
import type { TopoObjectRendererProps } from "../../components/ObjectViewer";
import "aframe";

export interface AFrameRendererOptions {
  height?: string;
  backgroundColor?: string;
  modelUrl?: string;
}

export function AFrameRenderer({
  options,
}: TopoObjectRendererProps<AFrameRendererOptions>) {
  const modelUrl = options?.modelUrl;

  return (
    <div style={{ width: "100%", height: options?.height ?? "600px" }}>
      {createElement(
        "a-scene",
        {
          embedded: true,
          background: `color: ${options?.backgroundColor ?? "#111"}`,
        },
        createElement(
          "a-assets",
          null,
          modelUrl
            ? createElement("a-asset-item", {
                id: "model",
                src: modelUrl,
              })
            : null,
        ),
        modelUrl
          ? createElement("a-entity", {
              "gltf-model": "#model",
              position: "0 1.5 -3",
              scale: "1 1 1",
            })
          : null,
        createElement("a-entity", {
          camera: true,
          "look-controls": true,
          position: "0 1.6 0",
        }),
        createElement("a-light", {
          type: "ambient",
          intensity: "1",
        }),
      )}
    </div>
  );
}
