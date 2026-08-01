import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout.jsx';
import Home from './Pages/Home.jsx';
import Services from './Pages/Services.jsx';
import About from './Pages/About.jsx';
import Auth from './Pages/Auth.jsx';
import VerifyEmail from './Pages/VerifyEmail.jsx';
import QuoteModal from './Components/QuoteModal.jsx';
import AdminRoute from './Components/AdminRoute.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';


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
          <Route path="/services" element={<Services setSelectedProduct={setSelectedProduct} />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route 
            path="/admin-dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
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