import { Link } from "react-router-dom"
import { chapters, site } from "../data/content"

export function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 85% 20%, color-mix(in srgb, var(--color-teal-soft) 18%, transparent), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 90%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-teal-mid">
            {site.org}
          </p>
          <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl md:text-6xl">
            {site.title}
          </h1>
          <p className="mt-3 font-serif text-xl italic text-muted sm:text-2xl">
            {site.titleEn}
          </p>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {site.tagline}
          </p>
          <div className="mt-10">
            <a
              href="#razdely"
              className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-teal"
            >
              9 разделов
            </a>
          </div>
        </div>
      </section>

      {/* Path overview */}
      <section className="border-b border-line px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            Путь от определения гуманистики — через книгу «Судьба мира», мораль,
            диалог культур и семью — к кризису ценностей, героям добра и
            ежедневной практике: начни с себя. Нау-поп визуализации встроены в
            разделы, где они помогают понять идеи.
          </p>
          <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-light">
            Структура портала
          </p>
        </div>
      </section>

      {/* 9 chapters */}
      <section id="razdely" className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <header className="mb-10 max-w-2xl sm:mb-14">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-teal-mid">
              Содержание
            </p>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              Разделы сайта
            </h2>
          </header>

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch) => (
              <li key={ch.id}>
                <Link
                  to={`/razdel/${ch.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition hover:border-teal-mid/30 hover:bg-white sm:p-7"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-serif text-3xl text-cream-dark transition group-hover:text-teal-soft/50">
                      {ch.num}
                    </span>
                    {ch.visual && (
                      <span className="rounded-full bg-cream-dark/40 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted">
                        + визуал
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-serif text-lg leading-snug text-ink transition group-hover:text-teal">
                    {ch.title}
                  </h3>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {ch.sections.map((s) => (
                      <li
                        key={s.title}
                        className="text-sm leading-snug text-muted"
                      >
                        {s.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 text-xs font-medium uppercase tracking-wider text-muted-light transition group-hover:text-teal-mid">
                    Открыть →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
