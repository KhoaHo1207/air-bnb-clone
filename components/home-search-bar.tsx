"use client";

import { toValidDate } from "@/lib/date-utils";
import { ActivePanel, HomeSearchBarProps } from "@/types";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { useFormStatus } from "react-dom";
import { DateRangePicker } from "./date-range-picker";
import { MAX_INFANTS } from "@/lib/booking-rules";

function SearchSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-brand-500 hover:bg-brand-600 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white disabled:opacity-70 md:w-auto"
    >
      <Search className="size-4" />
      {pending ? "Searching..." : "Search"}
    </button>
  );
}

export default function HomeSearchBar({
  initialLocation,
  initialGuests,
  initialAdults,
  initialChildren,
  initialInfants,
  initialCheckIn,
  initialCheckOut,
}: HomeSearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [location, setLocation] = useState(initialLocation ?? "");
  const [adults, setAdults] = useState(
    Number(initialAdults || initialGuests || 1),
  );
  const [children, setChildren] = useState(Number(initialChildren || 0));
  const [infants, setInfants] = useState(Number(initialInfants || 0));
  const [range, setRange] = useState<DateRange | undefined>({
    from: toValidDate(initialCheckIn),
    to: toValidDate(initialCheckOut),
  });
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const totalGuests = adults + children + infants;

  const whenLabel = useMemo(() => {
    if (!range?.from || !range?.to) return "Add dates";

    if (range?.from && !range?.to)
      return `${format(range.from, "MMM d")} - Add`;

    if (range?.from && range?.to)
      return `${format(range.from, "MMM d")} - ${format(range.to, "MMM d")}`;

    return "Add dates";
  }, [range]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncViewport = () => setIsDesktopViewport(mediaQuery.matches);
    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);
    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (!containerRef.current) return;

      const target = event.target as Node;
      if (!containerRef.current.contains(target)) {
        setActivePanel(null);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);
  return (
    <div
      ref={containerRef}
      className="bg-surface md:border-ink-200 relative rounded-4xl p-2.5 shadow-sm md:border md:p-4"
    >
      {activePanel ? (
        <button
          type="button"
          aria-label="Close panel"
          className="bg-ink-900/20 fixed inset-0 z-10 backdrop-blur-sm"
          onClick={() => setActivePanel(null)}
        ></button>
      ) : null}

      <form className="border-ink-300 rounded-3xl border p-2.5 shadow-sm md:rounded-full md:p-1.5">
        <div className="space-y-2 md:hidden">
          <button
            type="button"
            onClick={() =>
              setActivePanel(activePanel === "where" ? null : "where")
            }
            className="border-ink-200 bg-surface shadow-ink-900/5 hover:bg-ink-100 w-full rounded-2xl border px-4 py-2.5 text-left shadow-sm transition md:border-transparent md:bg-transparent md:shadow-none"
          >
            <span className="text-ink-900 block text-xs font-semibold">
              Where
            </span>
            <span className="text-ink-600 block text-sm">
              {location || "Choose a destination"}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setActivePanel(activePanel === "when" ? null : "when")
            }
            className="border-ink-200 bg-surface shadow-ink-900/5 hover:bg-ink-100 w-full rounded-2xl border px-4 py-2.5 text-left shadow-sm transition md:border-transparent md:bg-transparent md:shadow-none"
          >
            <span className="text-ink-900 block text-xs font-semibold">
              When
            </span>
            <span className="text-ink-600 block text-sm">{whenLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePanel(activePanel === "who" ? null : "who")}
            className="border-ink-200 bg-surface shadow-ink-900/5 hover:bg-ink-100 w-full rounded-2xl border px-4 py-2.5 text-left shadow-sm transition md:border-transparent md:bg-transparent md:shadow-none"
          >
            <span className="text-ink-900 block text-xs font-semibold">
              Who
            </span>
            <span className="text-ink-600 block text-sm">
              {totalGuests > 0
                ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                : "Add travelers"}
            </span>
          </button>

          <div className="pt-2">
            <SearchSubmitButton />
          </div>
        </div>

        <div className="hidden gap-1 md:grid md:grid-cols-[1.5fr_1.5fr_1fr_auto]">
          <button
            type="button"
            onClick={() =>
              setActivePanel(activePanel === "where" ? null : "where")
            }
            className="hover:bg-ink-100 rounded-full border border-transparent px-4 py-2 text-left"
          >
            <span className="text-ink-900 block text-xs font-semibold">
              Where
            </span>
            <span className="text-ink-600 block text-sm">
              {location || "Choose a destination"}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setActivePanel(activePanel === "when" ? null : "when")
            }
            className="hover:bg-ink-100 rounded-full border border-transparent px-4 py-2 text-left"
          >
            <span className="text-ink-900 block text-xs font-semibold">
              When
            </span>
            <span className="text-ink-600 block text-sm">{whenLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePanel(activePanel === "who" ? null : "who")}
            className="hover:bg-ink-100 rounded-full border border-transparent px-4 py-2 text-left"
          >
            <span className="text-ink-900 block text-xs font-semibold">
              Who
            </span>
            <span className="text-ink-600 block text-sm">
              {totalGuests > 0
                ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                : "Add travelers"}
            </span>
          </button>

          <SearchSubmitButton />
        </div>

        <input type="hidden" name="location" value={location} />
        <input type="hidden" name="guests" value={totalGuests} />
        <input type="hidden" name="adults" value={adults} />
        <input type="hidden" name="children" value={children} />
        <input type="hidden" name="infants" value={infants} />
        <input
          type="hidden"
          name="checkIn"
          value={range?.from ? format(range.from, "yyyy-MM-dd") : ""}
        />
        <input
          type="hidden"
          name="checkOut"
          value={range?.to ? format(range.to, "yyyy-MM-dd") : ""}
        />
      </form>

      {activePanel === "where" ? (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center p-4 md:absolute md:inset-auto md:top-[88px] md:left-3 md:block md:w-[420px]"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="border-ink-200 bg-surface w-full max-w-md rounded-3xl border p-4 shadow-xl md:max-w-none"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-ink-900 mb-2 text-sm font-semibold">
              Popular destinations
            </p>
            <div className="space-y-2">
              {[
                "New York, United States",
                "Los Angeles, United States",
                "Miami, United States",
                "Chicago, United States",
                "San Francisco, United States",
              ].map((city) => (
                <button
                  key={city}
                  type="button"
                  className="text-ink-700 hover:bg-ink-100 block w-full rounded-xl px-3 py-2 text-left text-sm"
                  onClick={() => {
                    setLocation(city);
                    setActivePanel(null);
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {activePanel === "when" ? (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center p-4 md:absolute md:inset-auto md:top-[88px] md:left-1/2 md:block md:w-[min(960px,calc(100vw-2rem))] md:-translate-x-1/2"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="border-ink-200 bg-surface max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-auto rounded-[28px] border p-4 shadow-xl md:max-h-none md:max-w-none md:rounded-[32px] md:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <DateRangePicker
              selected={range}
              onSelect={setRange}
              numberOfMonths={isDesktopViewport ? 2 : 1}
            />
          </div>
        </div>
      ) : null}

      {activePanel === "who" ? (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center p-4 md:absolute md:inset-auto md:top-[88px] md:right-3 md:block md:w-[360px]"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="border-ink-200 bg-surface w-full max-w-md rounded-3xl border p-5 shadow-xl md:max-w-none"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-ink-200 flex items-center justify-between border-b py-3">
              <div>
                <p className="text-ink-900 font-semibold">Adults</p>
                <p className="text-ink-500 text-sm">Ages 13 or above</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="border-ink-300 text-ink-700 h-8 w-8 rounded-full border"
                  onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="w-5 text-center">{adults}</span>
                <button
                  type="button"
                  className="border-ink-300 text-ink-700 h-8 w-8 rounded-full border"
                  onClick={() => setAdults((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="border-ink-200 flex items-center justify-between border-b py-3">
              <div>
                <p className="text-ink-900 font-semibold">Children</p>
                <p className="text-ink-500 text-sm">Ages 2 to 12</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="border-ink-300 text-ink-700 h-8 w-8 rounded-full border"
                  onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                >
                  -
                </button>
                <span className="w-5 text-center">{children}</span>
                <button
                  type="button"
                  className="border-ink-300 text-ink-700 h-8 w-8 rounded-full border"
                  onClick={() => setChildren((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-ink-900 font-semibold">Infants</p>
                <p className="text-ink-500 text-sm">Under 2</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="border-ink-300 text-ink-700 h-8 w-8 rounded-full border"
                  onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
                >
                  -
                </button>
                <span className="w-5 text-center">{infants}</span>
                <button
                  type="button"
                  className="border-ink-300 text-ink-700 h-8 w-8 rounded-full border disabled:opacity-40"
                  disabled={infants >= MAX_INFANTS}
                  onClick={() =>
                    setInfants((prev) => Math.min(MAX_INFANTS, prev + 1))
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
