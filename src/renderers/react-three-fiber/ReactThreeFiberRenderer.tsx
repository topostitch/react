"use client";

import { Canvas, useThree } from "@react-three/fiber";
import {
  Bounds,
  Center,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";
import { Box3, Vector3 } from "three";
import type { TopoObjectRendererProps } from "../../components/ObjectViewer";
import { componentRegistry } from "./componentRegistry";

export interface ReactThreeFiberRendererOptions {
  controls?: boolean;
  cameraPosition?: [number, number, number];
  height?: string;
  backgroundColor?: string;
  modelScale?: number;
  normalizedSize?: number;
  environment?:
    | "apartment"
    | "city"
    | "dawn"
    | "forest"
    | "lobby"
    | "night"
    | "park"
    | "studio"
    | "sunset"
    | "warehouse";
  environmentBackground?: boolean;
}

function NormalizedModel({
  src,
  scale = 1,
  normalizedSize = 2.25,
}: {
  src: string;
  scale?: number;
  normalizedSize?: number;
}) {
  const gltf = useGLTF(src);

  const { scene, position, normalizedScale } = useMemo(() => {
    const clonedScene = gltf.scene.clone(true);
    const box = new Box3().setFromObject(clonedScene);
    const size = new Vector3();
    const center = new Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxDimension = Math.max(size.x, size.y, size.z);
    const fitScale = maxDimension > 0 ? normalizedSize / maxDimension : 1;
    const finalScale = fitScale * scale;

    return {
      scene: clonedScene,
      normalizedScale: finalScale,
      position: [
        -center.x * finalScale,
        -center.y * finalScale,
        -center.z * finalScale,
      ] as [number, number, number],
    };
  }, [gltf.scene, scale, normalizedSize]);

  return (
    <group position={position} scale={normalizedScale}>
      <primitive object={scene} />
    </group>
  );
}

function CameraRig({ position }: { position: [number, number, number] }) {
  const { camera } = useThree();

  useLayoutEffect(() => {
    camera.position.set(position[0], position[1], position[2]);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, position]);

  return null;
}

export function ReactThreeFiberRenderer({
  object,
  options = {},
}: TopoObjectRendererProps<ReactThreeFiberRendererOptions>) {
  const representation = object.representations.find(
    (item) => item.type === "model",
  );

  const CustomComponent = componentRegistry[object.id];

  if (!CustomComponent && !representation?.uri) {
    return <p>No 3D representation found.</p>;
  }

  const cameraPosition = options.cameraPosition ?? [0, 0.15, 4];

  return (
    <div
      style={{
        width: "100%",
        height: options.height ?? "600px",
        backgroundColor: options.backgroundColor ?? "#111",
      }}
    >
      <Canvas camera={{ position: cameraPosition, fov: 35 }}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        <Environment
          preset={options.environment ?? "studio"}
          background={options.environmentBackground ?? false}
        />

        <CameraRig position={cameraPosition} />

        {CustomComponent ? (
          <Bounds fit clip observe margin={1.2}>
            <Center>
              <CustomComponent scale={options.modelScale ?? 1} />
            </Center>
          </Bounds>
        ) : (
          <NormalizedModel
            src={representation!.uri!}
            scale={options.modelScale ?? 1}
            normalizedSize={options.normalizedSize ?? 2.25}
          />
        )}

        {(options.controls ?? true) ? (
          <OrbitControls target={[0, 0, 0]} />
        ) : null}
      </Canvas>
    </div>
  );
}
