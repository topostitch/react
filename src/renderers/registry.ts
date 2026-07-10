import type { TopoRenderer, TopoView } from "../types/TopoView";
import type { TopoObjectRenderer } from "../components/ObjectViewer";
import { ModelViewerRenderer } from "./model-viewer/ModelViewerRenderer";
import { CardRenderer } from "./html/CardRenderer";
import { TimelineRenderer } from "./html/TimelineRenderer";
import { ReactThreeFiberRenderer } from "./react-three-fiber/ReactThreeFiberRenderer";

type RendererKey = `${TopoView}:${TopoRenderer}`;

const registry = new Map<RendererKey, TopoObjectRenderer<any>>();

export function registerRenderer(
  view: TopoView,
  renderer: TopoRenderer,
  component: TopoObjectRenderer<any>,
) {
  registry.set(`${view}:${renderer}`, component);
}

export function getRenderer(view: TopoView, renderer: TopoRenderer) {
  return registry.get(`${view}:${renderer}`);
}

registerRenderer("card", "html", CardRenderer);
registerRenderer("timeline", "html", TimelineRenderer);
registerRenderer("model", "model-viewer", ModelViewerRenderer);
registerRenderer("model", "r3f", ReactThreeFiberRenderer);
