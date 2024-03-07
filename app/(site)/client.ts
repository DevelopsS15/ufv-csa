import { createClient } from "@sanity/client";

export default createClient({
  projectId: "aldsu8ui", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  apiVersion: "2024-03-05",
  useCdn: false, // `false` if you want to ensure fresh data
});
