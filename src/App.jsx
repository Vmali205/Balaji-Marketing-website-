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

// Lazy load checkout & admin pages for code splitting
const Checkout = lazy(() => import('./pages/Checkout/Checkout'))
const OrderConfirmation = lazy(() => import('./pages/Checkout/OrderConfirmation'))
const AdminLogin = lazy(() => import('./pages/Admin/Login'))
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'))
const ProductForm = lazy(() => import('./pages/Admin/ProductForm'))

function PageLoader() {
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
          
          {/* Checkout Routes */}
          <Route path="/checkout" element={
            <Suspense fallback={<PageLoader />}>
              <Checkout />
            </Suspense>
          } />
          <Route path="/order-confirmation" element={
            <Suspense fallback={<PageLoader />}>
              <OrderConfirmation />
            </Suspense>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <Suspense fallback={<PageLoader />}>
              <AdminLogin />
            </Suspense>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/admin/products/new" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <ProductForm />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/admin/products/:id/edit" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
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
