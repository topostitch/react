"use client";

import { useContext } from "react";
import { TopoProviderContext } from "./TopoProviderContext";

export function useTopoProvider() {
  return useContext(TopoProviderContext);
}
