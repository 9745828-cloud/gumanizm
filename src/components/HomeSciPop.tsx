/**
 * Науч-поп инфографика главной:
 * схемы-модели, которые объясняют идеи учения, а не «украшают» страницу.
 */
import type { ReactNode } from "react"

const dimensions = [
  {
    key: "spirit",
    label: "Духовность",
    short: "внутренняя опора",
    angle: -90,
  },
  {
    key: "meaning",
    label: "Смысл",
    short: "зачем живу",
    angle: -30,
  },
  {
    key: "freedom",
    label: "Свобода",
    short: "ответственный выбор",
    angle: 30,
  },
  {
    key: "create",
    label: "Созидание",
    short: "делать, а не разрушать",
    angle: 90,
  },
  {
    key: "history",
    label: "История",
    short: "память и уроки",
    angle: 150,
  },
  {
    key: "values",
    label: "Ценности",
    short: "мера добра",
    angle: 210,
  },
] as const

const cascade = [
  {
    level: "01",
    title: "Человек",
    role: "Источник",
    text: "Намерение, совесть, выбор. Здесь начинается или кончается человечность.",
  },
  {
    level: "02",
    title: "Семья",
    role: "Школа",
    text: "Первая передача любви, доверия и ответственности.",
  },
  {
    level: "03",
    title: "Общество",
    role: "Среда",
    text: "Нормы, культура, отношение к слабому и чужому.",
  },
  {
    level: "04",
    title: "Государство",
    role: "Порядок",
    text: "Сила институтов без человечности легко становится насилием.",
  },
  {
    level: "05",
    title: "Человечество",
    role: "Судьба",
    text: "Общий итог миллиардов личных выборов.",
  },
] as const

const moralChain = [
  {
    step: "А",
    title: "Намерение",
    text: "Зачем я это делаю? Чистый мотив или расчёт?",
  },
  {
    step: "Б",
    title: "Поступок",
    text: "Слово и дело. Внешний жест без внутреннего смысла пуст.",
  },
  {
    step: "В",
    title: "Последствие",
    text: "Кого затронуло? Что укрепилось — добро или зло?",
  },
  {
    step: "Г",
    title: "Мир вокруг",
    text: "Сумма последствий формирует климат семьи, улицы, эпохи.",
  },
] as const

const forks = {
  left: {
    title: "Опоры живы",
    tone: "good" as const,
    items: [
      "Чистое намерение",
      "Благородство",
      "Ответственность",
      "Бескорыстное добро",
      "Уважение к человеку",
    ],
    result: "Семья, доверие, мир, долгая культура",
  },
  right: {
    title: "Опоры подменены",
    tone: "bad" as const,
    items: [
      "Корысть и поза",
      "Высокомерие / унижение",
      "Уход от последствий",
      "Добро «за награду»",
      "«Свои» vs «чужие»",
    ],
    result: "Равнодушие, культ силы, дегуманизация",
  },
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export function HomeSciPop() {
  const cx = 160
  const cy = 160
  const rOuter = 118
  const rInner = 52

  return (
    <div id="nauch-pop" className="border-b border-line">
      {/* Intro to the block */}
      <header className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 sm:pt-16">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-teal-mid">
          Науч-поп · схемы учения
        </p>
        <h2 className="max-w-2xl font-serif text-3xl tracking-tight text-balance sm:text-4xl">
          Как устроена гуманистика — наглядно
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-pretty text-muted sm:text-base">
          Ниже — модели, а не «картинки для красоты». Каждая схема отвечает на
          один вопрос: что такое человек в гуманистике, как намерение становится
          судьбой мира, и куда ведёт забвение опор.
        </p>
      </header>

      {/* 1. Hex model of the person */}
      <section
        className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"
        aria-labelledby="model-person"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-light">
              Схема 01 · определение
            </p>
            <h3
              id="model-person"
              className="font-serif text-2xl tracking-tight text-balance sm:text-[1.75rem]"
            >
              Человек как носитель шести начал
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-pretty text-muted sm:text-base">
              По определению гуманистики человек — не «биологический организм +
              навыки», а носитель{" "}
              <strong className="font-medium text-ink">духовности</strong>,{" "}
              <strong className="font-medium text-ink">смысла</strong>,{" "}
              <strong className="font-medium text-ink">свободы</strong>,{" "}
              <strong className="font-medium text-ink">созидания</strong>,{" "}
              <strong className="font-medium text-ink">истории</strong> и{" "}
              <strong className="font-medium text-ink">ценностей</strong>.
              Уберите одно звено — модель «человечности» ломается.
            </p>
            <ol className="mt-6 space-y-2.5">
              {dimensions.map((d, i) => (
                <li
                  key={d.key}
                  className="flex gap-3 text-sm leading-snug text-ink-soft"
                >
                  <span className="shrink-0 tabular-nums text-muted-light">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-medium text-ink">{d.label}</span>
                    <span className="text-muted"> — {d.short}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-xs text-muted-light">
              Как читать: центр — целостность человека; лепестки — обязательные
              измерения, не «дополнения».
            </p>
          </div>

          <figure className="surface-card mx-auto w-full max-w-md p-4 sm:p-6">
            <svg
              viewBox="0 0 320 320"
              className="h-auto w-full"
              role="img"
              aria-label="Шестилучевая модель: человек в центре, шесть начал вокруг"
            >
              <title>Модель человека в гуманистике</title>
              {/* soft rings */}
              <circle
                cx={cx}
                cy={cy}
                r={rOuter + 8}
                fill="none"
                stroke="var(--color-line)"
                strokeWidth="1"
              />
              <circle
                cx={cx}
                cy={cy}
                r={rOuter - 28}
                fill="none"
                stroke="var(--color-line)"
                strokeWidth="1"
                strokeDasharray="3 5"
              />
              {/* spokes + nodes */}
              {dimensions.map((d) => {
                const outer = polar(cx, cy, rOuter, d.angle)
                const mid = polar(cx, cy, (rOuter + rInner) / 2, d.angle)
                return (
                  <g key={d.key}>
                    <line
                      x1={cx}
                      y1={cy}
                      x2={outer.x}
                      y2={outer.y}
                      stroke="var(--color-teal-soft)"
                      strokeOpacity="0.35"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={outer.x}
                      cy={outer.y}
                      r="22"
                      fill="var(--color-paper)"
                      stroke="var(--color-teal-mid)"
                      strokeWidth="1.25"
                    />
                    <text
                      x={outer.x}
                      y={outer.y - 2}
                      textAnchor="middle"
                      className="fill-ink"
                      style={{ fontSize: 9, fontWeight: 600 }}
                    >
                      {d.label}
                    </text>
                    <text
                      x={mid.x}
                      y={mid.y}
                      textAnchor="middle"
                      fill="var(--color-muted-light)"
                      style={{ fontSize: 0 }}
                    >
                      {d.short}
                    </text>
                  </g>
                )
              })}
              {/* center */}
              <circle
                cx={cx}
                cy={cy}
                r={rInner}
                fill="var(--color-ink)"
              />
              <text
                x={cx}
                y={cy - 6}
                textAnchor="middle"
                fill="var(--color-cream)"
                style={{ fontSize: 13, fontFamily: "Fraunces, Georgia, serif" }}
              >
                Человек
              </text>
              <text
                x={cx}
                y={cy + 12}
                textAnchor="middle"
                fill="var(--color-accent)"
                style={{ fontSize: 8, letterSpacing: "0.12em" }}
              >
                ЦЕЛОЕ
              </text>
            </svg>
          </figure>
        </div>
      </section>

      {/* 2. Concept levels table */}
      <section
        className="border-t border-line bg-paper/40 px-5 py-12 sm:px-8 sm:py-16"
        aria-labelledby="model-levels"
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-light">
            Схема 02 · уровни понятий
          </p>
          <h3
            id="model-levels"
            className="max-w-2xl font-serif text-2xl tracking-tight text-balance sm:text-[1.75rem]"
          >
            Три слоя: мировоззрение → правила → практика
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-muted sm:text-base">
            Науч-поп-приём: разложить похожие слова по «разрешающей
            способности». Так видно, зачем нужно отдельное слово «гуманистика».
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl shadow-border">
            <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-px bg-line text-sm">
              <div className="bg-cream-dark/40 px-3 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-light sm:px-4">
                Слой
              </div>
              <div className="bg-cream-dark/40 px-3 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-light sm:px-4">
                Гуманизм
              </div>
              <div className="bg-cream-dark/40 px-3 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-light sm:px-4">
                Этика / мораль
              </div>
              <div className="bg-teal px-3 py-3 text-[10px] font-medium uppercase tracking-wider text-accent sm:px-4">
                Гуманистика
              </div>

              <RowLabel>Вопрос</RowLabel>
              <Cell>В чём ценность человека?</Cell>
              <Cell>Что правильно / что нельзя?</Cell>
              <Cell accent>Как жить, оставаясь человеком?</Cell>

              <RowLabel>Фокус</RowLabel>
              <Cell>Мировоззрение, традиция</Cell>
              <Cell>Нормы и внутренний суд</Cell>
              <Cell accent>Намерение + дело + ответственность</Cell>

              <RowLabel>Риск, если остановиться здесь</RowLabel>
              <Cell>Красивые слова без практики</Cell>
              <Cell>Формализм правил без сердца</Cell>
              <Cell accent>Требует ежедневной работы над собой</Cell>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Causal chain intention → world */}
      <section
        className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"
        aria-labelledby="model-chain"
      >
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-light">
          Схема 03 · причинная цепь
        </p>
        <h3
          id="model-chain"
          className="max-w-2xl font-serif text-2xl tracking-tight text-balance sm:text-[1.75rem]"
        >
          От намерения — к судьбе мира
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-muted sm:text-base">
          Ключевой тезис «Судьбы мира»: глобальное не «падает с неба». Оно
          складывается из цепочки, которую можно проверить на любом поступке.
        </p>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {moralChain.map((s, i) => (
            <li key={s.step} className="relative">
              <div className="surface-card flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex size-9 items-center justify-center rounded-full bg-ink font-serif text-sm text-accent">
                    {s.step}
                  </span>
                  {i < moralChain.length - 1 && (
                    <span
                      className="hidden text-muted-light lg:inline"
                      aria-hidden
                    >
                      →
                    </span>
                  )}
                </div>
                <h4 className="mt-4 font-serif text-xl text-ink">{s.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-muted">
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-2xl bg-ink px-5 py-4 text-sm text-cream/80 sm:px-6">
          <span className="text-accent">Обратная связь: </span>
          мир, который мы создали, возвращается к человеку — как норма,
          давление или вдохновение. Поэтому «начни с себя» — не морализм, а
          модель системы.
        </div>
      </section>

      {/* 4. Scale cascade */}
      <section
        className="border-t border-line bg-paper/40 px-5 py-12 sm:px-8 sm:py-16"
        aria-labelledby="model-scale"
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-light">
            Схема 04 · масштабы
          </p>
          <h3
            id="model-scale"
            className="max-w-2xl font-serif text-2xl tracking-tight text-balance sm:text-[1.75rem]"
          >
            Каскад: от человека к человечеству
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-muted sm:text-base">
            Каждый следующий уровень наследует качество предыдущего. Сильное
            государство при «пустом» человеке — опасность; «хорошие» речи о
            мире без семьи и ответственности — иллюзия.
          </p>

          <ol className="mt-10 space-y-3">
            {cascade.map((row, i) => (
              <li key={row.title} className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                <div
                  className="flex items-center gap-4 rounded-2xl bg-paper px-4 py-4 shadow-border sm:min-w-[11rem] sm:flex-col sm:justify-center sm:text-center"
                  style={{
                    marginLeft: `min(${i * 1.25}rem, 5rem)`,
                  }}
                >
                  <span className="tabular-nums text-xs text-muted-light">
                    {row.level}
                  </span>
                  <div>
                    <p className="font-serif text-lg text-ink">{row.title}</p>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-teal-mid">
                      {row.role}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 items-center rounded-2xl border border-dashed border-line bg-cream/50 px-5 py-4 text-sm leading-relaxed text-pretty text-muted">
                  {row.text}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Bifurcation fork */}
      <section
        className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"
        aria-labelledby="model-fork"
      >
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-light">
          Схема 05 · развилка
        </p>
        <h3
          id="model-fork"
          className="max-w-2xl font-serif text-2xl tracking-tight text-balance sm:text-[1.75rem]"
        >
          Два исхода одной модели
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-muted sm:text-base">
          Науч-поп-приём «контрольный эксперимент»: оставьте те же пять опор —
          или подмените каждую. Результат предсказуем.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <ForkCard side={forks.left} />
          <div className="flex items-center justify-center py-2">
            <div className="rounded-full bg-ink px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-cream/70">
              vs
            </div>
          </div>
          <ForkCard side={forks.right} />
        </div>
      </section>
    </div>
  )
}

function RowLabel({ children }: { children: ReactNode }) {
  return (
    <div className="bg-cream px-3 py-3 text-xs font-medium text-muted sm:px-4 sm:text-sm">
      {children}
    </div>
  )
}

function Cell({
  children,
  accent,
}: {
  children: ReactNode
  accent?: boolean
}) {
  return (
    <div
      className={[
        "px-3 py-3 text-xs leading-snug text-pretty sm:px-4 sm:text-sm",
        accent ? "bg-teal/95 text-cream/90" : "bg-paper text-ink-soft",
      ].join(" ")}
    >
      {children}
    </div>
  )
}

function ForkCard({
  side,
}: {
  side: (typeof forks)["left"] | (typeof forks)["right"]
}) {
  const good = side.tone === "good"
  return (
    <div
      className={[
        "flex flex-col rounded-2xl p-6 sm:p-7",
        good ? "bg-paper shadow-border" : "bg-ink text-cream shadow-ink",
      ].join(" ")}
    >
      <p
        className={[
          "text-[11px] font-medium uppercase tracking-[0.16em]",
          good ? "text-teal-mid" : "text-accent",
        ].join(" ")}
      >
        {good ? "Путь A" : "Путь B"}
      </p>
      <h4 className="mt-2 font-serif text-xl">{side.title}</h4>
      <ul className="mt-5 flex-1 space-y-2">
        {side.items.map((item) => (
          <li
            key={item}
            className={[
              "flex gap-2 text-sm leading-snug",
              good ? "text-ink-soft" : "text-cream/70",
            ].join(" ")}
          >
            <span
              className={good ? "text-teal-mid" : "text-accent"}
              aria-hidden
            >
              {good ? "●" : "○"}
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p
        className={[
          "mt-6 border-t pt-4 text-sm font-medium leading-snug",
          good ? "border-line text-ink" : "border-white/10 text-cream",
        ].join(" ")}
      >
        Итог: {side.result}
      </p>
    </div>
  )
}
