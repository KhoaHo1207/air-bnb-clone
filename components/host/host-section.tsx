import type { ReactNode } from "react";
type HostSectionProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};
export function HostSection({
  title,
  description,
  action,
  children,
}: HostSectionProps) {
  return (
    <section className="border-ink-200 bg-surface rounded-3xl border p-5 shadow-sm md:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-ink-900 text-lg font-semibold md:text-xl">
            {title}
          </h2>

          {description ? (
            <p className="text-ink-600 mt-1 text-sm">{description}</p>
          ) : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>

      {children}
    </section>
  );
}
