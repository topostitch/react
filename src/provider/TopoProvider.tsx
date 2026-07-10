"use client";

import { ReactNode } from "react";
import { TopoProviderContext } from "./TopoProviderContext";
import type { TopoObjectProvider } from "./TopoObjectProvider";

export interface TopoProviderProps {
  provider: TopoObjectProvider;
  children: ReactNode;
}

export function TopoProvider({ provider, children }: TopoProviderProps) {
  return (
    <TopoProviderContext.Provider value={provider}>
      {children}
    </TopoProviderContext.Provider>
  );
}
