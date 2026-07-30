import Link from "next/link";
import {
  Flame,
  Home,
  Landmark,
  Mountain,
  Palmtree,
  Snowflake,
  TreePalm,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { HOME_CATEGORY_LABELS, type HomeSearchParams } from "@/types/listing";

const CATEGORY_ICONS: Record<
  (typeof HOME_CATEGORY_LABELS)[number],
  LucideIcon
> = {
  "Scenic views": Mountain,
  Beachfront: Palmtree,
  "Guest favorites": Flame,
  Cabins: Home,
  "Countryside stays": TreePalm,
  Lakefront: Waves,
  "Historic homes": Landmark,
  "Ski-in/out": Snowflake,
};

type CategoryNavProps = {
  params: HomeSearchParams;
  hasAnyFilter: boolean;
};

function buildCategoryHref(label: string, params: HomeSearchParams) {
  const query = new URLSearchParams();
  query.set("category", label);
  if (params.location) query.set("location", params.location);
  if (params.guests) query.set("guests", params.guests);
  if (params.adults) query.set("adults", params.adults);
  if (params.children) query.set("children", params.children);
  if (params.infants) query.set("infants", params.infants);
  if (params.checkIn) query.set("checkIn", params.checkIn);
  if (params.checkOut) query.set("checkOut", params.checkOut);
  return `/?${query.toString()}`;
}

export function CategoryNav({ params, hasAnyFilter }: CategoryNavProps) {
  return (
    <div className="mx-auto mt-6 flex max-w-[57.5rem] items-start justify-between gap-3">
      <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1 whitespace-nowrap">
        {HOME_CATEGORY_LABELS.map((label) => {
          const Icon = CATEGORY_ICONS[label];
          const isActive = params.category === label;
          return (
            <Link
              key={label}
              href={buildCategoryHref(label, params)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-ink-900 bg-ink-900 text-white"
                  : "border-ink-300 text-ink-700 hover:bg-ink-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
      {hasAnyFilter ? (
        <Link
          href="/"
          className="border-ink-300 text-ink-700 hover:bg-ink-100 inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
        >
          Clear filters
        </Link>
      ) : null}
    </div>
  );
}
