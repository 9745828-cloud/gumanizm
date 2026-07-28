import { useState } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import { chapters, site } from "../data/content"

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-50 border-b border-line/80 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            to="/"
            className="group flex min-w-0 items-baseline gap-2.5"
            onClick={() => setMenuOpen(false)}
          >
            <span className="font-serif text-xl tracking-tight text-ink transition-colors group-hover:text-teal">
              {site.name}
            </span>
            <span className="hidden truncate text-[10px] font-medium uppercase tracking-[0.14em] text-muted-light md:inline">
              Быть человеком
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) => navClass(isActive)}
            >
              Главная
            </NavLink>
            <div className="group relative">
              <button
                type="button"
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-cream-dark/60 hover:text-ink sm:px-4"
              >
                Разделы
              </button>
              <div className="invisible absolute right-0 top-full z-50 w-72 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-line bg-paper py-2 shadow-lg shadow-ink/5">
                  {chapters.map((ch) => (
                    <Link
                      key={ch.id}
                      to={`/razdel/${ch.id}`}
                      className="flex gap-3 px-4 py-2.5 text-sm transition hover:bg-cream"
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
          </nav>

          <button
            type="button"
            className="rounded-full border border-line px-3 py-1.5 text-sm text-ink lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "Закрыть" : "Меню"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-line bg-paper lg:hidden">
            <div className="mx-auto max-h-[70vh] max-w-6xl overflow-y-auto px-5 py-4 sm:px-8">
              <Link
                to="/"
                className="block py-2 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Главная
              </Link>
              <p className="mt-4 mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-light">
                Разделы
              </p>
              <ul className="space-y-1">
                {chapters.map((ch) => (
                  <li key={ch.id}>
                    <Link
                      to={`/razdel/${ch.id}`}
                      className="flex gap-3 py-2 text-sm"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="tabular-nums text-muted-light">
                        {ch.num}
                      </span>
                      <span>{ch.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div>
              <p className="font-serif text-2xl">{site.title}</p>
              <p className="mt-2 text-sm text-cream/50">{site.titleEn}</p>
              <p className="mt-4 max-w-sm text-xs leading-relaxed text-cream/35">
                Макет по структуре портала · 9 разделов книги
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {chapters.map((ch) => (
                <Link
                  key={ch.id}
                  to={`/razdel/${ch.id}`}
                  className="text-sm text-cream/55 transition hover:text-cream"
                >
                  <span className="mr-2 text-cream/30">{ch.num}</span>
                  {ch.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function navClass(isActive: boolean) {
  return [
    "rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4",
    isActive
      ? "bg-ink text-cream"
      : "text-muted hover:bg-cream-dark/60 hover:text-ink",
  ].join(" ")
}
