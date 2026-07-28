import type { ChapterVisual as Visual } from "../data/content"

/** Встроенный нау-поп блок внутри раздела */
export function ChapterVisualBlock({ visual }: { visual: Visual }) {
  return (
    <section className="border-t border-line px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-teal-mid">
          Инфографика в разделе
        </p>
        <h2 className="mb-8 font-serif text-2xl tracking-tight sm:text-3xl">
          {visual.title}
        </h2>

        {visual.kind === "pills" && (
          <div className="flex flex-wrap gap-2">
            {visual.items.map((item, i) => (
              <span
                key={item}
                className="rounded-full border border-line bg-paper px-4 py-2.5 text-sm text-ink-soft"
              >
                <span className="mr-2 tabular-nums text-muted-light">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                {item}
              </span>
            ))}
          </div>
        )}

        {visual.kind === "compare" && (
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {visual.columns.map((col) => (
              <div
                key={col.title}
                className={[
                  "p-7 sm:p-8",
                  col.accent ? "bg-teal text-cream" : "bg-paper",
                ].join(" ")}
              >
                <p
                  className={[
                    "text-[11px] font-medium uppercase tracking-[0.18em]",
                    col.accent ? "text-accent" : "text-muted-light",
                  ].join(" ")}
                >
                  Понятие
                </p>
                <h3 className="mt-3 font-serif text-xl">{col.title}</h3>
                <p
                  className={[
                    "mt-3 text-sm leading-relaxed",
                    col.accent ? "text-cream/70" : "text-muted",
                  ].join(" ")}
                >
                  {col.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {visual.kind === "chain" && (
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            {visual.steps.map((step, i) => (
              <div key={step} className="flex flex-1 items-center gap-2">
                <div className="flex-1 rounded-2xl border border-line bg-paper px-4 py-5 text-center">
                  <p className="font-serif text-lg">{step}</p>
                </div>
                {i < visual.steps.length - 1 && (
                  <span
                    className="hidden text-muted-light sm:inline"
                    aria-hidden
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {visual.kind === "stats" && (
          <div className="grid gap-4 sm:grid-cols-3">
            {visual.items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-line bg-ink p-7 text-center text-cream"
              >
                <p className="font-serif text-4xl text-accent sm:text-5xl">
                  {item.value}
                </p>
                <p className="mt-3 font-medium">{item.label}</p>
                {item.sub && (
                  <p className="mt-1 text-sm text-cream/50">{item.sub}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="mt-6 text-xs text-muted-light">
          Макет визуализации · данные и интерактив — на следующем этапе
        </p>
      </div>
    </section>
  )
}
