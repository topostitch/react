"use client";

import { CesiumRenderer } from "./cesium/CesiumRenderer";
import type { EarthProps } from "./types";

export function Earth(props: EarthProps) {
  return <CesiumRenderer options={props} object={props.objects?.[0] as any} />;
}
