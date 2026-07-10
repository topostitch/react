"use client";

import { useEffect, useRef } from "react";
import type { TopoObject } from "@topostitch/core";
import type { TopoObjectRendererProps } from "../../components/ObjectViewer";
import { Viewer, Ion, buildModuleUrl } from "cesium/Build/Cesium/index.cjs";
import "cesium/Build/Cesium/Widgets/widgets.css";

export interface CesiumRendererOptions {
  accessToken?: string;
  height?: string;
}

export function CesiumRenderer({
  options,
}: TopoObjectRendererProps<CesiumRendererOptions>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    buildModuleUrl.setBaseUrl("/cesium/");

    if (options?.accessToken) {
      Ion.defaultAccessToken = options.accessToken;
    }

    const viewer = new Viewer(containerRef.current, {
      timeline: false,
      animation: false,
      baseLayerPicker: false,
    });

    return () => {
      viewer.destroy();
    };
  }, [options?.accessToken]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: options?.height ?? "600px",
      }}
    />
  );
}
