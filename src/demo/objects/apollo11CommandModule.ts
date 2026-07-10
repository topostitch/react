import type { TopoObject } from "@topostitch/core";

export const apollo11CommandModule: TopoObject = {
  id: "nasm_A19700102000",
  type: "artifact",
  title: "Apollo 11 Command Module",
  description:
    "The Apollo 11 Command Module, maintained by the National Air and Space Museum.",

  representations: [
    {
      id: "primary-model",
      type: "model",
      format: "glb",
      uri: "/command_module_apollo_11.glb",
      accessibilityLabel: "3D model of the Apollo 11 Command Module.",
      capabilities: ["download", "embed"],
    },
  ],

  timeline: [
    {
      id: "apollo-11-mission",
      date: "1969-07",
      title: "Apollo 11 Mission",
      description: "The command module flew during the Apollo 11 mission.",
    },
    {
      id: "smithsonian-record",
      title: "Smithsonian Collection Record",
      description: "Maintained by the National Air and Space Museum.",
    },
  ],

  metadata: {
    source: "Smithsonian Institution",
    recordId: "nasm_A19700102000",
    sceneId: "3d_package:d8c6457e-4ebc-11ea-b77f-2e728ce88125",
    rights: "CC0",
  },

  createdAt: "2026-07-09T00:00:00.000Z",
  updatedAt: "2026-07-09T00:00:00.000Z",
};
