import { createElement } from "react";
import type { CSSProperties } from "react";
import type { TopoObject } from "@topostitch/core";

export type TopoTitleElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";

export interface TopoTitleProps {
  object: TopoObject;
  as?: TopoTitleElement;
  className?: string;
  style?: CSSProperties;
}

export function TopoTitle({
  object,
  as = "h1",
  className,
  style,
}: TopoTitleProps) {
  return createElement(
    as,
    {
      className,
      style: {
        margin: 0,
        fontSize: 32,
        lineHeight: 1.1,
        ...style,
      },
    },
    object.title,
  );
}
