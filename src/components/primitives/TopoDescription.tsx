import { createElement } from "react";
import type { CSSProperties } from "react";
import type { TopoObject } from "@topostitch/core";

export type TopoDescriptionElement = "p" | "div" | "span" | "section";

export interface TopoDescriptionProps {
  object: TopoObject;
  as?: TopoDescriptionElement;
  className?: string;
  style?: CSSProperties;
}

export function TopoDescription({
  object,
  as = "p",
  className,
  style,
}: TopoDescriptionProps) {
  if (!object.description) {
    return null;
  }

  return createElement(
    as,
    {
      className,
      style: {
        margin: 0,
        lineHeight: 1.6,
        ...style,
      },
    },
    object.description,
  );
}
