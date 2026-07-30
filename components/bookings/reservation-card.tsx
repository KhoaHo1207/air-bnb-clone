import { cancelReservation } from "@/actions/reservations";
import { SafeImage } from "@/components/shared/safe-image";
import { format } from "date-fns";
import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";

type ReservationCardProps = {
  reservation: {
    id: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    listing: {
      id: string;
      title: string;
      imageSrc: string;
      locationValue: string;
    };
  };
  today: Date;
};

export function ReservationCard({ reservation, today }: ReservationCardProps) {
  const isActive = reservation.endDate >= today;
  const nights = Math.max(
    1,
    Math.ceil(
      (reservation.endDate.getTime() - reservation.startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  return (
    <article className="border-ink-200 bg-surface overflow-hidden rounded-2xl border shadow-sm md:grid md:grid-cols-[220px_1fr]">
      <Link href={`/listings/${reservation.listing.id}`} className="block">
        <SafeImage
          src={reservation.listing.imageSrc}
          alt={reservation.listing.title}
          width={640}
          height={420}
          className="h-44 w-full object-cover md:h-full"
        />
      </Link>

      <div className="flex flex-col justify-between gap-4 p-4 md:p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-ink-100 text-ink-600"
              }`}
            >
              {isActive ? "Upcoming / active" : "Completed"}
            </span>
            <p className="text-ink-500 inline-flex items-center gap-1 text-xs">
              <MapPin className="size-3.5" />
              {reservation.listing.locationValue}
            </p>
          </div>

          <Link
            href={`/listings/${reservation.listing.id}`}
            className="text-ink-900 hover:text-brand-600 mt-2 block text-lg font-semibold tracking-tight"
          >
            {reservation.listing.title}
          </Link>

          <p className="text-ink-600 mt-2 inline-flex items-center gap-1.5 text-sm">
            <CalendarDays className="size-4" />
            {format(reservation.startDate, "MMM d, yyyy")} –{" "}
            {format(reservation.endDate, "MMM d, yyyy")}
            <span className="text-ink-400">· {nights} nights</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-ink-900 text-sm font-semibold">
            Total ${reservation.totalPrice}
          </p>

          {isActive ? (
            <form action={cancelReservation}>
              <input
                type="hidden"
                name="reservationId"
                value={reservation.id}
              />
              <button
                type="submit"
                className="border-ink-300 text-ink-700 hover:bg-ink-50 rounded-full border px-3 py-1.5 text-xs font-semibold"
              >
                Cancel reservation
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </article>
  );
}
