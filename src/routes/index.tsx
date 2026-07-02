import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const LoveExperience = lazy(() =>
  import("@/components/LoveExperience").then((m) => ({ default: m.LoveExperience })),
);

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center font-script text-4xl text-primary">Loading love…</div>}>
      <LoveExperience />
    </Suspense>
  );
}
