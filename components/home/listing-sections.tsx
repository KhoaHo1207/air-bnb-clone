import { ChevronRight } from "lucide-react";
import { ListingCard } from "@/components/listings/listing-card";
import type { CityListingGroup, ListingCardData } from "@/types/listing";

type ListingSectionsProps = {
  hasLocationSearch: boolean;
  groupedCards: CityListingGroup[];
  defaultGridCards: ListingCardData[];
  listingQuery: string;
  isEmpty: boolean;
};

export function ListingSections({
  hasLocationSearch,
  groupedCards,
  defaultGridCards,
  listingQuery,
  isEmpty,
}: ListingSectionsProps) {
  if (isEmpty) {
    return (
      <section className="mt-10 md:mt-8">
        <p className="text-ink-600">
          No stays match your current filters. Try adjusting destination, dates,
          or guest count.
        </p>
      </section>
    );
  }

  if (hasLocationSearch) {
    return (
      <section className="mt-10 space-y-10 md:mt-8 md:space-y-9">
        {groupedCards.map((group) => (
          <div key={group.city}>
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-ink-900 text-2xl font-semibold tracking-tight">
                Top stays in {group.city}
              </h2>
              <ChevronRight className="text-ink-700 h-5 w-5" />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {group.items.slice(0, 16).map((item, index) => (
                <ListingCard
                  key={item.id}
                  item={item}
                  listingQuery={listingQuery}
                  priority={index < 2}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="mt-10 md:mt-8">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-ink-900 text-2xl font-semibold tracking-tight">
          Top picks across the United States
        </h2>
        <ChevronRight className="text-ink-700 h-5 w-5" />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {defaultGridCards.map((item, index) => (
          <ListingCard
            key={item.id}
            item={item}
            listingQuery={listingQuery}
            priority={index < 4}
          />
        ))}
      </div>
    </section>
  );
}
