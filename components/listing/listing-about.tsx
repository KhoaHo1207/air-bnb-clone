import { Bath, BedDouble, Users } from "lucide-react";
type ListingAboutProps = {
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  hostName: string;
  hostRating: number;
};
export function ListingAbout({
  description,
  guestCount,
  roomCount,
  bathroomCount,
  hostName,
  hostRating,
}: ListingAboutProps) {
  return (
    <section className="border-ink-200 bg-surface rounded-3xl border p-5 shadow-sm md:p-6">
      <h2 className="text-ink-900 text-lg font-semibold md:text-xl">
        About this stay
      </h2>
      <p className="text-ink-700 mt-3 leading-relaxed">{description}</p>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <span className="bg-ink-100 text-ink-700 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs md:text-sm">
          <Users className="h-4 w-4" />
          {guestCount} guest{guestCount === 1 ? "" : "s"}
        </span>
        <span className="bg-ink-100 text-ink-700 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs md:text-sm">
          <BedDouble className="h-4 w-4" />
          {roomCount} room{roomCount === 1 ? "" : "s"}
        </span>
        <span className="bg-ink-100 text-ink-700 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs md:text-sm">
          <Bath className="h-4 w-4" />
          {bathroomCount} bath{bathroomCount === 1 ? "" : "s"}
        </span>
      </div>

      <div className="border-ink-200 text-ink-700 mt-6 grid gap-4 border-t pt-4 text-sm md:grid-cols-2">
        <div className="space-y-1.5">
          <p className="text-ink-500 text-xs font-semibold tracking-[0.16em] uppercase">
            Host
          </p>
          <p className="text-ink-900 text-sm font-medium">{hostName}</p>
          <p className="text-ink-500 text-xs">
            Hosted by {hostName}, currently rated {hostRating.toFixed(1)} by
            guests.
          </p>
        </div>
        <div className="space-y-1.5">
          <p className="text-ink-500 text-xs font-semibold tracking-[0.16em] uppercase">
            Booking details
          </p>
          <p className="text-ink-500 text-xs">
            Free cancellation up to 7 days before check-in. Policies shown here
            are sample copy.
          </p>
        </div>
      </div>
    </section>
  );
}
