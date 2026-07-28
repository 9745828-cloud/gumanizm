import type { ChapterVisual as Visual } from "../data/content"

/** Встроенный нау-поп блок внутри раздела */
export function ChapterVisualBlock({ visual }: { visual: Visual }) {
  return (
    <section className="border-t border-line px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-teal-mid">
          Науч-поп · в разделе
        </p>
        <h2 className="mb-8 max-w-2xl font-serif text-2xl tracking-tight text-balance sm:text-3xl">
          {visual.title}
        </h2>

        {visual.kind === "pills" && (
          <div className="flex flex-wrap gap-2.5">
            {visual.items.map((item, i) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full bg-paper px-4 py-2.5 text-sm text-ink-soft shadow-border transition-[box-shadow,transform] duration-150 ease-out-soft hover:shadow-border-hover"
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
          <div className="grid gap-px overflow-hidden rounded-2xl shadow-border md:grid-cols-3">
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
                <h3 className="mt-3 font-serif text-xl text-balance">
                  {col.title}
                </h3>
                <p
                  className={[
                    "mt-3 text-sm leading-relaxed text-pretty",
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
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-1.5">
            {visual.steps.map((step, i) => (
              <div key={step} className="flex flex-1 items-center gap-1.5">
                <div className="flex-1 rounded-2xl bg-paper px-4 py-5 text-center shadow-border transition-[box-shadow,transform] duration-150 ease-out-soft hover:-translate-y-0.5 hover:shadow-border-hover">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] tabular-nums text-muted-light">
                    {(i + 1).toString().padStart(2, "0")}
                  </p>
                  <p className="mt-1.5 font-serif text-lg">{step}</p>
                </div>
                {i < visual.steps.length - 1 && (
                  <span
                    className="hidden shrink-0 px-0.5 text-muted-light sm:inline"
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
                className="rounded-2xl bg-ink p-7 text-center text-cream shadow-ink transition-transform duration-150 ease-out-soft hover:-translate-y-0.5 sm:p-8"
              >
                <p className="font-serif text-4xl text-accent sm:text-5xl">
                  {item.value}
                </p>
                <p className="mt-3 font-medium">{item.label}</p>
                {item.sub && (
                  <p className="mt-1.5 text-sm text-pretty text-cream/50">
                    {item.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
