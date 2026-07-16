import { SearchExperience } from "@/features/search/components/search-experience";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div className="page-shell min-h-[70vh] py-8" />}>
      <SearchExperience />
    </Suspense>
  );
}
