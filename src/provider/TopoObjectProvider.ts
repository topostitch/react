import type { TopoObject } from "@topostitch/core";
import type { TopoObjectResolverInput } from "../resolvers/resolveTopoObject";

export interface TopoObjectProvider {
  resolve(input: TopoObjectResolverInput): Promise<TopoObject | null>;
}
