"use client";

import { MAX_INFANTS } from "@/lib/booking-rules";

type WhoPanelProps = {
  adults: number;
  childrenCount: number;
  infants: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onInfantsChange: (value: number) => void;
  onClose: () => void;
};

function GuestStepper({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="border-ink-200 flex items-center justify-between border-b py-3 last:border-b-0">
      <div>
        <p className="text-ink-900 font-semibold">{label}</p>
        <p className="text-ink-500 text-sm">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="border-ink-300 text-ink-700 h-8 w-8 rounded-full border"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          -
        </button>
        <span className="w-5 text-center">{value}</span>
        <button
          type="button"
          className="border-ink-300 text-ink-700 h-8 w-8 rounded-full border disabled:opacity-40"
          disabled={typeof max === "number" ? value >= max : false}
          onClick={() =>
            onChange(
              typeof max === "number" ? Math.min(max, value + 1) : value + 1,
            )
          }
        >
          +
        </button>
      </div>
    </div>
  );
}

export function WhoPanel({
  adults,
  childrenCount,
  infants,
  onAdultsChange,
  onChildrenChange,
  onInfantsChange,
  onClose,
}: WhoPanelProps) {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center p-4 md:absolute md:inset-auto md:top-[88px] md:right-3 md:block md:w-[360px]"
      onClick={onClose}
    >
      <div
        className="border-ink-200 bg-surface w-full max-w-md rounded-3xl border p-5 shadow-xl md:max-w-none"
        onClick={(event) => event.stopPropagation()}
      >
        <GuestStepper
          label="Adults"
          hint="Ages 13 or above"
          value={adults}
          min={1}
          onChange={onAdultsChange}
        />
        <GuestStepper
          label="Children"
          hint="Ages 2 to 12"
          value={childrenCount}
          min={0}
          onChange={onChildrenChange}
        />
        <GuestStepper
          label="Infants"
          hint="Under 2"
          value={infants}
          min={0}
          max={MAX_INFANTS}
          onChange={onInfantsChange}
        />
      </div>
    </div>
  );
}
