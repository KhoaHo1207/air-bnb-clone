import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUserReservations() {
  const user = await requireUser();
  const reservations = await prisma.reservation.findMany({
    where: { userId: user.id },
    include: { listing: true },
    orderBy: { createdAt: "desc" },
  });

  const today = new Date();
  const activeBookings = reservations.filter(
    (reservation) => reservation.endDate >= today,
  );
  const totalCharged = reservations.reduce(
    (sum, reservation) => sum + reservation.totalPrice,
    0,
  );

  return { user, reservations, today, activeBookings, totalCharged };
}
