import { Suspense } from "react";
import dynamic from "next/dynamic";

const ErrorContent = dynamic(() => import("../ErrorContent"), {
  suspense: true,
} as any);

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<p>Loading error message...</p>}>
      <ErrorContent />
    </Suspense>
  );
}
