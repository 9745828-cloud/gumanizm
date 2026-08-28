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

## Запуск

```bash
cd gumanizm
npm install
npm run dev
```

## GitHub Pages

Сайт публикуется с **Actions** (workflow `.github/workflows/deploy-pages.yml`).

- URL: https://9745828-cloud.github.io/gumanizm/
- В коде: `base: '/gumanizm/'` (Vite) и `basename="/gumanizm"` (React Router)
- В Settings → Pages выберите **Source: GitHub Actions** (не Branch / root — иначе отдаётся сырой `index.html` и белый экран)

После push в `main` дождитесь зелёного workflow **Deploy GitHub Pages**.

