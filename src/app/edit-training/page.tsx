import { Suspense } from "react";
import TrainingPageClient from "./TrainingPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrainingPageClient />
    </Suspense>
  );
}
