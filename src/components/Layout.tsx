import { useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { chapters, site } from "../data/content"

/** Единственное полное меню разделов: шапка (desktop dropdown + mobile drawer) */
export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sectionsOpen, setSectionsOpen] = useState(false)
  const location = useLocation()
  const menuId = useId()
  const sectionsMenuId = useId()
  const sectionsRef = useRef<HTMLDivElement>(null)
  const scrollPositions = useRef(new Map<string, number>())
  const prevPathname = useRef(location.pathname)

  useEffect(() => {
    // Сами решаем, куда скроллить: иначе браузер вернёт и главную «на середину»
    window.history.scrollRestoration = "manual"
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSectionsOpen(false)
  }, [location.pathname])

  /** Главная — всегда сверху; разделы/статьи — помнят, где остановились */
  useLayoutEffect(() => {
    const prev = prevPathname.current
    if (prev !== "/") {
      scrollPositions.current.set(prev, window.scrollY)
    }
    prevPathname.current = location.pathname

    if (location.pathname === "/") {
      if (location.hash) {
        const el = document.querySelector(location.hash)
        if (el) {
          el.scrollIntoView()
          return
        }
      }
      window.scrollTo(0, 0)
      return
    }

    const y = scrollPositions.current.get(location.pathname) ?? 0
    window.scrollTo(0, y)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    if (!sectionsOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSectionsOpen(false)
    }
    const onPointerDown = (e: PointerEvent) => {
      const root = sectionsRef.current
      if (root && !root.contains(e.target as Node)) {
        setSectionsOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [sectionsOpen])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        К содержанию
      </a>

      <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/85 backdrop-blur-md supports-[backdrop-filter]:bg-cream/75">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            to="/"
            className="group flex min-w-0 items-baseline gap-2.5 rounded-lg"
            onClick={() => setMenuOpen(false)}
          >
            <span className="font-serif text-xl tracking-tight text-ink transition-colors duration-150 group-hover:text-teal">
              {site.name}
            </span>
            <span className="hidden truncate text-[10px] font-medium uppercase tracking-[0.14em] text-muted-light md:inline">
              Быть человеком
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная">
            <NavLink to="/" end className={({ isActive }) => navClass(isActive)}>
              Главная
            </NavLink>
            <div className="relative" ref={sectionsRef}>
              <button
                type="button"
                className={[
                  "inline-flex min-h-10 items-center rounded-full px-4 py-1.5 text-sm transition-colors duration-150 ease-out-soft",
                  sectionsOpen
                    ? "bg-ink text-cream"
                    : "text-muted hover:bg-cream-dark/60 hover:text-ink",
                ].join(" ")}
                aria-haspopup="menu"
                aria-expanded={sectionsOpen}
                aria-controls={sectionsMenuId}
                onClick={() => setSectionsOpen((v) => !v)}
              >
                Разделы
                <ChevronDown
                  className={[
                    "ml-1 size-3.5 opacity-60 transition-transform duration-150 ease-out-soft",
                    sectionsOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>
              <div
                id={sectionsMenuId}
                hidden={!sectionsOpen}
                className={[
                  "absolute right-0 top-full z-50 w-80 pt-2 transition-[opacity,visibility] duration-150 ease-out-soft",
                  sectionsOpen
                    ? "visible opacity-100"
                    : "invisible pointer-events-none opacity-0",
                ].join(" ")}
              >
                <div
                  role="menu"
                  className="max-h-[min(70vh,28rem)] overflow-y-auto rounded-2xl bg-paper py-2 shadow-elevated"
                >
                  {chapters.map((ch) => (
                    <Link
                      key={ch.id}
                      role="menuitem"
                      to={`/razdel/${ch.id}`}
                      className="flex min-h-11 gap-3 px-4 py-2.5 text-sm transition-colors duration-100 ease-out-soft hover:bg-cream"
                      onClick={() => setSectionsOpen(false)}
                    >
                      <span className="shrink-0 tabular-nums text-muted-light">
                        {ch.num}
                      </span>
                      <span className="leading-snug text-ink-soft">{ch.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <NavLink
              to="/o-proekte"
              className={({ isActive }) => navClass(isActive)}
            >
              О проекте
            </NavLink>
          </nav>

          <button
            type="button"
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-paper/80 px-3 text-sm text-ink transition-[background-color,transform] duration-150 ease-out-soft hover:bg-paper active:scale-[0.96] lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span className="relative size-5" aria-hidden>
              <span
                className={[
                  "absolute left-0.5 top-[7px] block h-0.5 w-4 rounded-full bg-ink transition-[transform,opacity] duration-200 ease-out-soft",
                  menuOpen ? "translate-y-[5px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0.5 top-[11px] block h-0.5 w-4 rounded-full bg-ink transition-opacity duration-150 ease-out-soft",
                  menuOpen ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0.5 top-[15px] block h-0.5 w-4 rounded-full bg-ink transition-[transform,opacity] duration-200 ease-out-soft",
                  menuOpen ? "-translate-y-[5px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>

        <div
          id={menuId}
          className="drawer-panel border-t border-line bg-paper lg:hidden"
          data-open={menuOpen}
        >
          <div>
            <div className="mx-auto max-h-[min(70vh,32rem)] max-w-6xl overflow-y-auto px-5 py-4 sm:px-8">
              <Link
                to="/"
                className="flex min-h-11 items-center text-sm font-medium transition-colors duration-100 hover:text-teal"
                onClick={() => setMenuOpen(false)}
              >
                Главная
              </Link>
              <Link
                to="/o-proekte"
                className="flex min-h-11 items-center text-sm font-medium transition-colors duration-100 hover:text-teal"
                onClick={() => setMenuOpen(false)}
              >
                О проекте
              </Link>
              <p className="mt-5 mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-light">
                Разделы
              </p>
              <ul className="space-y-0.5">
                {chapters.map((ch) => (
                  <li key={ch.id}>
                    <Link
                      to={`/razdel/${ch.id}`}
                      className="flex min-h-11 gap-3 rounded-xl px-2 py-2 text-sm transition-colors duration-100 hover:bg-cream"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="tabular-nums text-muted-light">
                        {ch.num}
                      </span>
                      <span className="leading-snug">{ch.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      {/* Footer без второго полного списка разделов */}
      <footer className="border-t border-line bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-12">
          <div>
            <p className="font-serif text-xl tracking-tight">{site.title}</p>
            <p className="mt-1 text-sm text-cream/45">{site.titleEn}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-cream/35">
              По учению {site.book.author} · «{site.book.title}»
            </p>
            <Link
              to="/o-proekte"
              className="mt-4 inline-block text-sm text-cream/55 transition-colors hover:text-cream"
            >
              О проекте →
            </Link>
          </div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-cream/25">
            {site.orgShort}
          </p>
        </div>
      </footer>
    </div>
  )
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  )
}

function navClass(isActive: boolean) {
  return [
    "inline-flex min-h-10 items-center rounded-full px-4 py-1.5 text-sm transition-colors duration-150 ease-out-soft",
    isActive
      ? "bg-ink text-cream"
      : "text-muted hover:bg-cream-dark/60 hover:text-ink",
  ].join(" ")
}
