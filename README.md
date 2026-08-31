# Гуманистика. Быть человеком

Портал по документу **структура портала.docx** и учению Салех Бея Гарабаглы («Судьба мира»).

**Humanistics: Being Human**

## Главная

`/` — **чтение главы о гуманистике** (не каталог): определение, основы, призыв к миру. Источник смысла — «Судьба мира».

## Навигация

Полный список 9 разделов — **только в шапке** (desktop «Разделы» / mobile menu).  
На страницах разделов — prev/next. Footer без дубля оглавления.

## Разделы

| # | Раздел | Маршрут |
|---|--------|---------|
| 01 | Гуманистика — имя человечности | `/razdel/gumanistika-imya-chelovechestva` |
| 02 | «Судьба мира» начинается с человека | `/razdel/sudba-mira` |
| 03–09 | … | `/razdel/...` |

Тексты и структура: `src/data/content.ts`. Визуалы (`visual`) встроены в главы, не отдельный раздел.

Статьи раздела: `/razdel/:id/statya/:articleId` (данные в `src/data/articles/`, список на странице раздела).

О проекте: `/o-proekte` (отдельная страница, не входит в 9 разделов книги).

## Запуск

```bash
cd gumanizm
npm install
npm run dev
```

## GitHub Pages

URL: https://9745828-cloud.github.io/gumanizm/

Публикуется ветка **`gh-pages`** (собранный `dist/`, не исходники).

В коде:
- Vite `base: '/gumanizm/'`
- React Router `basename="/gumanizm"`

Обновить сайт после правок:

```bash
./scripts/deploy-gh-pages.sh
```

Settings → Pages: **Deploy from a branch** → `gh-pages` / `/ (root)`.

> Не публикуйте `main` из корня: там сырой `index.html` со ссылкой на `/src/main.tsx` — будет белый экран.
