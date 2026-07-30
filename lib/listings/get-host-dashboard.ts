import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getHostDashboardData() {
  const user = await requireUser();
  const listings = await prisma.listing.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const listingCount = listings.length;
  const avgNightlyRate = listingCount
    ? Math.round(
        listings.reduce((total, listing) => total + listing.pricePerNight, 0) /
          listingCount,
      )
    : 0;
  const totalCapacity = listings.reduce(
    (total, listing) => total + listing.guestCount,
    0,
  );

  return { user, listings, listingCount, avgNightlyRate, totalCapacity };
}
