import { ModelViewerRenderer } from "./model-viewer/ModelViewerRenderer";
import { ReactThreeFiberRenderer } from "./react-three-fiber/ReactThreeFiberRenderer";
import { ThreeRenderer } from "./three/ThreeRenderer";

export const renderers = [
  {
    id: "model-viewer",
    label: "Model Viewer",
    renderer: ModelViewerRenderer,
    options: {
      autoRotate: true,
      cameraControls: true,
      height: "600px",
      backgroundColor: "#111",
    },
  },
  {
    id: "react-three-fiber",
    label: "React Three Fiber",
    renderer: ReactThreeFiberRenderer,
    options: {
      controls: true,
      cameraPosition: [0, 1.5, 4] as const,
      height: "600px",
      backgroundColor: "#111",
    },
  },
  {
    id: "three",
    label: "Three.js",
    renderer: ThreeRenderer,
    options: {
      autoRotate: true,
      height: "600px",
      backgroundColor: "#111",
    },
  },
] as const;

export { ReactThreeFiberRenderer } from "./react-three-fiber/ReactThreeFiberRenderer";
export type { ReactThreeFiberRendererOptions } from "./react-three-fiber/ReactThreeFiberRenderer";
export { ThreeRenderer } from "./three/ThreeRenderer";
export type { ThreeRendererOptions } from "./three/ThreeRenderer";
export { ModelViewerRenderer } from "./model-viewer/ModelViewerRenderer";
