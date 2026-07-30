"use client";

import { useFormStatus } from "react-dom";

export function ListingFormSubmit({
  submitLabel,
  submittingLabel,
}: {
  submitLabel: string;
  submittingLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-brand-500 hover:bg-brand-600 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
    >
      {pending ? submittingLabel : submitLabel}
    </button>
  );
}
