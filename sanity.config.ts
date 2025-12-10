import {
  DocumentActionComponent,
  DocumentActionProps,
  WorkspaceOptions,
  defineConfig,
} from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "~/app/sanity/schemas";
import StudioLogo from "./app/(studio)/StudioLogo";

const config: WorkspaceOptions = {
  name: "default",
  title: "UFV CSA",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  icon: StudioLogo,
  // document: {
  //   actions: (prev, context) => {
  //     return prev.map((originalAction) =>
  //       context.schemaType === "event" && originalAction.action === "delete"
  //         ? ConfirmDialogAction
  //         : createImprovedAction(originalAction)
  //     );
  //     return prev.map((originalAction) =>
  //       originalAction.action === "delete"
  //         ? createImprovedAction(originalAction)
  //         : originalAction
  //     );
  //   },
  // },
};

function createImprovedAction(originalPublishAction: DocumentActionComponent) {
  const BetterAction = (props: DocumentActionProps) => {
    const originalResult = originalPublishAction(props);
    if (originalResult === null) return null;
    return {
      ...originalResult,
      onHandle: () => {
        console.log(props);
        if (props.type === "event") {
          // Add our custom functionality
          console.log("Hello world!");
          // then delegate to original handler
        }
        if (typeof originalResult?.onHandle === "function")
          originalResult.onHandle();

        console.log("Run after handling.");
      },
    };
  };
  return BetterAction;
}

export default defineConfig(config);
