import { CalendarCheck2, CalendarX2, Wallet } from "lucide-react";
import { PageIntro } from "@/components/shared/page-intro";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ReservationCard } from "@/components/bookings/reservation-card";
import { uiShell } from "@/lib/ui-classes";
import { getUserReservations } from "@/lib/reservations/get-user-reservations";

type BookingsPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function BookingsPage({
  searchParams,
}: BookingsPageProps) {
  const query = await searchParams;
  const { reservations, today, activeBookings, totalCharged } =
    await getUserReservations();

  return (
    <main className={uiShell.pageContainer}>
      <PageIntro
        badge="Your bookings"
        icon={CalendarCheck2}
        title="Your reservations"
        description="Track upcoming stays, review completed trips, and manage active bookings."
      />

      {query.message ? (
        <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
          {query.message}
        </p>
      ) : null}

      <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total bookings" value={reservations.length} />
        <StatCard label="Active bookings" value={activeBookings.length} />
        <StatCard
          label="Total spend"
          value={`$${totalCharged}`}
          icon={Wallet}
        />
      </section>

      <section className="mt-6 space-y-3 md:space-y-4">
        {reservations.length === 0 ? (
          <EmptyState
            icon={CalendarX2}
            title="No reservations yet"
            description="Reserve your first stay and it will appear here."
            actionHref="/"
            actionLabel="Browse homes"
          />
        ) : (
          reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              today={today}
            />
          ))
        )}
      </section>
    </main>
  );
}
