"use client";

import { createContext } from "react";
import type { TopoObjectProvider } from "./TopoObjectProvider";

export const TopoProviderContext = createContext<TopoObjectProvider | null>(
  null,
);
