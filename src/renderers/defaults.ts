import type { TopoRenderer, TopoView } from "../types/TopoView";

export const defaultRenderers: Record<TopoView, TopoRenderer> = {
  card: "html",
  details: "html",
  timeline: "html",
  graph: "html",
  model: "model-viewer",
  location: "cesium",
};

export function getDefaultRenderer(view: TopoView): TopoRenderer {
  return defaultRenderers[view];
}
