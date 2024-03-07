import { WorkspaceOptions, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "~/app/sanity/schemas";
import StudioLogo from "./app/(studio)/StudioLogo";

const config: WorkspaceOptions = {
  name: "default",
  title: "UFV CSA",
  projectId: "aldsu8ui",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  icon: StudioLogo,
};

export default defineConfig(config);
