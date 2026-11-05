import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout.jsx';
import Home from './Pages/Home.jsx';
import Products from './Pages/Products.jsx';
import About from './Pages/About.jsx';
import QuoteModal from './Components/QuoteModal.jsx';
import AdminRoute from './Components/AdminRoute.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';
import BulkOrder from './Pages/BulkOrder.jsx';


export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState('');

  return (
    <>
      {/* Global Notification Toast */}
      {notification && (
        <div className="bg-emerald-600 text-white py-3 px-4 text-center text-sm font-semibold fixed top-0 left-0 right-0 z-50 shadow-md animate-fade-in transition-all">
          {notification}
        </div>
      )}

      {/* Main Structural Layout */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home setSelectedProduct={setSelectedProduct} />} />
          <Route path="/services" element={<Products setSelectedProduct={setSelectedProduct} />} />
          <Route path="/products" element={<Navigate to="/services" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/bulk-order" element={<BulkOrder />} />
          <Route 
            path="/admin-dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          {/* Redirect any legacy auth routes to home */}
          <Route path="/auth" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>

      {/* Reusable Quote Request Modal */}
      <QuoteModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        setNotification={setNotification}
      />
    </>
  );
}
