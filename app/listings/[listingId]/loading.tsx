export default function ListingDetailsLoading() {
  return (
    <main
      role="status"
      aria-label="Loading listing details"
      className="mx-auto min-h-screen max-w-7xl animate-pulse px-4 pt-5 pb-10 md:px-8 md:pt-8"
    >
      <article className="space-y-6 md:space-y-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:items-start">
          <div className="space-y-6 md:space-y-7">
            <section className="border-ink-200 bg-surface overflow-hidden rounded-3xl border shadow-sm">
              <div className="bg-ink-200 h-[280px] w-full md:h-[420px]" />
              <div className="space-y-3 p-5 md:p-6">
                <div className="bg-ink-200 h-6 w-28 rounded-full" />
                <div className="bg-ink-200 h-10 w-3/4 max-w-xl rounded-lg" />
                <div className="flex flex-wrap gap-3">
                  <div className="bg-ink-200 h-5 w-40 rounded" />
                  <div className="bg-ink-200 h-5 w-32 rounded" />
                </div>
              </div>
            </section>

            <section className="border-ink-200 bg-surface rounded-3xl border p-5 shadow-sm md:p-6">
              <div className="bg-ink-200 h-6 w-40 rounded" />
              <div className="mt-4 space-y-2">
                <div className="bg-ink-200 h-4 w-full rounded" />
                <div className="bg-ink-200 h-4 w-full rounded" />
                <div className="bg-ink-200 h-4 w-2/3 rounded" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <div className="bg-ink-200 h-9 w-24 rounded-full" />
                <div className="bg-ink-200 h-9 w-24 rounded-full" />
                <div className="bg-ink-200 h-9 w-24 rounded-full" />
              </div>
            </section>

            <section className="border-ink-200 bg-surface rounded-3xl border p-4 shadow-sm md:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="bg-ink-200 h-5 w-40 rounded" />
                <div className="bg-ink-200 h-6 w-28 rounded-full" />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="bg-ink-100 h-8 w-32 rounded-full" />
                <div className="bg-ink-100 h-8 w-36 rounded-full" />
                <div className="bg-ink-100 h-8 w-28 rounded-full" />
              </div>
            </section>

            <section className="border-ink-200 bg-surface rounded-3xl border p-3 md:p-4">
              <div className="bg-ink-200 mb-3 h-6 w-28 rounded px-2" />
              <div className="bg-ink-200 h-72 w-full rounded-2xl" />
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <section className="border-ink-200 bg-surface rounded-3xl border p-5 shadow-sm">
              <div className="bg-ink-200 h-9 w-32 rounded-lg" />
              <div className="bg-ink-200 mt-2 h-4 w-40 rounded" />
              <div className="mt-4 space-y-3">
                <div className="border-ink-200 rounded-2xl border p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="bg-ink-200 h-10 w-28 rounded" />
                    <div className="bg-ink-200 h-10 w-28 rounded" />
                  </div>
                  <div className="bg-ink-100 h-64 rounded-2xl" />
                </div>
                <div className="bg-ink-100 h-24 rounded-xl" />
                <div className="bg-ink-200 h-11 rounded-xl" />
              </div>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
