import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Products from './pages/Products/Products'
import Catalogue from './pages/Catalogue/Catalogue'
import Contact from './pages/Contact/Contact'
import CategoryPage from './pages/Category/CategoryPage'
import ProductDetail from './pages/ProductDetail/ProductDetail'

// Lazy load admin pages for code splitting
const AdminLogin = lazy(() => import('./pages/Admin/Login'))
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'))
const ProductForm = lazy(() => import('./pages/Admin/ProductForm'))

function AdminLoader() {
  return (
    <div className="page-loader">
      <div className="spinner" />
    </div>
  )
}

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <Suspense fallback={<AdminLoader />}>
              <AdminLogin />
            </Suspense>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Suspense fallback={<AdminLoader />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/admin/products/new" element={
            <ProtectedRoute>
              <Suspense fallback={<AdminLoader />}>
                <ProductForm />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/admin/products/:id/edit" element={
            <ProtectedRoute>
              <Suspense fallback={<AdminLoader />}>
                <ProductForm />
              </Suspense>
            </ProtectedRoute>
          } />
        </Routes>
      </AnimatePresence>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  )
}

export default App
