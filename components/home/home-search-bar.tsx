"use client";

import { SearchSubmitButton } from "@/components/home/search-submit-button";
import { WhenPanel } from "@/components/home/when-panel";
import { WherePanel } from "@/components/home/where-panel";
import { WhoPanel } from "@/components/home/who-panel";
import { toValidDate } from "@/lib/date-utils";
import type { ActivePanel, HomeSearchBarProps } from "@/types";
import { format } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";

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
  const [childrenCount, setChildrenCount] = useState(
    Number(initialChildren || 0),
  );
  const [infants, setInfants] = useState(Number(initialInfants || 0));
  const [range, setRange] = useState<DateRange | undefined>({
    from: toValidDate(initialCheckIn),
    to: toValidDate(initialCheckOut),
  });
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const totalGuests = adults + childrenCount + infants;

  const whenLabel = useMemo(() => {
    if (!range?.from || !range?.to) return "Add dates";
    if (range.from && !range.to) return `${format(range.from, "MMM d")} - Add`;
    if (range.from && range.to) {
      return `${format(range.from, "MMM d")} - ${format(range.to, "MMM d")}`;
    }
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
      if (!containerRef.current.contains(target)) setActivePanel(null);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  function togglePanel(panel: Exclude<ActivePanel, null>) {
    setActivePanel((current) => (current === panel ? null : panel));
  }

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
        />
      ) : null}

      <form
        action="/"
        method="get"
        className="border-ink-300 rounded-3xl border p-2.5 shadow-sm md:rounded-full md:p-1.5"
      >
        <div className="space-y-2 md:hidden">
          <TriggerButton
            label="Where"
            value={location || "Choose a destination"}
            onClick={() => togglePanel("where")}
          />
          <TriggerButton
            label="When"
            value={whenLabel}
            onClick={() => togglePanel("when")}
          />
          <TriggerButton
            label="Who"
            value={
              totalGuests > 0
                ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                : "Add travelers"
            }
            onClick={() => togglePanel("who")}
          />
          <div className="pt-2">
            <SearchSubmitButton />
          </div>
        </div>

        <div className="hidden gap-1 md:grid md:grid-cols-[1.5fr_1.5fr_1fr_auto]">
          <TriggerButton
            label="Where"
            value={location || "Choose a destination"}
            onClick={() => togglePanel("where")}
            desktop
          />
          <TriggerButton
            label="When"
            value={whenLabel}
            onClick={() => togglePanel("when")}
            desktop
          />
          <TriggerButton
            label="Who"
            value={
              totalGuests > 0
                ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                : "Add travelers"
            }
            onClick={() => togglePanel("who")}
            desktop
          />
          <SearchSubmitButton />
        </div>

        <input type="hidden" name="location" value={location} />
        <input type="hidden" name="guests" value={totalGuests} />
        <input type="hidden" name="adults" value={adults} />
        <input type="hidden" name="children" value={childrenCount} />
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
        <WherePanel
          onClose={() => setActivePanel(null)}
          onSelect={(city) => {
            setLocation(city);
            setActivePanel(null);
          }}
        />
      ) : null}

      {activePanel === "when" ? (
        <WhenPanel
          range={range}
          onSelect={setRange}
          numberOfMonths={isDesktopViewport ? 2 : 1}
          onClose={() => setActivePanel(null)}
        />
      ) : null}

      {activePanel === "who" ? (
        <WhoPanel
          adults={adults}
          childrenCount={childrenCount}
          infants={infants}
          onAdultsChange={setAdults}
          onChildrenChange={setChildrenCount}
          onInfantsChange={setInfants}
          onClose={() => setActivePanel(null)}
        />
      ) : null}
    </div>
  );
}

function TriggerButton({
  label,
  value,
  onClick,
  desktop = false,
}: {
  label: string;
  value: string;
  onClick: () => void;
  desktop?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        desktop
          ? "hover:bg-ink-100 rounded-full border border-transparent px-4 py-2 text-left"
          : "border-ink-200 bg-surface shadow-ink-900/5 hover:bg-ink-100 w-full rounded-2xl border px-4 py-2.5 text-left shadow-sm transition"
      }
    >
      <span className="text-ink-900 block text-xs font-semibold">{label}</span>
      <span className="text-ink-600 block text-sm">{value}</span>
    </button>
  );
}
