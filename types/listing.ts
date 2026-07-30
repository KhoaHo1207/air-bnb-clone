export const HOME_CATEGORY_LABELS = [
  "Scenic views",
  "Beachfront",
  "Guest favorites",
  "Cabins",
  "Countryside stays",
  "Lakefront",
  "Historic homes",
  "Ski-in/out",
] as const;

export type HomeCategoryLabel = (typeof HOME_CATEGORY_LABELS)[number];

export type HomeSearchParams = {
  location?: string;
  category?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  adults?: string;
  children?: string;
  infants?: string;
};

export type ListingCardData = {
  id: string;
  title: string;
  image: string;
  city: string;
  category: string;
  hostName: string;
  rating: number;
  price: number;
  maxGuests: number;
};

export type CityListingGroup = {
  city: string;
  items: ListingCardData[];
};
