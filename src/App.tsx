import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { About } from "./pages/About"
import { Article } from "./pages/Article"
import { Chapter } from "./pages/Chapter"
import { Home } from "./pages/Home"

/** Совпадает с vite `base`: в dev — `/`, в build — `/gumanizm/` */
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="o-proekte" element={<About />} />
          <Route path="razdel/:id" element={<Chapter />} />
          <Route path="razdel/:id/statya/:articleId" element={<Article />} />
          <Route path="infografika" element={<Navigate to="/" replace />} />
          <Route
            path="gumanistika"
            element={
              <Navigate to="/razdel/gumanistika-imya-chelovechestva" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
