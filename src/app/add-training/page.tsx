import { Suspense } from "react";
import TrainingPageClient from "./TrainingPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrainingPageClient />
    </Suspense>
  );
}
