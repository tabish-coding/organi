import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false, // Important for writes
  token: process.env.SANITY_API_WRITE_TOKEN, // Note: Not NEXT_PUBLIC_ prefix
  ignoreBrowserTokenWarning: true,
});
