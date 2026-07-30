import HomeSearchBar from "@/components/home-search-bar";
import { CategoryNav } from "@/components/home/category-nav";
import type { HomeSearchParams } from "@/types/listing";

type HomeHeroProps = {
  params: HomeSearchParams;
  hasAnyFilter: boolean;
  guestsLabel: string;
  dateLabel: string;
  locationLabel: string;
};

export function HomeHero({
  params,
  hasAnyFilter,
  guestsLabel,
  dateLabel,
  locationLabel,
}: HomeHeroProps) {
  return (
    <section className="border-ink-200 from-brand-50 via-surface to-ink-50 rounded-3xl border bg-gradient-to-br p-6 md:p-10">
      <div className="mx-auto max-w-[50.5rem] text-center">
        <p className="text-brand-600 text-sm font-semibold tracking-[0.2em] uppercase">
          Thoughtfully selected homes across the United States
        </p>
        <h1 className="text-ink-900 mt-5 text-3xl font-bold tracking-tight md:mt-3 md:text-5xl">
          Find the right place to stay
        </h1>
        <p className="text-ink-600 mx-auto mt-4 max-w-2xl text-sm leading-relaxed md:mt-3 md:text-base">
          Explore professionally presented stays in leading US destinations.
          Filter by location, dates, and guest count to shortlist the best fit
          for your trip.
        </p>
      </div>

      <div className="mx-auto mt-7 max-w-[57.5rem] md:mt-8">
        <HomeSearchBar
          initialLocation={params.location}
          initialGuests={params.guests}
          initialAdults={params.adults}
          initialChildren={params.children}
          initialInfants={params.infants}
          initialCheckIn={params.checkIn}
          initialCheckOut={params.checkOut}
        />
      </div>

      <CategoryNav params={params} hasAnyFilter={hasAnyFilter} />

      <p className="text-ink-600 mx-auto mt-3 max-w-[57.5rem] text-sm">
        Showing stays for{" "}
        <span className="text-ink-900 font-medium">{guestsLabel}</span>
        {" · "}
        <span className="text-ink-900 font-medium">{dateLabel}</span>
        {" · "}
        <span className="text-ink-900 font-medium">{locationLabel}</span>
      </p>
    </section>
  );
}
