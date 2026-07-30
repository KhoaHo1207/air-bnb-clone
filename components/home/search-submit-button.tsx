"use client";

import { useFormStatus } from "react-dom";
import { Search } from "lucide-react";

export function SearchSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-brand-500 hover:bg-brand-600 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white disabled:opacity-70 md:w-auto"
    >
      <Search className="size-4" />
      {pending ? "Searching..." : "Search"}
    </button>
  );
}
