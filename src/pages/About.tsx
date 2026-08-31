import { Link } from "react-router-dom"
import { BodyBlocks } from "../components/BodyBlocks"
import { aboutPage } from "../data/about"
import { site } from "../data/content"

export function About() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="enter-stagger enter-stagger-1 mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-teal-mid">
            {site.orgShort} · International Association of Humanistics
          </p>
          <h1 className="enter-stagger enter-stagger-2 font-serif text-4xl leading-[1.12] tracking-tight text-balance sm:text-5xl">
            {aboutPage.title}
          </h1>
          <p className="enter-stagger enter-stagger-3 mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            {aboutPage.lead}
          </p>
        </div>
      </section>

      <article className="border-b border-line px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <BodyBlocks blocks={aboutPage.blocks} />
        </div>
      </article>

      <nav
        className="border-t border-line px-5 py-10 sm:px-8"
        aria-label="Дальше"
      >
        <div className="mx-auto flex max-w-3xl flex-wrap gap-3">
          <Link to="/" className="btn-primary">
            На главную
          </Link>
          <Link
            to="/razdel/gumanistika-imya-chelovechestva"
            className="btn-secondary"
          >
            К разделам
          </Link>
        </div>
      </nav>
    </>
  )
}
