type ListingMapProps = {
  locationValue: string;
};
export function ListingMap({ locationValue }: ListingMapProps) {
  return (
    <section className="border-ink-200 from-ink-50 via-surface to-ink-50 overflow-hidden rounded-3xl border bg-gradient-to-br p-4 shadow-sm md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-2">
          <h2 className="text-ink-900 text-lg font-semibold md:text-xl">
            Where you&apos;ll be
          </h2>

          <p className="text-ink-600 text-sm">
            {locationValue}. The map pin is approximate and shown for trip
            planning.
          </p>
        </div>
      </div>
      <div className="border-ink-200 mt-4 overflow-hidden rounded-2xl border">
        <iframe
          title={`Map for ${locationValue}`}
          src={`https://www.google.com/maps?hl=en&q=${encodeURIComponent(locationValue)}&z=14&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full border-0 md:h-80"
        />
      </div>
    </section>
  );
}
