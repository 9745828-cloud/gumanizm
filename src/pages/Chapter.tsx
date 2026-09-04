import { useEffect, useId, useRef, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { BodyBlocks } from "../components/BodyBlocks"
import { ChapterVisualBlock } from "../components/ChapterVisual"
import {
  chapters,
  getChapter,
  getChapterIndex,
  site,
  type ChapterSection,
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
  const progress = ((index + 1) / chapters.length) * 100
  const hasBodies = chapter.sections.some((s) => s.body && s.body.length > 0)
  const useCards =
    chapter.sectionLayout === "cards" ||
    (!hasBodies && chapter.sectionLayout !== "read")

  return (
    <>
      <div
        className="pointer-events-none sticky top-16 z-40 h-0.5 w-full bg-line/60"
        aria-hidden
      >
        <div
          className="h-full bg-teal-mid/80 transition-[width] duration-300 ease-out-soft"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="enter-stagger enter-stagger-1 mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-teal-mid">
            Раздел {chapter.num} из 09
          </p>
          <h1 className="enter-stagger enter-stagger-2 font-serif text-4xl leading-[1.12] tracking-tight text-balance sm:text-5xl">
            {chapter.title}
          </h1>
          {chapter.id === "gumanistika-imya-chelovechestva" ||
          chapter.id === "sudba-mira" ? (
            <p className="enter-stagger enter-stagger-3 mt-5 text-sm text-muted-light">
              {site.book.author} · «{site.book.title}»
            </p>
          ) : null}
          {chapter.intro ? (
            <p className="enter-stagger enter-stagger-3 mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
              {chapter.intro}
            </p>
          ) : null}
        </div>
      </section>

      {useCards ? (
        <SectionCards key={chapter.id} sections={chapter.sections} />
      ) : (
        <div className="border-b border-line px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl space-y-16">
            {chapter.sections.map((section, i) => (
              <section key={section.title} id={`s${i + 1}`}>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] tabular-nums text-teal-mid">
                  {(i + 1).toString().padStart(2, "0")}
                </p>
                <h2 className="font-serif text-2xl tracking-tight text-balance sm:text-3xl">
                  {section.title}
                </h2>
                {section.body ? (
                  <div className="mt-6">
                    <BodyBlocks blocks={section.body} />
                  </div>
                ) : (
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {section.text}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      )}

      {chapter.visual && <ChapterVisualBlock visual={chapter.visual} />}

      {chapter.articles && chapter.articles.length > 0 ? (
        <section
          className="border-b border-line px-5 py-14 sm:px-8 sm:py-16"
          aria-labelledby="chapter-articles-heading"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="chapter-articles-heading"
              className="font-serif text-2xl tracking-tight sm:text-3xl"
            >
              Статьи
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
              Первые материалы к разделу. Список будет пополняться.
            </p>

            <ul className="mt-10 space-y-4">
              {chapter.articles.map((article, i) => (
                <li key={article.id}>
                  <Link
                    to={`/razdel/${chapter.id}/statya/${article.id}`}
                    className="surface-card surface-card-hover group flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-7"
                  >
                    <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.18em] tabular-nums text-teal-mid">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      {article.subject ? (
                        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-light">
                          {article.subject}
                        </p>
                      ) : null}
                      <h3 className="font-serif text-xl leading-snug text-balance transition-colors duration-150 group-hover:text-teal sm:text-2xl">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-pretty text-muted">
                        {article.lead}
                      </p>
                      <p className="mt-5 text-sm font-medium text-teal-mid transition-colors group-hover:text-teal">
                        Читать →
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <nav
        className="border-t border-line px-5 py-10 sm:px-8"
        aria-label="Соседние разделы"
      >
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/razdel/${prev.id}`}
              className="surface-card surface-card-hover group p-5"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-light">
                ← Предыдущий
              </span>
              <p className="mt-2 font-serif text-lg leading-snug text-balance transition-colors duration-150 group-hover:text-teal">
                <span className="mr-2 tabular-nums text-muted-light">
                  {prev.num}
                </span>
                {prev.title}
              </p>
            </Link>
          ) : (
            <Link
              to="/"
              className="surface-card surface-card-hover group p-5"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-light">
                ← На главную
              </span>
              <p className="mt-2 font-serif text-lg leading-snug group-hover:text-teal">
                Гуманистика — имя человечности
              </p>
            </Link>
          )}
          {next ? (
            <Link
              to={`/razdel/${next.id}`}
              className="surface-card surface-card-hover group p-5 text-right sm:justify-self-end"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-light">
                Следующий →
              </span>
              <p className="mt-2 font-serif text-lg leading-snug text-balance transition-colors duration-150 group-hover:text-teal">
                <span className="mr-2 tabular-nums text-muted-light">
                  {next.num}
                </span>
                {next.title}
              </p>
            </Link>
          ) : (
            <Link
              to="/"
              className="group rounded-2xl bg-ink p-5 text-cream shadow-ink sm:justify-self-end sm:text-right"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
                На главную
              </span>
              <p className="mt-2 font-serif text-lg">К чтению →</p>
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}

/** Компактные карточки: полный текст в модальном окне поверх страницы */
function SectionCards({ sections }: { sections: ChapterSection[] }) {
  const [openTitle, setOpenTitle] = useState<string | null>(null)
  const dialogId = useId()
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const openSection = sections.find((s) => s.title === openTitle) ?? null

  useEffect(() => {
    if (!openSection) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenTitle(null)
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [openSection])

  return (
    <section className="border-b border-line px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {sections.map((section, i) => {
            const isAccent = i === 1
            const hasBody = Boolean(section.body && section.body.length > 0)
            const isOpen = openTitle === section.title
            const cardClass = [
              "flex h-full flex-col rounded-2xl p-7 text-left sm:p-8",
              isAccent
                ? "bg-ink text-cream shadow-ink lg:translate-y-2"
                : "surface-card",
              hasBody
                ? isAccent
                  ? "cursor-pointer transition-[transform,box-shadow] duration-150 hover:shadow-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  : "surface-card-hover cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-mid"
                : "",
              hasBody && isOpen
                ? isAccent
                  ? "ring-2 ring-accent/50"
                  : "ring-2 ring-teal-mid/40"
                : "",
            ].join(" ")

            const inner = (
              <>
                <span
                  className={[
                    "text-[11px] font-medium uppercase tracking-[0.18em] tabular-nums",
                    isAccent ? "text-accent" : "text-teal-mid",
                  ].join(" ")}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-serif text-2xl leading-snug text-balance">
                  {section.title}
                </h2>
                <p
                  className={[
                    "mt-4 flex-1 text-base leading-relaxed text-pretty",
                    isAccent ? "text-cream/65" : "text-muted",
                  ].join(" ")}
                >
                  {section.text}
                </p>
                <p
                  className={[
                    "mt-8 text-xs uppercase tracking-wider",
                    isAccent ? "text-cream/30" : "text-muted-light",
                  ].join(" ")}
                >
                  {hasBody ? "Читать" : "Текст · скоро"}
                </p>
              </>
            )

            if (!hasBody) {
              return (
                <article key={section.title} className={cardClass}>
                  {inner}
                </article>
              )
            }

            return (
              <button
                key={section.title}
                type="button"
                className={cardClass}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls={dialogId}
                onClick={() => setOpenTitle(section.title)}
              >
                {inner}
              </button>
            )
          })}
        </div>
      </div>

      {openSection?.body ? (
        <div
          className="fixed inset-0 z-[80] flex items-stretch justify-center p-0 sm:items-center sm:p-6"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
            aria-label="Закрыть окно"
            onClick={() => setOpenTitle(null)}
          />

          <div
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[1] flex max-h-dvh w-full max-w-3xl flex-col bg-cream shadow-elevated sm:max-h-[min(90dvh,52rem)] sm:rounded-2xl"
          >
            {/* Sticky header: title + always-visible close */}
            <div className="sticky top-0 z-10 flex shrink-0 items-start gap-4 border-b border-line/80 bg-cream/95 px-5 py-4 backdrop-blur-md sm:px-8 sm:py-5 supports-[backdrop-filter]:bg-cream/90">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-teal-mid">
                  Подраздел
                </p>
                <h3
                  id={titleId}
                  className="mt-1.5 font-serif text-xl leading-snug tracking-tight text-balance sm:text-2xl"
                >
                  {openSection.title}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-sm transition-[background-color,transform] duration-150 hover:bg-cream-dark/60 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-mid"
                aria-label="Закрыть"
                onClick={() => setOpenTitle(null)}
              >
                <span className="relative size-4" aria-hidden>
                  <span className="absolute left-0 top-1/2 block h-0.5 w-4 -translate-y-1/2 rotate-45 rounded-full bg-ink" />
                  <span className="absolute left-0 top-1/2 block h-0.5 w-4 -translate-y-1/2 -rotate-45 rounded-full bg-ink" />
                </span>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-8 sm:px-8 sm:py-10">
              <BodyBlocks blocks={openSection.body} />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
