import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';


export default function QuoteModal({ selectedProduct, setSelectedProduct, setNotification }) {
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', quantity: 100 });

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include the form data AND the selected product name
        body: JSON.stringify({
          name: quoteForm.name,
          email: quoteForm.email,
          quantity: quoteForm.quantity,
          product: selectedProduct
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification(data.message || `Quote submitted for ${selectedProduct}!`);
        setSelectedProduct(null);
        setQuoteForm({ name: '', email: '', quantity: 100 });
      } else {
        setNotification(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      setNotification('Server error. Please try again later.');
    }

    setTimeout(() => setNotification(''), 6000);
  };
  
  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative border border-slate-100 transition-all transform scale-100">
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-all"
        >
          <FaTimes className="text-lg" />
        </button>
        <h3 className="text-2xl font-black text-slate-900 mb-1">Configure Quote</h3>
        <p className="text-sm text-slate-500 mb-6">Product Line: <span className="text-blue-600 font-semibold">{selectedProduct}</span></p>

        <form onSubmit={handleQuoteSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={quoteForm.name}
              onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-1">Corporate Email Address</label>
            <input
              type="email"
              required
              value={quoteForm.email}
              onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="purchasing@company.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-1">Estimated Unit Target Count</label>
            <input
              type="number"
              min="1"
              required
              value={quoteForm.quantity}
              onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm mt-4"
          >
            Submit Estimate Request
          </button>
        </form>
      </div>
    </div>
  );
}