import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Article } from "./pages/Article"
import { Chapter } from "./pages/Chapter"
import { Home } from "./pages/Home"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
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
