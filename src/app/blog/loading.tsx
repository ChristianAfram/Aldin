export default function BlogLoading() {
  return (
    <section className="section-pad bg-warm-50 min-h-[50vh]">
      <div className="max-w-3xl mx-auto">
        <div className="grid gap-6" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="card p-6 sm:p-8 bg-white animate-pulse">
              <div className="h-3 w-24 bg-warm-200 rounded mb-4" />
              <div className="h-6 w-3/4 bg-warm-200 rounded mb-3" />
              <div className="h-4 w-full bg-warm-100 rounded mb-2" />
              <div className="h-4 w-2/3 bg-warm-100 rounded" />
            </div>
          ))}
        </div>
        <p className="sr-only">Beiträge werden geladen …</p>
      </div>
    </section>
  )
}
