import { Link, Navigate, useParams } from "react-router-dom"
import { ChapterVisualBlock } from "../components/ChapterVisual"
import {
  chapters,
  getChapter,
  getChapterIndex,
} from "../data/content"

export function Chapter() {
  const { id } = useParams<{ id: string }>()
  const chapter = id ? getChapter(id) : undefined

  if (!chapter) {
    return <Navigate to="/" replace />
  }

  const index = getChapterIndex(chapter.id)
  const prev = index > 0 ? chapters[index - 1] : null
  const next = index < chapters.length - 1 ? chapters[index + 1] : null

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-teal-mid">
            Раздел {chapter.num} из 09
          </p>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            {chapter.title}
          </h1>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 lg:grid-cols-3">
            {chapter.sections.map((section, i) => (
              <article
                key={section.title}
                className={[
                  "rounded-2xl border border-line p-7 sm:p-8",
                  i === 1 ? "bg-ink text-cream lg:translate-y-2" : "bg-paper",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-[11px] font-medium uppercase tracking-[0.18em]",
                    i === 1 ? "text-accent" : "text-teal-mid",
                  ].join(" ")}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-serif text-2xl leading-snug">
                  {section.title}
                </h2>
                <p
                  className={[
                    "mt-4 text-base leading-relaxed",
                    i === 1 ? "text-cream/65" : "text-muted",
                  ].join(" ")}
                >
                  {section.text}
                </p>
                <p
                  className={[
                    "mt-8 text-xs uppercase tracking-wider",
                    i === 1 ? "text-cream/30" : "text-muted-light",
                  ].join(" ")}
                >
                  Полный текст · скоро
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {chapter.visual && <ChapterVisualBlock visual={chapter.visual} />}

      {/* Chapter nav */}
      <nav className="border-t border-line px-5 py-10 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/razdel/${prev.id}`}
              className="group rounded-2xl border border-line bg-paper p-5 transition hover:border-teal-mid/30"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-light">
                ← Предыдущий
              </span>
              <p className="mt-2 font-serif text-lg leading-snug group-hover:text-teal">
                <span className="mr-2 text-muted-light">{prev.num}</span>
                {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={`/razdel/${next.id}`}
              className="group rounded-2xl border border-line bg-paper p-5 text-right transition hover:border-teal-mid/30 sm:justify-self-end"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-light">
                Следующий →
              </span>
              <p className="mt-2 font-serif text-lg leading-snug group-hover:text-teal">
                <span className="mr-2 text-muted-light">{next.num}</span>
                {next.title}
              </p>
            </Link>
          ) : (
            <Link
              to="/"
              className="group rounded-2xl border border-line bg-ink p-5 text-cream sm:justify-self-end sm:text-right"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
                К содержанию
              </span>
              <p className="mt-2 font-serif text-lg">Все разделы →</p>
            </Link>
          )}
        </div>
      </nav>

      {/* All chapters mini-index */}
      <section className="border-t border-line bg-paper/50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-light">
            Все разделы
          </p>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch) => (
              <li key={ch.id}>
                <Link
                  to={`/razdel/${ch.id}`}
                  className={[
                    "flex gap-3 rounded-xl px-3 py-2 text-sm transition",
                    ch.id === chapter.id
                      ? "bg-ink text-cream"
                      : "text-muted hover:bg-cream-dark/50 hover:text-ink",
                  ].join(" ")}
                >
                  <span
                    className={
                      ch.id === chapter.id
                        ? "text-accent"
                        : "text-muted-light"
                    }
                  >
                    {ch.num}
                  </span>
                  <span className="leading-snug">{ch.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
