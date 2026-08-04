import { Link, Navigate, useParams } from "react-router-dom"
import { BodyBlocks } from "../components/BodyBlocks"
import { getArticle } from "../data/content"

export function Article() {
  const { id, articleId } = useParams<{ id: string; articleId: string }>()
  const found =
    id && articleId ? getArticle(id, articleId) : undefined

  if (!found) {
    return <Navigate to={id ? `/razdel/${id}` : "/"} replace />
  }

  const { chapter, article, index } = found
  const articles = chapter.articles ?? []
  const prev = index > 0 ? articles[index - 1] : null
  const next = index < articles.length - 1 ? articles[index + 1] : null
  const num = (index + 1).toString().padStart(2, "0")
  const total = articles.length.toString().padStart(2, "0")

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <nav
            className="enter-stagger enter-stagger-1 mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-light"
            aria-label="Хлебные крошки"
          >
            <Link
              to={`/razdel/${chapter.id}`}
              className="transition-colors hover:text-teal"
            >
              Раздел {chapter.num}
            </Link>
            <span aria-hidden>·</span>
            <span className="text-teal-mid">
              Статья {num}
              {articles.length > 1 ? ` из ${total}` : ""}
            </span>
          </nav>

          {article.subject ? (
            <p className="enter-stagger enter-stagger-2 mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-teal-mid">
              {article.subject}
            </p>
          ) : null}

          <h1 className="enter-stagger enter-stagger-3 font-serif text-3xl leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
            {article.title}
          </h1>
          <p className="enter-stagger enter-stagger-4 mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            {article.lead}
          </p>
        </div>
      </section>

      <article className="border-b border-line px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <BodyBlocks blocks={article.body} />
        </div>
      </article>

      <nav
        className="border-t border-line px-5 py-10 sm:px-8"
        aria-label="Навигация по статьям"
      >
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/razdel/${chapter.id}/statya/${prev.id}`}
              className="surface-card surface-card-hover group p-5"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-light">
                ← Предыдущая статья
              </span>
              <p className="mt-2 font-serif text-lg leading-snug text-balance transition-colors duration-150 group-hover:text-teal">
                {prev.title}
              </p>
            </Link>
          ) : (
            <Link
              to={`/razdel/${chapter.id}`}
              className="surface-card surface-card-hover group p-5"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-light">
                ← К разделу
              </span>
              <p className="mt-2 font-serif text-lg leading-snug group-hover:text-teal">
                {chapter.title}
              </p>
            </Link>
          )}

          {next ? (
            <Link
              to={`/razdel/${chapter.id}/statya/${next.id}`}
              className="surface-card surface-card-hover group p-5 text-right sm:justify-self-end"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-light">
                Следующая статья →
              </span>
              <p className="mt-2 font-serif text-lg leading-snug text-balance transition-colors duration-150 group-hover:text-teal">
                {next.title}
              </p>
            </Link>
          ) : (
            <Link
              to={`/razdel/${chapter.id}`}
              className="group rounded-2xl bg-ink p-5 text-cream shadow-ink sm:justify-self-end sm:text-right"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
                Все статьи раздела
              </span>
              <p className="mt-2 font-serif text-lg">К списку →</p>
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}
