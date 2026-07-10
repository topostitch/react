import { MemoryProvider } from "../provider/MemoryProvider";
import { apollo11CommandModule } from "./objects/apollo11CommandModule";

export const demoProvider = new MemoryProvider({
  objects: [apollo11CommandModule],
});
