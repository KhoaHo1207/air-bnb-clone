"use client";

import { DateRangePicker } from "@/components/shared/date-range-picker";
import type { DateRange } from "react-day-picker";

type WhenPanelProps = {
  range: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  numberOfMonths: number;
  onClose: () => void;
};

export function WhenPanel({
  range,
  onSelect,
  numberOfMonths,
  onClose,
}: WhenPanelProps) {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center p-4 md:absolute md:inset-auto md:top-[88px] md:left-1/2 md:block md:w-[min(960px,calc(100vw-2rem))] md:-translate-x-1/2"
      onClick={onClose}
    >
      <div
        className="border-ink-200 bg-surface max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-auto rounded-[28px] border p-4 shadow-xl md:max-h-none md:max-w-none md:rounded-[32px] md:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <DateRangePicker
          selected={range}
          onSelect={onSelect}
          numberOfMonths={numberOfMonths}
        />
      </div>
    </div>
  );
}
