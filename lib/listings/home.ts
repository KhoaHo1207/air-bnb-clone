import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import type {
  CityListingGroup,
  HomeSearchParams,
  ListingCardData,
} from "@/types/listing";

function groupByCity(cards: ListingCardData[]): CityListingGroup[] {
  const grouped = new Map<string, ListingCardData[]>();
  for (const card of cards) {
    const list = grouped.get(card.city) ?? [];
    list.push(card);
    grouped.set(card.city, list);
  }
  return Array.from(grouped.entries()).map(([city, items]) => ({
    city,
    items,
  }));
}

export function formatDateRange(checkIn?: string, checkOut?: string) {
  if (!checkIn || !checkOut) return "Anytime";
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Anytime";
  }
  return `${format(start, "MMM d")}–${format(end, "MMM d")}`;
}

export function buildListingQuery(params: HomeSearchParams) {
  const listingQueryParams = new URLSearchParams();
  if (params.location) listingQueryParams.set("location", params.location);
  if (params.checkIn) listingQueryParams.set("checkIn", params.checkIn);
  if (params.checkOut) listingQueryParams.set("checkOut", params.checkOut);
  if (params.guests) listingQueryParams.set("guests", params.guests);
  if (params.adults) listingQueryParams.set("adults", params.adults);
  if (params.children) listingQueryParams.set("children", params.children);
  if (params.infants) listingQueryParams.set("infants", params.infants);
  return listingQueryParams.toString();
}

export function buildListingHref(listingId: string, listingQuery: string) {
  return `/listings/${listingId}${listingQuery ? `?${listingQuery}` : ""}`;
}

function getRequestedGuests(params: HomeSearchParams) {
  return (
    Number(params.adults ?? 0) +
      Number(params.children ?? 0) +
      Number(params.infants ?? 0) ||
    Number(params.guests ?? 1) ||
    1
  );
}

function formatGuestsLabel(params: HomeSearchParams, requestedGuests: number) {
  const adults = Number(params.adults ?? 0) || 0;
  const children = Number(params.children ?? 0) || 0;
  const infants = Number(params.infants ?? 0) || 0;
  const guestParts: string[] = [];
  if (adults > 0) guestParts.push(`${adults} adult${adults > 1 ? "s" : ""}`);
  if (children > 0) {
    guestParts.push(`${children} child${children > 1 ? "ren" : ""}`);
  }
  if (infants > 0) {
    guestParts.push(`${infants} infant${infants > 1 ? "s" : ""}`);
  }
  return guestParts.length > 0
    ? guestParts.join(", ")
    : `${requestedGuests} guest${requestedGuests > 1 ? "s" : ""}`;
}

function parseDateBound(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isListingAvailable(
  reservations: Array<{ startDate: Date; endDate: Date }>,
  checkIn?: string,
  checkOut?: string,
) {
  const start = parseDateBound(checkIn);
  const end = parseDateBound(checkOut);
  if (!start || !end || end <= start) return true;
  return !reservations.some(
    (reservation) => reservation.startDate < end && reservation.endDate > start,
  );
}

export async function getHomeListings(params: HomeSearchParams) {
  const hasLocationSearch = Boolean(params.location?.trim());
  const hasAnyFilter = Boolean(
    params.location?.trim() ||
    params.category?.trim() ||
    params.checkIn?.trim() ||
    params.checkOut?.trim() ||
    params.guests?.trim() ||
    params.adults?.trim() ||
    params.children?.trim() ||
    params.infants?.trim(),
  );

  const requestedGuests = getRequestedGuests(params);
  const location = params.location?.trim();
  const category = params.category?.trim();

  const dbListings = await prisma.listing.findMany({
    where: {
      ...(location
        ? {
            locationValue: {
              contains: location,
              mode: "insensitive",
            },
          }
        : {}),
      ...(category
        ? {
            category: {
              equals: category,
              mode: "insensitive",
            },
          }
        : {}),
      guestCount: { gte: requestedGuests },
    },
    include: {
      user: { select: { name: true } },
      reservations: {
        select: { startDate: true, endDate: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 60,
  });

  const unifiedCards: ListingCardData[] = dbListings
    .filter((listing) =>
      isListingAvailable(listing.reservations, params.checkIn, params.checkOut),
    )
    .map((listing) => ({
      id: listing.id,
      title: listing.title,
      image: listing.imageSrc,
      city: listing.locationValue,
      category: listing.category,
      hostName: listing.user?.name ?? "Host",
      rating: 4.9,
      price: listing.pricePerNight,
      maxGuests: listing.guestCount,
    }));

  const limitedCards = unifiedCards.slice(0, 20);
  const groupedCards = groupByCity(limitedCards).slice(0, 8);
  const listingQuery = buildListingQuery(params);

  return {
    unifiedCards,
    limitedCards,
    groupedCards,
    hasLocationSearch,
    hasAnyFilter,
    listingQuery,
    locationLabel: location || "Anywhere",
    dateLabel: formatDateRange(params.checkIn, params.checkOut),
    guestsLabel: formatGuestsLabel(params, requestedGuests),
  };
}
