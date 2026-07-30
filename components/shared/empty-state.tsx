import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { uiShell } from "@/lib/ui-classes";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({
  title,
  description,
  icon: Icon,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className={uiShell.emptyState}>
      {Icon ? (
        <Icon className="text-ink-400 mx-auto mb-3 size-8" aria-hidden />
      ) : null}
      <p className="text-ink-900 text-sm font-semibold">{title}</p>
      <p className="text-ink-600 mx-auto mt-1 max-w-sm text-sm">
        {description}
      </p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="bg-brand-500 hover:bg-brand-600 mt-4 inline-flex rounded-full px-4 py-2 text-xs font-semibold text-white"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
