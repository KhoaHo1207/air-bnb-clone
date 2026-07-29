import { toValidDate } from "@/lib/date-utils";
import { ActivePanel, HomeSearchBarProps } from "@/types";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { useFormStatus } from "react-dom";

function SerachSubmitButton() {
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
  const containerref = useRef<HTMLDivElement>(null);
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

  return <div>HomeSearchBar</div>;
}
