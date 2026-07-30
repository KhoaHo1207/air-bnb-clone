import Link from "next/link";
import { Star } from "lucide-react";
import SafeImage from "@/components/safe-image";
import { buildListingHref } from "@/lib/listings/home";
import type { ListingCardData } from "@/types/listing";

type ListingCardProps = {
  item: ListingCardData;
  listingQuery: string;
  priority?: boolean;
};

export function ListingCard({
  item,
  listingQuery,
  priority = false,
}: ListingCardProps) {
  return (
    <Link
      href={buildListingHref(item.id, listingQuery)}
      className="block space-y-2"
    >
      <div className="overflow-hidden rounded-2xl">
        <SafeImage
          src={item.image}
          alt={item.title}
          width={420}
          height={280}
          className="h-48 w-full object-cover"
          priority={priority}
        />
      </div>
      <div className="space-y-0.5 px-0.5">
        <p className="bg-ink-100 text-ink-700 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium">
          {item.city}
        </p>
        <p className="text-ink-900 line-clamp-1 text-sm font-medium">
          {item.title}
        </p>
        <p className="text-ink-500 line-clamp-1 text-xs">
          ${item.price} for 2 nights
          <span className="ml-1 inline-flex items-center gap-0.5">
            <Star className="text-ink-700 h-3 w-3 fill-current" />
            {item.rating}
          </span>
        </p>
      </div>
    </Link>
  );
}
