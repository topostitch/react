import type { ComponentType } from "react";
import type { GroupProps } from "@react-three/fiber";

import { Apollo11CommandModule } from "../../demo/components/Apollo11CommandModule";

export const componentRegistry: Record<string, ComponentType<GroupProps>> = {
  nasm_A19700102000: Apollo11CommandModule,
};
