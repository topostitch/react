import type { TopoObject as TopoObjectData } from "@topostitch/core";
import type { TopoObjectProvider } from "../provider/TopoObjectProvider";

export type TopoObjectResolverInput =
  | {
      data: TopoObjectData;
      id?: never;
      slug?: never;
    }
  | {
      id: string;
      data?: never;
      slug?: never;
    }
  | {
      slug: string;
      data?: never;
      id?: never;
    };

export type TopoObjectResolverResult =
  | {
      status: "resolved";
      object: TopoObjectData;
    }
  | {
      status: "unresolved";
      reason: string;
    };

export async function resolveTopoObject(
  input: TopoObjectResolverInput,
  provider?: TopoObjectProvider | null,
): Promise<TopoObjectResolverResult> {
  if ("data" in input && input.data) {
    return {
      status: "resolved",
      object: input.data,
    };
  }

  if (!provider) {
    return {
      status: "unresolved",
      reason:
        "No TopoProvider found. Pass data directly or wrap this component in <TopoProvider>.",
    };
  }

  const object = await provider.resolve(input);

  if (!object) {
    return {
      status: "unresolved",
      reason: "TopoProvider could not resolve this object.",
    };
  }

  return {
    status: "resolved",
    object,
  };
}
