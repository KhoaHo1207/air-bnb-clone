export default function Loading() {
  return (
    <main
      role="status"
      aria-label="Loading homepage..."
      className="mx-auto min-h-screen max-w-7xl px-4 pt-6 pb-12 md:px-8"
    >
      <section
        aria-hidden
        className="border-ink-200 bg-surface animate-pulse rounded-3xl border p-6 md:p-10"
      >
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <div className="bg-ink-200 mx-auto h-3 w-56 rounded" />
          <div className="bg-ink-200 mx-auto h-8 w-96 rounded" />
          <div className="bg-ink-200 mx-auto h-4 w-80 rounded" />
        </div>

        <div className="border-ink-200 bg-ink-100 mx-auto mt-8 h-20 max-w-5xl rounded-3xl border" />

        <div className="mx-auto mt-6 flex max-w-5xl gap-2 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-ink-100 h-10 w-32 rounded-full" />
          ))}
        </div>
      </section>

      <section className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <article key={index} className="animate-pulse space-y-2">
            <div className="bg-ink-200 h-48 w-full rounded-2xl" />
            <div className="bg-ink-200 h-3 w-28 rounded" />
            <div className="bg-ink-200 h-4 w-40 rounded" />
            <div className="bg-ink-200 h-3 w-32 rounded" />
          </article>
        ))}
      </section>
    </main>
  );
}
