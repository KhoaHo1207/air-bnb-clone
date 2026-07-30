import { CalendarDays } from "lucide-react";
type ListingBookedRangesProps = {
  bookedRanges: Array<{
    startDate: Date;
    endDate: Date;
  }>;
};
export function ListingBookedRanges({
  bookedRanges,
}: ListingBookedRangesProps) {
  if (bookedRanges.length === 0) return null;
  return (
    <section className="border-ink-200 from-surface via-surface to-ink-50/70 rounded-3xl border bg-gradient-to-br p-4 shadow-sm md:p-5">
      <div className="border-ink-200 flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div className="inline-flex items-center gap-2">
          <span className="bg-brand-50 text-brand-600 inline-flex h-8 w-8 items-center justify-center rounded-full">
            <CalendarDays className="h-4 w-4" />
          </span>
          <h2 className="text-ink-900 text-sm font-semibold md:text-base">
            Recent Reservations
          </h2>
        </div>

        <p className="bg-ink-100 text-ink-600 rounded-full px-2.5 py-1 text-[11px] font-medium">
          {bookedRanges.length} recent booking
          {bookedRanges.length > 1 ? "s" : ""}
        </p>
      </div>
      <div className="text-ink-700 mt-3 flex flex-wrap gap-2 text-xs">
        {bookedRanges.map((range, idx) => (
          <span
            key={`${range.startDate.toISOString()}-${idx}`}
            className="border-ink-200 bg-surface inline-flex items-center gap-1 rounded-full border px-3 py-1.5 font-medium shadow-sm"
          >
            {range.startDate.toLocaleDateString()} -{" "}
            {range.endDate.toLocaleDateString()}
          </span>
        ))}
      </div>
    </section>
  );
}
