import type { LucideIcon } from "lucide-react";

type PageIntroProps = {
  badge: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
};

export function PageIntro({
  badge,
  title,
  description,
  icon: Icon,
  action,
}: PageIntroProps) {
  return (
    <section className="border-ink-200 from-brand-50 via-surface to-ink-50 rounded-3xl border bg-gradient-to-br p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-brand-600 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase">
            {Icon ? <Icon className="size-3.5" /> : null}
            {badge}
          </p>
          <h1 className="text-ink-900 mt-3 text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h1>
          <p className="text-ink-600 mt-2 max-w-2xl text-sm leading-relaxed md:text-base">
            {description}
          </p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </section>
  );
}
