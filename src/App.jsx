import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'

// The other pages load only when they are first visited,
// so the first page opens faster.
const About = lazy(() => import('./pages/About'))
const Shop = lazy(() => import('./pages/Shop'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const Contact = lazy(() => import('./pages/Contact'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:slug" element={<ProductPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="terms" element={<LegalPage doc="terms" />} />
        <Route path="privacy" element={<LegalPage doc="privacy" />} />
        <Route path="returns" element={<LegalPage doc="returns" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}