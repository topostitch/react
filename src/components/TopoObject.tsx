"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
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

  /**
   * Custom content displayed while the object is resolving.
   */
  loadingFallback?: ReactNode;

  /**
   * Keeps the loading state visible for at least this many milliseconds.
   */
  minimumLoadingMs?: number;
};

export type TopoObjectProps = BaseTopoObjectProps & TopoObjectResolverInput;

export function TopoObject(props: TopoObjectProps) {
  /*
   * This is "destructuring."
   *
   * It takes named values out of the props object so we can use them
   * directly below.
   *
   * For example:
   * props.loadingFallback becomes loadingFallback.
   */
  const {
    view = "card",
    renderer,
    options,
    className,
    style,
    loadingFallback,
    minimumLoadingMs = 0,
  } = props;

  const provider = useTopoProvider();

  /*
   * These values give the effect stable dependencies.
   * We only read a property when that property exists on the resolver input.
   */
  const inputObject = "object" in props ? props.object : undefined;

  const inputId = "id" in props ? props.id : undefined;

  const inputSlug = "slug" in props ? props.slug : undefined;

  const [object, setObject] = useState<TopoObjectData | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const startedAt = Date.now();

      /*
       * Reset the component to its loading state whenever the requested
       * object changes.
       */
      setObject(null);
      setError(null);

      try {
        const result = await resolveTopoObject(props, provider);

        /*
         * If resolving finished too quickly, wait for the remaining time.
         * This prevents the loading UI from flashing for only a few
         * milliseconds.
         */
        const elapsed = Date.now() - startedAt;

        const remainingLoadingTime = Math.max(0, minimumLoadingMs - elapsed);

        if (remainingLoadingTime > 0) {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, remainingLoadingTime);
          });
        }

        /*
         * The component may have unmounted while we were waiting.
         * In that case, do not update its state.
         */
        if (cancelled) return;

        if (result.status === "resolved") {
          setObject(result.object);
        } else {
          setObject(null);
          setError(result.reason);
        }
      } catch (caughtError) {
        const elapsed = Date.now() - startedAt;

        const remainingLoadingTime = Math.max(0, minimumLoadingMs - elapsed);

        if (remainingLoadingTime > 0) {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, remainingLoadingTime);
          });
        }

        if (cancelled) return;

        setObject(null);

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to resolve TopoObject.",
        );
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [provider, inputObject, inputId, inputSlug, minimumLoadingMs]);

  let content: ReactNode;

  if (error) {
    content = (
      <div
        role="alert"
        style={{
          display: "grid",
          width: "100%",
          height: "100%",
          minHeight: 240,
          placeItems: "center",
          padding: 24,
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0 }}>{error}</p>
      </div>
    );
  } else if (!object) {
    content = loadingFallback ?? (
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading object"
        style={{
          display: "grid",
          width: "100%",
          height: "100%",
          minHeight: 240,
          placeItems: "center",
          padding: 24,
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0 }}>Loading object…</p>
      </div>
    );
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
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {content}
    </div>
  );
}
