import { MapPin, Star } from "lucide-react";
type ListingHeaderInfoProps = {
  category: string;
  title: string;
  locationValue: string;
  hostRating: number;
  hostName: string;
  pricePerNight: number;
  listingStatusLabel: string;
};
export function ListingHeaderInfo({
  category,
  title,
  locationValue,
  hostRating,
  hostName,
  pricePerNight,
  listingStatusLabel,
}: ListingHeaderInfoProps) {
  return (
    <div className="space-y-4 p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <p className="bg-brand-50 text-brand-700 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase">
            {category}
          </p>

          <h1 className="text-ink-900 text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
            {title}
          </h1>
          <div className="text-ink-600 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {locationValue}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="text-ink-700 h-4 w-4 fill-current" />
              {hostRating.toFixed(1)} host rating
            </span>
            <span>{listingStatusLabel}</span>
          </div>
        </div>

        <div className="border-ink-200 bg-surface-muted text-ink-900 hidden rounded-2xl border px-4 py-3 text-right text-sm font-medium md:block">
          <p>
            ${pricePerNight}
            <span className="text-ink-600 ml-1 text-xs font-normal">
              / night
            </span>
          </p>
          <p className="text-ink-500 mt-1 text-xs">Hosted by {hostName}</p>
        </div>
      </div>
    </div>
  );
}
