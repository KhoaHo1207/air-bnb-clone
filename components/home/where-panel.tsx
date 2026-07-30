"use client";

const POPULAR_DESTINATIONS = [
  "New York, United States",
  "Los Angeles, United States",
  "Miami, United States",
  "Chicago, United States",
  "San Francisco, United States",
] as const;

type WherePanelProps = {
  onSelect: (city: string) => void;
  onClose: () => void;
};

export function WherePanel({ onSelect, onClose }: WherePanelProps) {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center p-4 md:absolute md:inset-auto md:top-[88px] md:left-3 md:block md:w-[420px]"
      onClick={onClose}
    >
      <div
        className="border-ink-200 bg-surface w-full max-w-md rounded-3xl border p-4 shadow-xl md:max-w-none"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-ink-900 mb-2 text-sm font-semibold">
          Popular destinations
        </p>
        <div className="space-y-2">
          {POPULAR_DESTINATIONS.map((city) => (
            <button
              key={city}
              type="button"
              className="text-ink-700 hover:bg-ink-100 block w-full rounded-xl px-3 py-2 text-left text-sm"
              onClick={() => onSelect(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
