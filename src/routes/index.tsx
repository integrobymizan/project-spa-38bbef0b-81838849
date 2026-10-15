import { createFileRoute, redirect } from "@tanstack/react-router";

// The Omni AI Builders 3D website is a static site in public/omni/.
// Send visitors from the home address straight to it.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/omni/index.html", statusCode: 302 });
  },
});
