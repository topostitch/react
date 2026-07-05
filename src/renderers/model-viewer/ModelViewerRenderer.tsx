"use client";

import "@google/model-viewer";
import type React from "react";
import type { TopoObjectRendererProps } from "../../components/ObjectViewer";

export interface ModelViewerRendererOptions {
  autoRotate?: boolean;
  cameraControls?: boolean;
  exposure?: string;
  shadowIntensity?: string;
  height?: string;
  backgroundColor?: string;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        poster?: string;
        alt?: string;
        exposure?: string;
        "shadow-intensity"?: string;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        ar?: boolean;
      };
    }
  }
}

export function ModelViewerRenderer({
  object,
  options = {},
}: TopoObjectRendererProps<ModelViewerRendererOptions>) {
  const representation = object.representations.find(
    (item) => item.type === "model",
  );

  if (!representation) {
    return <p>No 3D representation found.</p>;
  }

  return (
    <model-viewer
      src={representation.src}
      poster={representation.poster}
      alt={object.title}
      camera-controls={options.cameraControls ?? true}
      auto-rotate={options.autoRotate ?? true}
      shadow-intensity={options.shadowIntensity ?? "1"}
      exposure={options.exposure ?? "1"}
      style={{
        width: "100%",
        height: options.height ?? "600px",
        backgroundColor: options.backgroundColor ?? "#111",
      }}
    />
  );
}
