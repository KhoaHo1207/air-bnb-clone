import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: LucideIcon;
};

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="border-ink-200 bg-surface rounded-2xl border p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-ink-500 text-xs font-medium tracking-wide uppercase">
            {label}
          </p>
          <p className="text-ink-900 mt-2 text-2xl font-semibold tracking-tight">
            {value}
          </p>
        </div>
        {Icon ? (
          <span className="bg-brand-50 text-brand-600 rounded-full p-2">
            <Icon className="size-4" />
          </span>
        ) : null}
      </div>
    </div>
  );
}
