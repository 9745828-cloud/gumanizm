import { Link } from "react-router-dom"
import { BodyBlocks } from "../components/BodyBlocks"
import { HomeSciPop } from "../components/HomeSciPop"
import { chapters, homePage, site } from "../data/content"

export function Home() {
  const bookChapter = chapters.find((c) => c.id === "sudba-mira")
  const foundations = chapters.find(
    (c) => c.id === "gumanistika-imya-chelovechestva",
  )

  return (
    <>
      {/* Hero — chapter of humanistics */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 90% 10%, color-mix(in srgb, var(--color-teal-soft) 16%, transparent), transparent 55%), radial-gradient(ellipse 45% 40% at 5% 95%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <p className="enter-stagger enter-stagger-1 mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-teal-mid">
            {homePage.eyebrow}
          </p>
          <h1 className="enter-stagger enter-stagger-2 font-serif text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl md:text-[3.25rem]">
            {homePage.title}
          </h1>
          <aside className="enter-stagger enter-stagger-3 mt-8 rounded-2xl border border-teal-mid/15 bg-teal-mid/[0.06] px-5 py-5 sm:px-6 sm:py-6">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-teal-mid/80">
              К сути
            </p>
            <p className="font-serif text-xl leading-relaxed text-pretty text-ink sm:text-2xl">
              {homePage.accent}
            </p>
          </aside>
          <p className="enter-stagger enter-stagger-4 mt-6 text-sm text-muted-light">
            {site.book.author} · «{site.book.title}»
          </p>
          <div className="enter-stagger enter-stagger-5 mt-10 flex flex-wrap gap-3">
            <a href="#chtenie" className="btn-primary">
              Читать главу
            </a>
            {bookChapter && (
              <Link to={`/razdel/${bookChapter.id}`} className="btn-secondary">
                О книге «{site.book.title}»
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Main reading */}
      <article
        id="chtenie"
        className="border-b border-line px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <BodyBlocks blocks={homePage.blocks} />
        </div>
      </article>

      {/* Sci-pop infographics: models that explain the teaching */}
      <HomeSciPop />

      {/* Five pillars — compact after diagrams */}
      <section className="border-b border-line px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <header className="mb-10 max-w-2xl">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-teal-mid">
              Практика · пять опор
            </p>
            <h2 className="font-serif text-2xl tracking-tight text-balance sm:text-3xl">
              Проверочный список
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">
              После схем — короткий чеклист. Можно примерять к любому решению:
              «Какая опора здесь работает — или подменена?»
            </p>
          </header>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {homePage.pillars.map((p, i) => (
              <li key={p.title} className="surface-card flex flex-col p-6">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] tabular-nums text-teal-mid">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">
                  {p.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Compact next steps */}
      <section className="px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-light">
            Дальше
          </p>
          <h2 className="font-serif text-2xl tracking-tight text-balance">
            Продолжить чтение
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">
            Полный путь портала — в меню «Разделы».
          </p>
          <ul className="mt-8 space-y-3">
            {foundations && (
              <li>
                <Link
                  to={`/razdel/${foundations.id}`}
                  className="surface-card surface-card-hover group flex items-start gap-4 p-5"
                >
                  <span className="font-serif text-2xl tabular-nums text-cream-dark group-hover:text-teal-soft/60">
                    {foundations.num}
                  </span>
                  <div>
                    <p className="font-serif text-lg group-hover:text-teal">
                      {foundations.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Три подраздела на отдельной странице
                    </p>
                  </div>
                </Link>
              </li>
            )}
            {bookChapter && (
              <li>
                <Link
                  to={`/razdel/${bookChapter.id}`}
                  className="surface-card surface-card-hover group flex items-start gap-4 p-5"
                >
                  <span className="font-serif text-2xl tabular-nums text-cream-dark group-hover:text-teal-soft/60">
                    {bookChapter.num}
                  </span>
                  <div>
                    <p className="font-serif text-lg group-hover:text-teal">
                      {bookChapter.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Автор, книга и призвание учения
                    </p>
                  </div>
                </Link>
              </li>
            )}
            <li>
              <Link
                to={`/razdel/${chapters[chapters.length - 1].id}`}
                className="surface-card surface-card-hover group flex items-start gap-4 p-5"
              >
                <span className="font-serif text-2xl tabular-nums text-cream-dark group-hover:text-teal-soft/60">
                  {chapters[chapters.length - 1].num}
                </span>
                <div>
                  <p className="font-serif text-lg group-hover:text-teal">
                    {chapters[chapters.length - 1].title}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Ежедневная практика человечности
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
