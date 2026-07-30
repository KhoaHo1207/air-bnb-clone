import { format } from "date-fns";
import { fetchDemoProperties } from "@/lib/demo-properties";
import {
  HOME_CATEGORY_LABELS,
  type CityListingGroup,
  type HomeSearchParams,
  type ListingCardData,
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

export function normalizeUsCity(location: string) {
  const lower = location.toLowerCase();
  if (lower.includes("new york")) return "New York, United States";
  if (lower.includes("los angeles")) return "Los Angeles, United States";
  if (lower.includes("miami")) return "Miami, United States";
  if (lower.includes("chicago")) return "Chicago, United States";
  if (lower.includes("san francisco")) return "San Francisco, United States";
  if (lower.includes("seattle")) return "Seattle, United States";
  if (lower.includes("boston")) return "Boston, United States";
  return "United States";
}

function buildDateRangeInclusive(start: Date, end: Date) {
  const dates: string[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

export function isRangeAvailable(
  availableDates: string[],
  checkIn?: string,
  checkOut?: string,
) {
  if (!checkIn || !checkOut) return true;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end < start
  ) {
    return true;
  }
  const requested = buildDateRangeInclusive(start, end);
  if (availableDates.length === 0) return true;
  const mdSet = new Set(
    availableDates
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .map((d) => d.slice(5)),
  );
  return requested.every((d) => mdSet.has(d.slice(5)));
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

  const demoProperties = await fetchDemoProperties();
  const allCards: ListingCardData[] = demoProperties.map((property, index) => ({
    id: property.id,
    title: property.title,
    image: property.image,
    city: normalizeUsCity(property.city),
    category:
      HOME_CATEGORY_LABELS[index % HOME_CATEGORY_LABELS.length] ?? "Trending",
    hostName: property.hostName,
    rating: property.rating,
    price: property.pricePerNight,
    maxGuests: property.maxGuests,
    availableDates: property.availableDates,
    isExternal: true,
  }));

  const requestedGuests = getRequestedGuests(params);
  const unifiedCards = allCards.filter((card) => {
    const byLocation = params.location
      ? card.city.toLowerCase().includes(params.location.toLowerCase())
      : true;
    const byCategory = params.category
      ? card.category.toLowerCase() === params.category.toLowerCase()
      : true;
    const byGuests = card.maxGuests >= requestedGuests;
    const byAvailability = isRangeAvailable(
      card.availableDates,
      params.checkIn,
      params.checkOut,
    );
    return byLocation && byCategory && byGuests && byAvailability;
  });

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
    locationLabel: params.location?.trim() || "Anywhere",
    dateLabel: formatDateRange(params.checkIn, params.checkOut),
    guestsLabel: formatGuestsLabel(params, requestedGuests),
  };
}
