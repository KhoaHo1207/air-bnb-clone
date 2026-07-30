import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export type ListingDetailSearchParams = {
  booking?: string;
  message?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
  infants?: string;
};

export async function getListingDetail(
  listingId: string,
  query: ListingDetailSearchParams,
) {
  const [dbListing, user] = await Promise.all([
    prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    }),
    getCurrentUser(),
  ]);

  if (!dbListing) notFound();

  const listing = {
    id: dbListing.id,
    title: dbListing.title,
    description: dbListing.description,
    locationValue: dbListing.locationValue,
    imageSrc: dbListing.imageSrc,
    imageGallery: dbListing.imageGallery,
    pricePerNight: dbListing.pricePerNight,
    category: dbListing.category,
    guestCount: dbListing.guestCount,
    roomCount: dbListing.roomCount,
    bathroomCount: dbListing.bathroomCount,
    hostName: dbListing.user?.name ?? "Verified Host",
  };

  const [reservationCount, recentReservations, userActiveReservation] =
    await Promise.all([
      prisma.reservation.count({ where: { listingId } }),
      prisma.reservation.findMany({
        where: { listingId },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      user
        ? prisma.reservation.findFirst({
            where: {
              listingId,
              userId: user.id,
              endDate: { gte: new Date() },
            },
            orderBy: { startDate: "asc" },
            select: { startDate: true, endDate: true },
          })
        : Promise.resolve(null),
    ]);

  const bookedRanges = recentReservations.map((reservation) => ({
    startDate: reservation.startDate,
    endDate: reservation.endDate,
  }));

  return {
    listing,
    hostRating: 4.9,
    isDemoListing: dbListing.category === "Demo Stay",
    reservationCount,
    bookedRanges,
    userActiveReservation,
    isLoggedIn: Boolean(user),
    bookingStatus: (query.booking === "success" || query.booking === "error"
      ? query.booking
      : null) as "success" | "error" | null,
    bookingMessage: query.message ?? null,
    initialCheckIn: query.checkIn,
    initialCheckOut: query.checkOut,
    initialAdults: query.adults,
    initialChildren: query.children,
    initialInfants: query.infants,
  };
}
