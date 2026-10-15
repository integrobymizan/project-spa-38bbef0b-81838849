import { createFileRoute } from "@tanstack/react-router";
import homePage from "../../public/index.html?raw";

// The Omni AI Builders 3D website is a static site in public/ (index.html,
// assets/, services/). Serve its home page at the main domain so visitors
// see it at "/" with no redirect.
export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        new Response(homePage, {
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=0, must-revalidate",
          },
        }),
    },
  },
});
