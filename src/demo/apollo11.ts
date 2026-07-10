import type { TopoObject } from "@topostitch/core";

export const apollo11: TopoObject = {
  id: "apollo11",

  type: "artifact",

  title: "Apollo 11 Glove",

  description: "Neil Armstrong's EVA glove.",

  representations: [],

  timeline: [
    {
      date: "1969-07-20",
      title: "Moon Landing",
    },
  ],

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
