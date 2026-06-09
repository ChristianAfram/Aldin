export default function BlogPostLoading() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-16 md:py-24">
      <div className="animate-pulse" aria-hidden="true">
        <div className="h-3 w-32 bg-warm-200 rounded mb-6" />
        <div className="h-10 w-5/6 bg-warm-200 rounded mb-3" />
        <div className="h-10 w-2/3 bg-warm-200 rounded mb-10" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-warm-100 rounded" />
          <div className="h-4 w-full bg-warm-100 rounded" />
          <div className="h-4 w-3/4 bg-warm-100 rounded" />
        </div>
      </div>
      <p className="sr-only">Beitrag wird geladen …</p>
    </article>
  )
}
