import type { BodyBlock } from "../data/content"

/** Рендер абзацев, цитат, списков — для главной и разделов */
export function BodyBlocks({ blocks }: { blocks: BodyBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="pt-4 font-serif text-2xl tracking-tight text-balance text-ink sm:text-3xl"
            >
              {block.text}
            </h2>
          )
        }
        if (block.type === "quote") {
          if (block.key) {
            return (
              <aside
                key={i}
                className="rounded-2xl border border-teal-mid/15 bg-teal-mid/[0.06] px-5 py-5 sm:px-6 sm:py-6"
              >
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-teal-mid/80">
                  К сути
                </p>
                <p className="font-serif text-xl leading-relaxed text-pretty text-ink sm:text-2xl">
                  {block.text}
                </p>
                {block.cite ? (
                  <footer className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-light">
                    {block.cite}
                  </footer>
                ) : null}
              </aside>
            )
          }
          return (
            <blockquote
              key={i}
              className="border-l-2 border-teal-mid/40 pl-5 sm:pl-6"
            >
              <p className="font-serif text-xl leading-relaxed text-pretty text-ink-soft sm:text-2xl">
                {block.text}
              </p>
              {block.cite && (
                <footer className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-light">
                  {block.cite}
                </footer>
              )}
            </blockquote>
          )
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-3">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-relaxed text-pretty text-ink-soft sm:text-lg"
                >
                  <span
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-teal-mid"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p
            key={i}
            className="text-base leading-[1.75] text-pretty text-ink-soft sm:text-lg sm:leading-[1.8]"
          >
            {block.text}
          </p>
        )
      })}
    </div>
  )
}
