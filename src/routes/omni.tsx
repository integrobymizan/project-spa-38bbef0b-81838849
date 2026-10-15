import { createFileRoute, redirect } from "@tanstack/react-router";

// The 3D site used to live at /omni/. It now sits at the main domain.
export const Route = createFileRoute("/omni")({
  beforeLoad: () => {
    throw redirect({ href: "/", statusCode: 301 });
  },
});
