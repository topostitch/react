"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { TopoObject as TopoObjectData } from "@topostitch/core";
import { ObjectViewer } from "./ObjectViewer";
import type { TopoRenderer, TopoView } from "../types/TopoView";
import {
  resolveTopoObject,
  type TopoObjectResolverInput,
} from "../resolvers/resolveTopoObject";
import { useTopoProvider } from "../provider/useTopoProvider";

type BaseTopoObjectProps = {
  view?: TopoView;
  renderer?: TopoRenderer;
  options?: unknown;
  className?: string;
  style?: CSSProperties;
};

export type TopoObjectProps = BaseTopoObjectProps & TopoObjectResolverInput;

export function TopoObject(props: TopoObjectProps) {
  const { view = "card", renderer, options, className, style } = props;
  const provider = useTopoProvider();

  const [object, setObject] = useState<TopoObjectData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setError(null);

      const result = await resolveTopoObject(props, provider);

      if (cancelled) return;

      if (result.status === "resolved") {
        setObject(result.object);
      } else {
        setObject(null);
        setError(result.reason);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [props, provider]);

  let content;

  if (error) {
    content = <p>{error}</p>;
  } else if (!object) {
    content = <p>Loading TopoObject...</p>;
  } else {
    content = (
      <ObjectViewer
        object={object}
        view={view}
        renderer={renderer}
        options={options}
      />
    );
  }

  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
}
