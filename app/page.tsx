import { HomeHero } from "@/components/home/home-hero";
import { ListingSections } from "@/components/home/listing-sections";
import { Footer } from "@/components/layout/footer";
import { getHomeListings } from "@/lib/listings/home";
import type { HomeSearchParams } from "@/types/listing";
import type { Metadata } from "next";

type HomePageProps = {
  searchParams: Promise<HomeSearchParams>;
};

export const metadata: Metadata = {
  title: "Home",
  description: "Find the right place to stay",
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const {
    unifiedCards,
    limitedCards,
    groupedCards,
    hasLocationSearch,
    hasAnyFilter,
    listingQuery,
    locationLabel,
    dateLabel,
    guestsLabel,
  } = await getHomeListings(params);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pt-8 pb-14 md:px-8 md:pt-6 md:pb-12">
      <HomeHero
        params={params}
        hasAnyFilter={hasAnyFilter}
        guestsLabel={guestsLabel}
        dateLabel={dateLabel}
        locationLabel={locationLabel}
      />

      <ListingSections
        hasLocationSearch={hasLocationSearch}
        groupedCards={groupedCards}
        defaultGridCards={limitedCards}
        listingQuery={listingQuery}
        isEmpty={unifiedCards.length === 0}
      />

      <Footer />
    </main>
  );
}
