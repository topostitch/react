import { ModelViewerRenderer } from "./model-viewer/ModelViewerRenderer";
import { ReactThreeFiberRenderer } from "./react-three-fiber/ReactThreeFiberRenderer";
import { ThreeRenderer } from "./three/ThreeRenderer";
import { AFrameRenderer } from "./aframe/AFrameRenderer";

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
  {
    id: "aframe",
    label: "A-Frame",
    renderer: AFrameRenderer,
    options: {
      height: "600px",
      backgroundColor: "#111",
    },
  },
  {
    id: "8thwall",
    category: "xr",
    licenseType: "binary-commercial",
    openSourceFramework: true,
    slam: true,
    vps: false,
    maps: false,
    handTracking: false,
    execution: "browser",
    integrations: ["aframe", "three", "playcanvas", "babylon"],
    notes:
      "SLAM requires binary distribution and visible copyright/license compliance.",
  },
  {
    capability: "ar-object-placement",
    defaultProvider: "model-viewer",
    fallbackProviders: ["aframe"],
    premiumProviders: ["8thwall"],
  },
] as const;

export { ReactThreeFiberRenderer } from "./react-three-fiber/ReactThreeFiberRenderer";
export type { ReactThreeFiberRendererOptions } from "./react-three-fiber/ReactThreeFiberRenderer";
export { ThreeRenderer } from "./three/ThreeRenderer";
export type { ThreeRendererOptions } from "./three/ThreeRenderer";
export { ModelViewerRenderer } from "./model-viewer/ModelViewerRenderer";
export { CesiumRenderer } from "./cesium/CesiumRenderer";
export type { CesiumRendererOptions } from "./cesium/CesiumRenderer";
export { Earth } from "./Earth";
export type { EarthProps } from "./types";
export { AFrameRenderer } from "./aframe/AFrameRenderer";
export type { AFrameRendererOptions } from "./aframe/AFrameRenderer";
