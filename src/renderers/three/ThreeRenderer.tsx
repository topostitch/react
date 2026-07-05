"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { TopoObject } from "@topostitch/core";

export interface ThreeRendererOptions {
  height?: string;
  backgroundColor?: string;
  autoRotate?: boolean;
}

interface ThreeRendererProps {
  object: TopoObject;
  options?: ThreeRendererOptions;
}

export function ThreeRenderer({ object, options }: ThreeRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(options?.backgroundColor ?? "#111111");

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    camera.position.set(0, 1.5, 4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = options?.autoRotate ?? false;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 2));

    const directional = new THREE.DirectionalLight(0xffffff, 3);
    directional.position.set(5, 10, 5);
    scene.add(directional);

    const representation = object.representations.find(
      (representation) => representation.type === "model",
    );

    if (representation?.src) {
      new GLTFLoader().load(representation.src, (gltf) => {
        scene.add(gltf.scene);
      });
    }

    let animationFrame: number;

    function animate() {
      animationFrame = requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    function onResize() {
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", onResize);

      controls.dispose();
      renderer.dispose();

      container.removeChild(renderer.domElement);
    };
  }, [object, options]);

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
