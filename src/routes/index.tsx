import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "My App" }, { name: "description", content: "A new project." }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Hello</h1>
        <p className="mt-3 text-muted-foreground">A blank slate — ready to build.</p>
      </div>
    </main>
  );
}
