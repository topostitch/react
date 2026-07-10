import type { TopoObject } from "@topostitch/core";
import type { TopoObjectResolverInput } from "../resolvers/resolveTopoObject";
import type { TopoObjectProvider } from "./TopoObjectProvider";

export interface MemoryProviderOptions {
  objects: TopoObject[];
}

export class MemoryProvider implements TopoObjectProvider {
  private objectsById = new Map<string, TopoObject>();
  private objectsBySlug = new Map<string, TopoObject>();

  constructor(options: MemoryProviderOptions) {
    for (const object of options.objects) {
      this.objectsById.set(object.id, object);

      const slug =
        typeof object.metadata?.slug === "string"
          ? object.metadata.slug
          : undefined;

      if (slug) {
        this.objectsBySlug.set(slug, object);
      }
    }
  }

  async resolve(input: TopoObjectResolverInput): Promise<TopoObject | null> {
    if ("data" in input && input.data) {
      return input.data;
    }

    if ("id" in input && input.id) {
      return this.objectsById.get(input.id) ?? null;
    }

    if ("slug" in input && input.slug) {
      return this.objectsBySlug.get(input.slug) ?? null;
    }

    return null;
  }
}
