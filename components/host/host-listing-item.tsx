import { deleteListing } from "@/actions/listings";
import Link from "next/link";
import { BedDouble, Bath, Users, MapPin, Pencil, Trash2 } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
type HostListingItemProps = {
  listing: {
    id: string;
    title: string;
    description: string;
    locationValue: string;
    imageSrc: string;
    pricePerNight: number;
    category: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
  };
  index: number;
};
export function HostListingItem({ listing, index }: HostListingItemProps) {
  return (
    <article
      className="host-listing-card border-ink-200 bg-surface rounded-3xl border p-4 shadow-sm transition hover:shadow-md md:p-5"
      style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}
    >
      <div className="grid grid-cols-[160px_1fr] gap-4 md:grid-cols-[220px_1fr] md:gap-5">
        <Link
          href={`/listings/${listing.id}`}
          className="border-ink-200 overflow-hidden rounded-2xl border"
        >
          <SafeImage
            src={listing.imageSrc}
            alt={listing.title}
            width={640}
            height={420}
            className="h-full min-h-44 w-full object-cover"
          />
        </Link>

        <Link href={`/listings/${listing.id}`} className="min-w-0">
          <p className="bg-brand-50 text-brand-700 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold">
            {listing.category}
          </p>
          <h3 className="text-ink-900 mt-2 text-lg leading-tight font-semibold">
            {listing.title}
          </h3>
          <p className="text-ink-600 mt-2 inline-flex items-center gap-1.5 text-[0.8rem] md:text-[0.9rem]">
            <MapPin className="h-4 w-4" />
            {listing.locationValue}
          </p>
          <div className="text-ink-600 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Users className="text-ink-500 h-3.5 w-3.5" />
              {listing.guestCount} guests
            </span>
            <span className="bg-ink-300 h-1 w-1 rounded-full" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="text-ink-500 h-3.5 w-3.5" />
              {listing.roomCount} rooms
            </span>
            <span className="bg-ink-300 h-1 w-1 rounded-full" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <Bath className="text-ink-500 h-3.5 w-3.5" />
              {listing.bathroomCount} baths
            </span>
          </div>
        </Link>

        <p className="text-ink-600 line-clamp-2 text-sm leading-relaxed md:col-span-2">
          {listing.description}
        </p>

        <div className="border-ink-200 flex items-end justify-between border-t pt-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <Link
              href={`/host/listings/${listing.id}/edit`}
              className="text-ink-700 hover:bg-ink-100 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold transition"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Link>

            <form action={deleteListing}>
              <input type="hidden" name="listingId" value={listing.id} />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </form>
          </div>

          <p className="text-ink-900 text-lg font-semibold">
            ${listing.pricePerNight}
            <span className="text-ink-600 ml-1 text-sm font-medium">
              / night
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
